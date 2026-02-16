// 3D Math Helpers

export function distance(a, b) {
    return Math.sqrt(
        Math.pow(a.x - b.x, 2) + 
        Math.pow(a.y - b.y, 2) + 
        Math.pow(a.z - b.z, 2)
    );
}

export function getCenterOfBox(atoms) {
    if (!atoms.length) return {x:0, y:0, z:0};
    
    let min = {x: Infinity, y: Infinity, z: Infinity};
    let max = {x: -Infinity, y: -Infinity, z: -Infinity};
    
    atoms.forEach(a => {
        if (a.x < min.x) min.x = a.x;
        if (a.y < min.y) min.y = a.y;
        if (a.z < min.z) min.z = a.z;
        if (a.x > max.x) max.x = a.x;
        if (a.y > max.y) max.y = a.y;
        if (a.z > max.z) max.z = a.z;
    });

    return {
        x: (min.x + max.x) / 2,
        y: (min.y + max.y) / 2,
        z: (min.z + max.z) / 2
    };
}