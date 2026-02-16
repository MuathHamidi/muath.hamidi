/* js/periodic-table-data/main-grid.js */
import { categories } from './categories.js';

// Main Grid (Periods 1-7)
// Empty strings denote gaps in the 18-column grid
const mainGrid = [
    // Period 1
    {n:1, s:"H", name:"Hydrogen", m:1.008, cat:categories.diatomic},
    {s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},
    {n:2, s:"He", name:"Helium", m:4.0026, cat:categories.noble},
    
    // Period 2
    {n:3, s:"Li", name:"Lithium", m:6.94, cat:categories.alkali},
    {n:4, s:"Be", name:"Beryllium", m:9.0122, cat:categories.alkaline},
    {s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},
    {n:5, s:"B", name:"Boron", m:10.81, cat:categories.metalloid},
    {n:6, s:"C", name:"Carbon", m:12.011, cat:categories.polyatomic},
    {n:7, s:"N", name:"Nitrogen", m:14.007, cat:categories.diatomic},
    {n:8, s:"O", name:"Oxygen", m:15.999, cat:categories.diatomic},
    {n:9, s:"F", name:"Fluorine", m:18.998, cat:categories.diatomic},
    {n:10, s:"Ne", name:"Neon", m:20.180, cat:categories.noble},

    // Period 3
    {n:11, s:"Na", name:"Sodium", m:22.990, cat:categories.alkali},
    {n:12, s:"Mg", name:"Magnesium", m:24.305, cat:categories.alkaline},
    {s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},{s:""},
    {n:13, s:"Al", name:"Aluminium", m:26.982, cat:categories.post},
    {n:14, s:"Si", name:"Silicon", m:28.085, cat:categories.metalloid},
    {n:15, s:"P", name:"Phosphorus", m:30.974, cat:categories.polyatomic},
    {n:16, s:"S", name:"Sulfur", m:32.06, cat:categories.polyatomic},
    {n:17, s:"Cl", name:"Chlorine", m:35.45, cat:categories.diatomic},
    {n:18, s:"Ar", name:"Argon", m:39.948, cat:categories.noble},

    // Period 4
    {n:19, s:"K", name:"Potassium", m:39.098, cat:categories.alkali},
    {n:20, s:"Ca", name:"Calcium", m:40.078, cat:categories.alkaline},
    {n:21, s:"Sc", name:"Scandium", m:44.956, cat:categories.transition},
    {n:22, s:"Ti", name:"Titanium", m:47.867, cat:categories.transition},
    {n:23, s:"V", name:"Vanadium", m:50.942, cat:categories.transition},
    {n:24, s:"Cr", name:"Chromium", m:51.996, cat:categories.transition},
    {n:25, s:"Mn", name:"Manganese", m:54.938, cat:categories.transition},
    {n:26, s:"Fe", name:"Iron", m:55.845, cat:categories.transition},
    {n:27, s:"Co", name:"Cobalt", m:58.933, cat:categories.transition},
    {n:28, s:"Ni", name:"Nickel", m:58.693, cat:categories.transition},
    {n:29, s:"Cu", name:"Copper", m:63.546, cat:categories.transition},
    {n:30, s:"Zn", name:"Zinc", m:65.38, cat:categories.transition},
    {n:31, s:"Ga", name:"Gallium", m:69.723, cat:categories.post},
    {n:32, s:"Ge", name:"Germanium", m:72.630, cat:categories.metalloid},
    {n:33, s:"As", name:"Arsenic", m:74.922, cat:categories.metalloid},
    {n:34, s:"Se", name:"Selenium", m:78.971, cat:categories.polyatomic},
    {n:35, s:"Br", name:"Bromine", m:79.904, cat:categories.diatomic},
    {n:36, s:"Kr", name:"Krypton", m:83.798, cat:categories.noble},

    // Period 5
    {n:37, s:"Rb", name:"Rubidium", m:85.468, cat:categories.alkali},
    {n:38, s:"Sr", name:"Strontium", m:87.62, cat:categories.alkaline},
    {n:39, s:"Y", name:"Yttrium", m:88.906, cat:categories.transition},
    {n:40, s:"Zr", name:"Zirconium", m:91.224, cat:categories.transition},
    {n:41, s:"Nb", name:"Niobium", m:92.906, cat:categories.transition},
    {n:42, s:"Mo", name:"Molybdenum", m:95.95, cat:categories.transition},
    {n:43, s:"Tc", name:"Technetium", m:98, cat:categories.transition},
    {n:44, s:"Ru", name:"Ruthenium", m:101.07, cat:categories.transition},
    {n:45, s:"Rh", name:"Rhodium", m:102.91, cat:categories.transition},
    {n:46, s:"Pd", name:"Palladium", m:106.42, cat:categories.transition},
    {n:47, s:"Ag", name:"Silver", m:107.87, cat:categories.transition},
    {n:48, s:"Cd", name:"Cadmium", m:112.41, cat:categories.transition},
    {n:49, s:"In", name:"Indium", m:114.82, cat:categories.post},
    {n:50, s:"Sn", name:"Tin", m:118.71, cat:categories.post},
    {n:51, s:"Sb", name:"Antimony", m:121.76, cat:categories.metalloid},
    {n:52, s:"Te", name:"Tellurium", m:127.60, cat:categories.metalloid},
    {n:53, s:"I", name:"Iodine", m:126.90, cat:categories.diatomic},
    {n:54, s:"Xe", name:"Xenon", m:131.29, cat:categories.noble},

    // Period 6
    {n:55, s:"Cs", name:"Cesium", m:132.91, cat:categories.alkali},
    {n:56, s:"Ba", name:"Barium", m:137.33, cat:categories.alkaline},
    {s:"57-71", name:"Lanthanides", cat:categories.lanthanide, isPlaceholder:true}, // Placeholder
    {n:72, s:"Hf", name:"Hafnium", m:178.49, cat:categories.transition},
    {n:73, s:"Ta", name:"Tantalum", m:180.95, cat:categories.transition},
    {n:74, s:"W", name:"Tungsten", m:183.84, cat:categories.transition},
    {n:75, s:"Re", name:"Rhenium", m:186.21, cat:categories.transition},
    {n:76, s:"Os", name:"Osmium", m:190.23, cat:categories.transition},
    {n:77, s:"Ir", name:"Iridium", m:192.22, cat:categories.transition},
    {n:78, s:"Pt", name:"Platinum", m:195.08, cat:categories.transition},
    {n:79, s:"Au", name:"Gold", m:196.97, cat:categories.transition},
    {n:80, s:"Hg", name:"Mercury", m:200.59, cat:categories.transition},
    {n:81, s:"Tl", name:"Thallium", m:204.38, cat:categories.post},
    {n:82, s:"Pb", name:"Lead", m:207.2, cat:categories.post},
    {n:83, s:"Bi", name:"Bismuth", m:208.98, cat:categories.post},
    {n:84, s:"Po", name:"Polonium", m:209, cat:categories.post},
    {n:85, s:"At", name:"Astatine", m:210, cat:categories.metalloid},
    {n:86, s:"Rn", name:"Radon", m:222, cat:categories.noble},

    // Period 7
    {n:87, s:"Fr", name:"Francium", m:223, cat:categories.alkali},
    {n:88, s:"Ra", name:"Radium", m:226, cat:categories.alkaline},
    {s:"89-103", name:"Actinides", cat:categories.actinide, isPlaceholder:true}, // Placeholder
    {n:104, s:"Rf", name:"Rutherfordium", m:267, cat:categories.transition},
    {n:105, s:"Db", name:"Dubnium", m:268, cat:categories.transition},
    {n:106, s:"Sg", name:"Seaborgium", m:271, cat:categories.transition},
    {n:107, s:"Bh", name:"Bohrium", m:272, cat:categories.transition},
    {n:108, s:"Hs", name:"Hassium", m:270, cat:categories.transition},
    {n:109, s:"Mt", name:"Meitnerium", m:276, cat:categories.unknown},
    {n:110, s:"Ds", name:"Darmstadtium", m:281, cat:categories.unknown},
    {n:111, s:"Rg", name:"Roentgenium", m:280, cat:categories.unknown},
    {n:112, s:"Cn", name:"Copernicium", m:285, cat:categories.transition},
    {n:113, s:"Nh", name:"Nihonium", m:284, cat:categories.post},
    {n:114, s:"Fl", name:"Flerovium", m:289, cat:categories.post},
    {n:115, s:"Mc", name:"Moscovium", m:288, cat:categories.post},
    {n:116, s:"Lv", name:"Livermorium", m:293, cat:categories.post},
    {n:117, s:"Ts", name:"Tennessine", m:294, cat:categories.unknown},
    {n:118, s:"Og", name:"Oganesson", m:294, cat:categories.unknown},
];

export default mainGrid;