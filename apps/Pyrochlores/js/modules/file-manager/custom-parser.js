// Adapted from your "Helpful App" logic
// Parses CIF symmetry manually to ensure all atoms are found

export function parseCifManual(content, fileName = "structure") {
    const lines = content.split('\n').map(line => line.trim());
    let asymmetricAtoms = [];
    let symmetryOps = [];
    let cellParams = { a: 10, b: 10, c: 10 }; // Defaults

    // 1. Scan for Cell Dimensions and Atoms
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Grab Cell Dimensions
        if (line.startsWith('_cell_length_a')) cellParams.a = parseFloat(line.split(/\s+/)[1]);
        if (line.startsWith('_cell_length_b')) cellParams.b = parseFloat(line.split(/\s+/)[1]);
        if (line.startsWith('_cell_length_c')) cellParams.c = parseFloat(line.split(/\s+/)[1]);

        if (line.toLowerCase() !== 'loop_') continue;
        
        const headers = [];
        const dataLines = [];
        let j = i + 1;
        while (j < lines.length && lines[j].startsWith('_')) headers.push(lines[j++]);
        while (j < lines.length && lines[j] && !lines[j].startsWith('_') && !lines[j].toLowerCase().startsWith('loop_') && !lines[j].toLowerCase().startsWith('data_')) dataLines.push(lines[j++]);
        
        const requiredAtomHeaders = ['_atom_site_fract_x', '_atom_site_fract_y', '_atom_site_fract_z'];
        
        // Parse Atom Block
        if (requiredAtomHeaders.every(h => headers.includes(h))) {
            const xIndex = headers.indexOf('_atom_site_fract_x');
            const yIndex = headers.indexOf('_atom_site_fract_y');
            const zIndex = headers.indexOf('_atom_site_fract_z');
            const typeSymbolIndex = headers.indexOf('_atom_site_type_symbol');
            const labelIndex = headers.indexOf('_atom_site_label');

            for (const dLine of dataLines) {
                const values = dLine.match(/'[^']*'|\S+/g) || [];
                if (values.length < Math.max(xIndex, yIndex, zIndex)) continue;
                
                let symbol = "X";
                if (typeSymbolIndex !== -1 && values[typeSymbolIndex]) symbol = values[typeSymbolIndex].replace(/'/g, '');
                else if (labelIndex !== -1 && values[labelIndex]) symbol = values[labelIndex].replace(/'/g, '').replace(/\d+$/, '');

                asymmetricAtoms.push({
                    symbol: symbol,
                    x: parseFloat(values[xIndex].replace(/\(.*\)/, '')),
                    y: parseFloat(values[yIndex].replace(/\(.*\)/, '')),
                    z: parseFloat(values[zIndex].replace(/\(.*\)/, ''))
                });
            }
        } 
        // Parse Symmetry Block
        else if (headers.includes('_space_group_symop_operation_xyz') || headers.includes('_symmetry_equiv_pos_as_xyz')) {
            symmetryOps.push(...dataLines.map(l => l.replace(/'/g, '').toLowerCase()));
        }
        i = j - 1;
    }

    // Default symmetry if missing (P1)
    if (symmetryOps.length === 0) symmetryOps.push("x,y,z");

    // 2. Expand Symmetry
    const finalAtoms = [];
    const uniquePositions = new Set();
    const precision = 1e4; // Rounding for uniqueness check

    for (const atom of asymmetricAtoms) {
        for (const op of symmetryOps) {
            const [opX, opY, opZ] = op.split(',');
            if (!opX || !opY || !opZ) continue;

            let newX = normalizeCoord(evaluateSymOp(opX, atom.x, atom.y, atom.z));
            let newY = normalizeCoord(evaluateSymOp(opY, atom.x, atom.y, atom.z));
            let newZ = normalizeCoord(evaluateSymOp(opZ, atom.x, atom.y, atom.z));

            const key = `${atom.symbol}_${Math.round(newX*precision)},${Math.round(newY*precision)},${Math.round(newZ*precision)}`;
            
            if (!uniquePositions.has(key)) {
                uniquePositions.add(key);
                finalAtoms.push({ 
                    elem: atom.symbol, 
                    x: newX, 
                    y: newY, 
                    z: newZ 
                });
            }
        }
    }

    return { atoms: finalAtoms, cell: cellParams };
}

function evaluateSymOp(expr, x, y, z) {
    let val = 0;
    if (expr.includes('x')) val = expr.includes('-x') ? -x : x;
    else if (expr.includes('y')) val = expr.includes('-y') ? -y : y;
    else if (expr.includes('z')) val = expr.includes('-z') ? -z : z;

    const fractionMatch = expr.match(/([+\-]?)\s*(\d+)\/(\d+)/);
    if (fractionMatch) {
        const sign = fractionMatch[1] === '-' ? -1 : 1;
        val += sign * (parseInt(fractionMatch[2]) / parseInt(fractionMatch[3]));
    }
    return val;
}

function normalizeCoord(coord) {
    let norm = coord % 1.0;
    if (norm < 0) norm += 1.0;
    // Handle floating point errors near 0/1
    if (Math.abs(norm - 1.0) < 0.001) norm = 0.0;
    return norm;
}