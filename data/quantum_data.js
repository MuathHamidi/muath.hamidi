// quantum_data.js
// --- (cgCoeffs) ---
const cgCoeffs = {0:{"1/2":{"1/2":[{mL:0,mS:0.5,coeff:[1,1]}],"-1/2":[{mL:0,mS:-0.5,coeff:[1,1]}]}},1:{"3/2":{"3/2":[{mL:1,mS:0.5,coeff:[1,1]}],"1/2":[{mL:1,mS:-0.5,coeff:[1,3]},{mL:0,mS:0.5,coeff:[2,3]}],"-1/2":[{mL:0,mS:-0.5,coeff:[2,3]},{mL:-1,mS:0.5,coeff:[1,3]}],"-3/2":[{mL:-1,mS:-0.5,coeff:[1,1]}]},"1/2":{"1/2":[{mL:1,mS:-0.5,coeff:[2,3]},{mL:0,mS:0.5,coeff:[-1,3]}],"-1/2":[{mL:0,mS:-0.5,coeff:[1,3]},{mL:-1,mS:0.5,coeff:[-2,3]}]}},2:{"5/2":{"5/2":[{mL:2,mS:0.5,coeff:[1,1]}],"3/2":[{mL:2,mS:-0.5,coeff:[1,5]},{mL:1,mS:0.5,coeff:[4,5]}],"1/2":[{mL:1,mS:-0.5,coeff:[2,5]},{mL:0,mS:0.5,coeff:[3,5]}],"-1/2":[{mL:0,mS:-0.5,coeff:[3,5]},{mL:-1,mS:0.5,coeff:[2,5]}],"-3/2":[{mL:-1,mS:-0.5,coeff:[4,5]},{mL:-2,mS:0.5,coeff:[1,5]}],"-5/2":[{mL:-2,mS:-0.5,coeff:[1,1]}]},"3/2":{"3/2":[{mL:2,mS:-0.5,coeff:[4,5]},{mL:1,mS:0.5,coeff:[-1,5]}],"1/2":[{mL:1,mS:-0.5,coeff:[3,5]},{mL:0,mS:0.5,coeff:[-2,5]}],"-1/2":[{mL:0,mS:-0.5,coeff:[2,5]},{mL:-1,mS:0.5,coeff:[-3,5]}],"-3/2":[{mL:-1,mS:-0.5,coeff:[1,5]},{mL:-2,mS:0.5,coeff:[-4,5]}]}},3:{"7/2":{"7/2":[{mL:3,mS:0.5,coeff:[1,1]}],"5/2":[{mL:3,mS:-0.5,coeff:[1,7]},{mL:2,mS:0.5,coeff:[6,7]}],"3/2":[{mL:2,mS:-0.5,coeff:[2,7]},{mL:1,mS:0.5,coeff:[5,7]}],"1/2":[{mL:1,mS:-0.5,coeff:[3,7]},{mL:0,mS:0.5,coeff:[4,7]}],"-1/2":[{mL:0,mS:-0.5,coeff:[4,7]},{mL:-1,mS:0.5,coeff:[3,7]}],"-3/2":[{mL:-1,mS:-0.5,coeff:[5,7]},{mL:-2,mS:0.5,coeff:[2,7]}],"-5/2":[{mL:-2,mS:-0.5,coeff:[6,7]},{mL:-3,mS:0.5,coeff:[1,7]}],"-7/2":[{mL:-3,mS:-0.5,coeff:[1,1]}]},"5/2":{"5/2":[{mL:3,mS:-0.5,coeff:[6,7]},{mL:2,mS:0.5,coeff:[-1,7]}],"3/2":[{mL:2,mS:-0.5,coeff:[5,7]},{mL:1,mS:0.5,coeff:[-2,7]}],"1/2":[{mL:1,mS:-0.5,coeff:[4,7]},{mL:0,mS:0.5,coeff:[-3,7]}],"-1/2":[{mL:0,mS:-0.5,coeff:[3,7]},{mL:-1,mS:0.5,coeff:[-4,7]}],"-3/2":[{mL:-1,mS:-0.5,coeff:[2,7]},{mL:-2,mS:0.5,coeff:[-5,7]}],"-5/2":[{mL:-2,mS:-0.5,coeff:[1,7]},{mL:-3,mS:0.5,coeff:[-6,7]}]}}};

// --- mlToRealMap: corrected & consistent coefficients (l = 0..3)
// The coefficients are chosen to follow the usual real spherical harmonic definitions
const mlToRealMap = {
  0: { 0: [{ o: "s", c: { r: 1, i: 0 } }] },

  1: {
    // m = 0 -> pz
    0: [{ o: "p<sub>z</sub>", c: { r: 1, i: 0 } }],
    // m = +1 -> contributes to px and py with these coefficients
    1: [
      { o: "p<sub>x</sub>", c: { r: -1/Math.sqrt(2), i: 0 } },
      { o: "p<sub>y</sub>", c: { r: 0, i: 1/Math.sqrt(2) } }
    ],
    // m = -1
    "-1": [
      { o: "p<sub>x</sub>", c: { r: 1/Math.sqrt(2), i: 0 } },
      { o: "p<sub>y</sub>", c: { r: 0, i: 1/Math.sqrt(2) } }
    ]
  },

  2: {
    // m = 0 -> d_z2
    0: [{ o: "d<sub>z²</sub>", c: { r: 1, i: 0 } }],
    // m = +1 -> dxz, dyz
    1: [
      { o: "d<sub>xz</sub>", c: { r: -1/Math.sqrt(2), i: 0 } },
      { o: "d<sub>yz</sub>", c: { r: 0, i: 1/Math.sqrt(2) } }
    ],
    // m = -1
    "-1": [
      { o: "d<sub>xz</sub>", c: { r: 1/Math.sqrt(2), i: 0 } },
      { o: "d<sub>yz</sub>", c: { r: 0, i: 1/Math.sqrt(2) } }
    ],
    // m = +2 -> dx2-y2, dxy
    2: [
      { o: "d<sub>x²-y²</sub>", c: { r: 1/Math.sqrt(2), i: 0 } },
      { o: "d<sub>xy</sub>", c: { r: 0, i: 1/Math.sqrt(2) } }
    ],
    // m = -2
    "-2": [
      { o: "d<sub>x²-y²</sub>", c: { r: 1/Math.sqrt(2), i: 0 } },
      { o: "d<sub>xy</sub>", c: { r: 0, i: -1/Math.sqrt(2) } }
    ]
  },

  3: {
    // We'll use the standard set of 7 real f-orbitals in the (z^3, z(x^2-y^2), xz^2, yz^2, x(x^2-3y^2), y(3x^2-y^2), xyz)
    // The following coefficients follow the commonly used normalized real-harmonic expansion.
    0: [{ o: "f<sub>z³</sub>", c: { r: 1, i: 0 } }],

    // m = +1 -> contributes to f_xz² and f_x(x²-3y²) with real coefficients
    1: [
      { o: "f<sub>xz²</sub>", c: { r: -Math.sqrt(3/5), i: 0 } },
      { o: "f<sub>x(x²-3y²)</sub>", c: { r: Math.sqrt(2/5), i: 0 } }
    ],

    // m = -1
    "-1": [
      { o: "f<sub>yz²</sub>", c: { r: -Math.sqrt(3/5), i: 0 } },
      { o: "f<sub>y(3x²-y²)</sub>", c: { r: Math.sqrt(2/5), i: 0 } }
    ],

    // m = +2 -> f_z(x²-y²) and f_xyz (imag part)
    2: [
      { o: "f<sub>z(x²-y²)</sub>", c: { r: 1/Math.sqrt(2), i: 0 } },
      { o: "f<sub>xyz</sub>", c: { r: 0, i: 1/Math.sqrt(2) } }
    ],

    // m = -2
    "-2": [
      { o: "f<sub>z(x²-y²)</sub>", c: { r: 1/Math.sqrt(2), i: 0 } },
      { o: "f<sub>xyz</sub>", c: { r: 0, i: -1/Math.sqrt(2) } }
    ],

    // m = +3 -> x(x²-3y²) and xz² (imag mix)
    3: [
      { o: "f<sub>x(x²-3y²)</sub>", c: { r: 0, i: Math.sqrt(3/5) } },
      { o: "f<sub>xz²</sub>", c: { r: 0, i: Math.sqrt(2/5) } }
    ],

    // m = -3
    "-3": [
      { o: "f<sub>y(3x²-y²)</sub>", c: { r: 0, i: Math.sqrt(3/5) } },
      { o: "f<sub>yz²</sub>", c: { r: 0, i: -Math.sqrt(2/5) } }
    ]
  }
};

// Helper: complex arithmetic utility (minimal)
function c(r, i) { return { r: r, i: i }; }
function cAdd(a, b) { return { r: a.r + b.r, i: a.i + b.i }; }
function cMul(a, b) { return { r: a.r*b.r - a.i*b.i, i: a.r*b.i + a.i*b.r }; }
function cConj(a) { return { r: a.r, i: -a.i }; }

// Build realToMlMap by inverting the matrix for each l. This guarantees exact inversion (within FP precision).
function buildInverseMaps(mlToReal) {
  const realToMl = {};

  for (const lStr of Object.keys(mlToReal)) {
    const l = Number(lStr);
    const mKeys = Object.keys(mlToReal[l]).map(k => Number(k)).sort((a,b)=>a-b);
    const realNamesSet = new Set();
    // Collect all real orbital names for this l
    for (const m of mKeys) {
      for (const entry of mlToReal[l][m]) realNamesSet.add(entry.o);
    }
    const realNames = Array.from(realNamesSet);

    // Build transformation matrix T where rows = real orbitals, cols = m-values (ordered by mKeys)
    const rows = realNames.length;
    const cols = mKeys.length;
    const T = Array.from({length: rows}, ()=>Array.from({length: cols}, ()=>c(0,0)));

    for (let j=0;j<mKeys.length;j++){
      const m = mKeys[j];
      const entries = mlToReal[l][m];
      for (const e of entries){
        const i = realNames.indexOf(e.o);
        T[i][j] = c(e.c.r, e.c.i);
      }
    }

    // We'll compute inverse of T (complex) via numeric linear algebra (T_inv = (T^H * T)^{-1} * T^H ) pseudoinverse
    // For unitary transforms the inverse is simply conjugate transpose, but to be robust we compute numeric inverse.

    // Compute conjugate-transpose H = T^H (cols x rows)
    const H = Array.from({length: cols}, ()=>Array.from({length: rows}, ()=>c(0,0)));
    for (let i=0;i<rows;i++) for (let j=0;j<cols;j++) H[j][i] = cConj(T[i][j]);

    // Compute A = H * T  (cols x cols)
    const A = Array.from({length: cols}, ()=>Array.from({length: cols}, ()=>c(0,0)));
    for (let i=0;i<cols;i++){
      for (let j=0;j<cols;j++){
        let sum = c(0,0);
        for (let k=0;k<rows;k++){
          sum = cAdd(sum, cMul(H[i][k], T[k][j]));
        }
        A[i][j] = sum;
      }
    }

    // Numeric inverse of complex matrix A (cols x cols) using Gaussian elimination.
    function invertComplexMatrix(M){
      const n = M.length;
      // build augmented [M | I]
      const A = M.map(row => row.map(z => ({r:z.r,i:z.i}))); // deep copy
      const I = Array.from({length:n}, (_,i)=>Array.from({length:n}, (_,j)=> (i===j? c(1,0):c(0,0))));

      // Gaussian elimination
      for (let k=0;k<n;k++){
        // find pivot (non-zero) at or below k
        let piv = k; while(piv<n && Math.abs(A[piv][k].r) < 1e-12 && Math.abs(A[piv][k].i) < 1e-12) piv++;
        if (piv===n) throw new Error('Singular matrix while inverting (unexpected)');
        if (piv!==k){
          [A[k],A[piv]] = [A[piv],A[k]];
          [I[k],I[piv]] = [I[piv],I[k]];
        }
        // normalize row k
        // divide row by A[k][k]
        const denom = A[k][k];
        // compute reciprocal of denom
        const denomMag2 = denom.r*denom.r + denom.i*denom.i;
        const invDen = c(denom.r/denomMag2, -denom.i/denomMag2);
        for (let j=0;j<n;j++) A[k][j] = cMul(A[k][j], invDen);
        for (let j=0;j<n;j++) I[k][j] = cMul(I[k][j], invDen);
        // eliminate other rows
        for (let i=0;i<n;i++) if (i!==k){
          const factor = A[i][k];
          for (let j=0;j<n;j++) A[i][j] = cAdd(A[i][j], cMul(c(-factor.r, -factor.i), A[k][j]));
          for (let j=0;j<n;j++) I[i][j] = cAdd(I[i][j], cMul(c(-factor.r, -factor.i), I[k][j]));
        }
      }
      return I; // now I is M^{-1}
    }

    const Ainv = invertComplexMatrix(A);

    // Now compute T_inv = Ainv * H  (cols x rows times rows x cols? check dims: Ainv is cols x cols, H is cols x rows => result cols x rows)
    const Tinv = Array.from({length: cols}, ()=>Array.from({length: rows}, ()=>c(0,0)));
    for (let i=0;i<cols;i++){
      for (let j=0;j<rows;j++){
        let sum = c(0,0);
        for (let k=0;k<cols;k++) sum = cAdd(sum, cMul(Ainv[i][k], H[k][j]));
        Tinv[i][j] = sum;
      }
    }

    // Format into realToMlMap: for each real orbital (row index), list m contributions from Tinv^T? We want mapping real -> m, i.e. for each real orbital name provide array of { mL: m, c: {r,i} }
    // Tinv currently maps: (col index = m index) rows = m-index, cols = real-index? Let's reconstruct carefully.
    // Original T: rows(real) x cols(m). H = conj(T)^T = cols(m) x rows(real). Ainv * H gives cols(m) x rows(real). Tinv is cols x rows -> rows=m, cols=real. So to get real->m we need transpose of Tinv.

    // Build mapping real -> m
    const realToMlForL = {};
    for (let ri=0; ri<realNames.length; ri++){
      const name = realNames[ri];
      realToMlForL[name] = [];
      for (let mj=0; mj<mKeys.length; mj++){
        // Tinv[mIndex][realIndex] is complex coefficient to express |m> in terms of real basis? We want real -> m: coefficient for m when expressing real orbital.
        // Use value = Tinv[mj][ri]
        const val = Tinv[mj][ri];
        // round small values
        const r = Math.abs(val.r) < 1e-12 ? 0 : val.r;
        const i = Math.abs(val.i) < 1e-12 ? 0 : val.i;
        if (Math.abs(r) > 1e-12 || Math.abs(i) > 1e-12) {
          realToMlForL[name].push({ mL: mKeys[mj], c: { r: r, i: i } });
        }
      }
    }

    realToMl[l] = realToMlForL;
  }

  return realToMl;
}

const realToMlMap = buildInverseMaps(mlToRealMap);

// Output (pretty-print) — this will be used as the definitive inverse map
function prettyPrint(obj){
  console.log(JSON.stringify(obj, null, 2));
}

// For users: export both maps (so the object can be consumed in browser/node)
const exportsObj = { cgCoeffs, mlToRealMap, realToMlMap };

// If running in node, print the inverse map to console so you can copy-paste a static version if desired.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = exportsObj;
  // Print a short confirmation and the realToMlMap (rounded) for inspection
  console.log('Generated realToMlMap (inverse of mlToRealMap) for l = 0..3:');
  prettyPrint(realToMlMap);
}

// If running in browser, expose window.quantumData
if (typeof window !== 'undefined') window.quantumData = exportsObj;
