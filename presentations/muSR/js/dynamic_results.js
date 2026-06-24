const DYNAMIC_BRANCHES = [
    {
        "id": "edge_exact",
        "label": "Edge-Center (Exact)",
        "site_frac": [
            0.0,
            0.0,
            0.5
        ],
        "jitter_ang": [
            0.0,
            0.0,
            0.0
        ],
        "description": "High-symmetry edge-center site with zero perturbation"
    },
    {
        "id": "edge_jitter1",
        "label": "Edge-Center (Jitter A)",
        "site_frac": [
            0.0,
            0.0,
            0.5
        ],
        "jitter_ang": [
            0.05,
            0.02,
            -0.03
        ],
        "description": "Symmetry-breaking jitter variant A at Wyckoff 3c site"
    },
    {
        "id": "edge_jitter2",
        "label": "Edge-Center (Jitter B)",
        "site_frac": [
            0.0,
            0.0,
            0.5
        ],
        "jitter_ang": [
            -0.04,
            0.03,
            0.05
        ],
        "description": "Symmetry-breaking jitter variant B at Wyckoff 3c site"
    },
    {
        "id": "edge_jitter3",
        "label": "Edge-Center (Jitter C)",
        "site_frac": [
            0.0,
            0.0,
            0.5
        ],
        "jitter_ang": [
            0.02,
            -0.05,
            0.03
        ],
        "description": "Symmetry-breaking jitter variant C at Wyckoff 3c site"
    },
    {
        "id": "edge_jitter4",
        "label": "Edge-Center (Jitter D)",
        "site_frac": [
            0.0,
            0.0,
            0.5
        ],
        "jitter_ang": [
            -0.03,
            -0.02,
            0.04
        ],
        "description": "Symmetry-breaking jitter variant D at Wyckoff 3c site"
    },
    {
        "id": "edge_jitter5",
        "label": "Edge-Center (Jitter E)",
        "site_frac": [
            0.0,
            0.0,
            0.5
        ],
        "jitter_ang": [
            0.01,
            0.04,
            -0.02
        ],
        "description": "Symmetry-breaking jitter variant E at Wyckoff 3c site"
    },
    {
        "id": "edge_jitter6",
        "label": "Edge-Center (Jitter F)",
        "site_frac": [
            0.0,
            0.0,
            0.5
        ],
        "jitter_ang": [
            -0.02,
            0.01,
            0.03
        ],
        "description": "Symmetry-breaking jitter variant F at Wyckoff 3c site"
    },
    {
        "id": "edge_jitter7",
        "label": "Edge-Center (Jitter G)",
        "site_frac": [
            0.0,
            0.0,
            0.5
        ],
        "jitter_ang": [
            0.03,
            -0.01,
            -0.04
        ],
        "description": "Symmetry-breaking jitter variant G at Wyckoff 3c site"
    },
    {
        "id": "edge_jitter8",
        "label": "Edge-Center (Jitter H)",
        "site_frac": [
            0.0,
            0.0,
            0.5
        ],
        "jitter_ang": [
            -0.05,
            0.02,
            0.01
        ],
        "description": "Symmetry-breaking jitter variant H at Wyckoff 3c site"
    },
    {
        "id": "edge_jitter9",
        "label": "Edge-Center (Jitter I)",
        "site_frac": [
            0.0,
            0.0,
            0.5
        ],
        "jitter_ang": [
            0.04,
            -0.03,
            0.02
        ],
        "description": "Symmetry-breaking jitter variant I at Wyckoff 3c site"
    },
    {
        "id": "body_exact",
        "label": "Body-Center (Exact)",
        "site_frac": [
            0.5,
            0.5,
            0.5
        ],
        "jitter_ang": [
            0.0,
            0.0,
            0.0
        ],
        "description": "High-symmetry body-center site with zero perturbation"
    },
    {
        "id": "body_jitter1",
        "label": "Body-Center (Jitter A)",
        "site_frac": [
            0.5,
            0.5,
            0.5
        ],
        "jitter_ang": [
            0.03,
            -0.02,
            0.04
        ],
        "description": "Symmetry-breaking jitter variant A at Wyckoff 1b site"
    },
    {
        "id": "body_jitter2",
        "label": "Body-Center (Jitter B)",
        "site_frac": [
            0.5,
            0.5,
            0.5
        ],
        "jitter_ang": [
            -0.02,
            0.03,
            -0.01
        ],
        "description": "Symmetry-breaking jitter variant B at Wyckoff 1b site"
    },
    {
        "id": "body_jitter3",
        "label": "Body-Center (Jitter C)",
        "site_frac": [
            0.5,
            0.5,
            0.5
        ],
        "jitter_ang": [
            0.01,
            0.02,
            0.03
        ],
        "description": "Symmetry-breaking jitter variant C at Wyckoff 1b site"
    },
    {
        "id": "body_jitter4",
        "label": "Body-Center (Jitter D)",
        "site_frac": [
            0.5,
            0.5,
            0.5
        ],
        "jitter_ang": [
            -0.04,
            -0.01,
            0.02
        ],
        "description": "Symmetry-breaking jitter variant D at Wyckoff 1b site"
    },
    {
        "id": "body_jitter5",
        "label": "Body-Center (Jitter E)",
        "site_frac": [
            0.5,
            0.5,
            0.5
        ],
        "jitter_ang": [
            0.02,
            -0.03,
            -0.02
        ],
        "description": "Symmetry-breaking jitter variant E at Wyckoff 1b site"
    },
    {
        "id": "body_jitter6",
        "label": "Body-Center (Jitter F)",
        "site_frac": [
            0.5,
            0.5,
            0.5
        ],
        "jitter_ang": [
            0.05,
            0.01,
            -0.03
        ],
        "description": "Symmetry-breaking jitter variant F at Wyckoff 1b site"
    },
    {
        "id": "body_jitter7",
        "label": "Body-Center (Jitter G)",
        "site_frac": [
            0.5,
            0.5,
            0.5
        ],
        "jitter_ang": [
            -0.01,
            0.04,
            0.01
        ],
        "description": "Symmetry-breaking jitter variant G at Wyckoff 1b site"
    },
    {
        "id": "body_jitter8",
        "label": "Body-Center (Jitter H)",
        "site_frac": [
            0.5,
            0.5,
            0.5
        ],
        "jitter_ang": [
            0.03,
            -0.05,
            0.02
        ],
        "description": "Symmetry-breaking jitter variant H at Wyckoff 1b site"
    },
    {
        "id": "body_jitter9",
        "label": "Body-Center (Jitter I)",
        "site_frac": [
            0.5,
            0.5,
            0.5
        ],
        "jitter_ang": [
            -0.03,
            0.02,
            0.04
        ],
        "description": "Symmetry-breaking jitter variant I at Wyckoff 1b site"
    }
];
const DYNAMIC_BRANCH_RESULTS = {
    "edge_exact": {
        "Bc": "0.0000",
        "Bx": "-0.000319",
        "By": "0.000147",
        "Bz": "0.000326",
        "Bdip": "0.000479",
        "muon_frac": [
            "2.0268052889741946e-05",
            "8.036425677116656e-06",
            "0.24997614499893367"
        ],
        "void_frac": [
            "0.0",
            "0.0",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -8.7144,
            "nearest_atom_symbol": "Ce",
            "nearest_atom_distance": 2.2821,
            "nearest_atom_pristine": 2.3445,
            "local_distortion": -2.6613
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.539972199640983,
                "pct": -3.178242703327294
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.54038450926515,
                "pct": -3.169449578478367
            },
            "z": {
                "symbol": "Ce-Ce",
                "pristine": 4.689,
                "relaxed": 4.565594973806125,
                "pct": -2.6317983833200165
            },
            "local_vol_change": -8.714350486512279
        },
        "energy": -99792.057004353
    },
    "edge_jitter1": {
        "Bc": "0.0000",
        "Bx": "0.037737",
        "By": "0.037795",
        "Bz": "0.075726",
        "Bdip": "0.092666",
        "muon_frac": [
            "0.06540881693324803",
            "0.06526274969076562",
            "0.2497315718063553"
        ],
        "void_frac": [
            "0.0",
            "0.0",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -13.6046,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.0214,
            "nearest_atom_pristine": 2.2948,
            "local_distortion": -11.9124
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.456793308399395,
                "pct": -4.952158063565893
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.456486995089143,
                "pct": -4.958690657088027
            },
            "z": {
                "symbol": "Ce-Ce",
                "pristine": 4.689,
                "relaxed": 4.484523143206123,
                "pct": -4.36077749613728
            },
            "local_vol_change": -13.604582378005148
        },
        "energy": -99792.35114485
    },
    "edge_jitter2": {
        "Bc": "0.0000",
        "Bx": "-0.038334",
        "By": "0.037368",
        "Bz": "-0.000680",
        "Bdip": "0.053538",
        "muon_frac": [
            "-0.0663793176156963",
            "0.06491123380251652",
            "0.25020714112817233"
        ],
        "void_frac": [
            "0.0",
            "0.0",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -13.5357,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.0249,
            "nearest_atom_pristine": 2.295,
            "local_distortion": -11.7686
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.454444018939171,
                "pct": -5.002260206031761
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.462330715167597,
                "pct": -4.834064509115022
            },
            "z": {
                "symbol": "Ce-Ce",
                "pristine": 4.689,
                "relaxed": 4.484583497870756,
                "pct": -4.359490341847816
            },
            "local_vol_change": -13.535730737712493
        },
        "energy": -99792.299472202
    },
    "edge_jitter3": {
        "Bc": "0.0000",
        "Bx": "0.038476",
        "By": "-0.037689",
        "Bz": "-0.000825",
        "Bdip": "0.053866",
        "muon_frac": [
            "0.06538885465984218",
            "-0.06593590166346769",
            "0.2507627479633184"
        ],
        "void_frac": [
            "0.0",
            "0.0",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -13.8804,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.0243,
            "nearest_atom_pristine": 2.3151,
            "local_distortion": -12.5599
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.454117992505015,
                "pct": -5.0092132116652754
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.45331789390218,
                "pct": -5.026276521599915
            },
            "z": {
                "symbol": "Ce-Ce",
                "pristine": 4.689,
                "relaxed": 4.476074577062699,
                "pct": -4.540955916769063
            },
            "local_vol_change": -13.880394656021567
        },
        "energy": -99792.22566731
    },
    "edge_jitter4": {
        "Bc": "0.0000",
        "Bx": "-0.038442",
        "By": "-0.037391",
        "Bz": "-0.076069",
        "Bdip": "0.093072",
        "muon_frac": [
            "-0.06632839413521006",
            "-0.06449006893793986",
            "0.25041345758157385"
        ],
        "void_frac": [
            "0.0",
            "0.0",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -13.747,
            "nearest_atom_symbol": "Ce",
            "nearest_atom_distance": 2.4057,
            "nearest_atom_pristine": 2.3048,
            "local_distortion": 4.3787
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.451077686778256,
                "pct": -5.074052318655231
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.459113124465239,
                "pct": -4.902684485706132
            },
            "z": {
                "symbol": "Ce-Ce",
                "pristine": 4.689,
                "relaxed": 4.480241476408484,
                "pct": -4.452090500992034
            },
            "local_vol_change": -13.74696441090838
        },
        "energy": -99792.299427031
    },
    "edge_jitter5": {
        "Bc": "0.0000",
        "Bx": "0.037955",
        "By": "0.037606",
        "Bz": "0.075536",
        "Bdip": "0.092523",
        "muon_frac": [
            "0.06530151508850501",
            "0.06497092864150138",
            "0.24991694699296224"
        ],
        "void_frac": [
            "0.0",
            "0.0",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -13.6756,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.0216,
            "nearest_atom_pristine": 2.3046,
            "local_distortion": -12.2816
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.452855440263538,
                "pct": -5.036139043217358
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.456795221584731,
                "pct": -4.952117262001909
            },
            "z": {
                "symbol": "Ce-Ce",
                "pristine": 4.689,
                "relaxed": 4.48449062917898,
                "pct": -4.361470906824905
            },
            "local_vol_change": -13.675574120946067
        },
        "energy": -99792.299572475
    },
    "edge_jitter6": {
        "Bc": "0.0000",
        "Bx": "-0.003014",
        "By": "0.001562",
        "Bz": "-0.001506",
        "Bdip": "0.003714",
        "muon_frac": [
            "-0.003761525858391981",
            "0.0018936456067391765",
            "0.25022857232885476"
        ],
        "void_frac": [
            "0.0",
            "0.0",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -8.9672,
            "nearest_atom_symbol": "Ce",
            "nearest_atom_distance": 2.2816,
            "nearest_atom_pristine": 2.3146,
            "local_distortion": -1.4266
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.535215174686799,
                "pct": -3.2796934381147502
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.535465610610047,
                "pct": -3.2743525141811225
            },
            "z": {
                "symbol": "Ce-Ce",
                "pristine": 4.689,
                "relaxed": 4.562666644394643,
                "pct": -2.6942494264311723
            },
            "local_vol_change": -8.967217628796131
        },
        "energy": -99792.026082017
    },
    "edge_jitter7": {
        "Bc": "0.0000",
        "Bx": "0.037775",
        "By": "-0.037854",
        "Bz": "0.000493",
        "Bdip": "0.053480",
        "muon_frac": [
            "0.06585718274685434",
            "-0.06521412397099595",
            "0.2494087479419919"
        ],
        "void_frac": [
            "0.0",
            "0.0",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -13.5416,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.0191,
            "nearest_atom_pristine": 2.3047,
            "local_distortion": -12.3936
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.456941801371632,
                "pct": -4.948991226879251
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.457905334628534,
                "pct": -4.9284424263481785
            },
            "z": {
                "symbol": "Ce-Ce",
                "pristine": 4.689,
                "relaxed": 4.486216458200671,
                "pct": -4.32466499891937
            },
            "local_vol_change": -13.541572764685172
        },
        "energy": -99792.351037093
    },
    "edge_jitter8": {
        "Bc": "0.0000",
        "Bx": "-0.037889",
        "By": "0.038236",
        "Bz": "-0.000970",
        "Bdip": "0.053838",
        "muon_frac": [
            "-0.06608854609724887",
            "0.06499493475154618",
            "0.2505442051930049"
        ],
        "void_frac": [
            "0.0",
            "0.0",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -13.8569,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.0248,
            "nearest_atom_pristine": 2.3251,
            "local_distortion": -12.9127
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.451118045304806,
                "pct": -5.073191612181571
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.4576787104540845,
                "pct": -4.93327552881031
            },
            "z": {
                "symbol": "Ce-Ce",
                "pristine": 4.689,
                "relaxed": 4.475932890259514,
                "pct": -4.543977601631177
            },
            "local_vol_change": -13.856851014834925
        },
        "energy": -99792.299008656
    },
    "edge_jitter9": {
        "Bc": "0.0000",
        "Bx": "0.038302",
        "By": "-0.037269",
        "Bz": "0.001256",
        "Bdip": "0.053457",
        "muon_frac": [
            "0.06680580513968863",
            "-0.06465958414374066",
            "0.24995465604606526"
        ],
        "void_frac": [
            "0.0",
            "0.0",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -13.4572,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.0129,
            "nearest_atom_pristine": 2.3048,
            "local_distortion": -12.6636
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.4526714453565015,
                "pct": -5.040063012230722
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.46434414546385,
                "pct": -4.791125070082103
            },
            "z": {
                "symbol": "Ce-Ce",
                "pristine": 4.689,
                "relaxed": 4.488415726516662,
                "pct": -4.277762283713759
            },
            "local_vol_change": -13.457249545056104
        },
        "energy": -99792.350595316
    },
    "body_exact": {
        "Bc": "0.0000",
        "Bx": "0.000005",
        "By": "0.000000",
        "Bz": "0.000003",
        "Bdip": "0.000006",
        "muon_frac": [
            "0.25000138209639583",
            "0.249999868735338",
            "0.24999611874600125"
        ],
        "void_frac": [
            "0.5",
            "0.5",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -11.0568,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.2543,
            "nearest_atom_pristine": 2.3445,
            "local_distortion": -3.8461
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.509584398074203,
                "pct": -3.8263084223885024
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.509521248054758,
                "pct": -3.8276551918370982
            },
            "z": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.509066793962415,
                "pct": -3.837347111059619
            },
            "local_vol_change": -11.05676377839332
        },
        "energy": -99790.975449005
    },
    "body_jitter1": {
        "Bc": "0.0000",
        "Bx": "-0.000117",
        "By": "-0.000411",
        "Bz": "-0.000049",
        "Bdip": "0.000430",
        "muon_frac": [
            "0.25081379609724885",
            "0.24943824860311367",
            "0.2511107608018767"
        ],
        "void_frac": [
            "0.5",
            "0.5",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -11.2185,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.2447,
            "nearest_atom_pristine": 2.3048,
            "local_distortion": -2.6072
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.506718739328819,
                "pct": -3.8874229189844622
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.506548613246418,
                "pct": -3.89105111438649
            },
            "z": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.506698849076746,
                "pct": -3.887847108621334
            },
            "local_vol_change": -11.21852517162104
        },
        "energy": -99791.007971099
    },
    "body_jitter2": {
        "Bc": "0.0000",
        "Bx": "-0.000134",
        "By": "0.000201",
        "Bz": "-0.000067",
        "Bdip": "0.000251",
        "muon_frac": [
            "0.24938603664960543",
            "0.25091894136276394",
            "0.24969356049264232"
        ],
        "void_frac": [
            "0.5",
            "0.5",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -11.0923,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.2471,
            "nearest_atom_pristine": 2.3146,
            "local_distortion": -2.9179
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.508705602905684,
                "pct": -3.8450500553277145
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.508902478381933,
                "pct": -3.840851388741029
            },
            "z": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.508760692252261,
                "pct": -3.8438751918903558
            },
            "local_vol_change": -11.092334255700354
        },
        "energy": -99791.064681254
    },
    "body_jitter3": {
        "Bc": "0.0000",
        "Bx": "-0.000349",
        "By": "-0.000278",
        "Bz": "-0.000209",
        "Bdip": "0.000493",
        "muon_frac": [
            "0.25031588480486244",
            "0.2506365091170825",
            "0.25095071086585624"
        ],
        "void_frac": [
            "0.5",
            "0.5",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -11.0421,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.2472,
            "nearest_atom_pristine": 2.3146,
            "local_distortion": -2.9127
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.509474310206701,
                "pct": -3.8286562122691215
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.509746779785561,
                "pct": -3.822845387384066
            },
            "z": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.5096937792048335,
                "pct": -3.8239757047380363
            },
            "local_vol_change": -11.042119043551235
        },
        "energy": -99791.064633226
    },
    "body_jitter4": {
        "Bc": "0.0000",
        "Bx": "-0.000056",
        "By": "0.000119",
        "Bz": "0.000291",
        "Bdip": "0.000319",
        "muon_frac": [
            "0.24890995020260182",
            "0.24972971327575175",
            "0.2505390033695884"
        ],
        "void_frac": [
            "0.5",
            "0.5",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -11.1602,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.2459,
            "nearest_atom_pristine": 2.3046,
            "local_distortion": -2.5469
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.508023659915473,
                "pct": -3.85959351854398
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.507654744956327,
                "pct": -3.8674611866852837
            },
            "z": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.507249133147203,
                "pct": -3.8761114705224253
            },
            "local_vol_change": -11.160174445668314
        },
        "energy": -99791.064630097
    },
    "body_jitter5": {
        "Bc": "0.0000",
        "Bx": "0.000370",
        "By": "0.000014",
        "Bz": "0.000068",
        "Bdip": "0.000376",
        "muon_frac": [
            "0.2506606710066112",
            "0.24902903935807205",
            "0.24930043267221155"
        ],
        "void_frac": [
            "0.5",
            "0.5",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -11.0465,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.2468,
            "nearest_atom_pristine": 2.3147,
            "local_distortion": -2.9341
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.509992871992479,
                "pct": -3.817597099755199
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.50946373115753,
                "pct": -3.8288818264548885
            },
            "z": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.5092359259408,
                "pct": -3.833740116425677
            },
            "local_vol_change": -11.046505458047672
        },
        "energy": -99791.007988378
    },
    "body_jitter6": {
        "Bc": "0.0000",
        "Bx": "0.000118",
        "By": "-0.000115",
        "Bz": "-0.000349",
        "Bdip": "0.000386",
        "muon_frac": [
            "0.2513613619535082",
            "0.25027261878865426",
            "0.24917800570484108"
        ],
        "void_frac": [
            "0.5",
            "0.5",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -11.1262,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.244,
            "nearest_atom_pristine": 2.2947,
            "local_distortion": -2.2102
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.5087323909507795,
                "pct": -3.844478759846892
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.507712738863616,
                "pct": -3.8662243791082074
            },
            "z": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.5082083419462915,
                "pct": -3.855654895579197
            },
            "local_vol_change": -11.12615465437118
        },
        "energy": -99791.064572681
    },
    "body_jitter7": {
        "Bc": "0.0000",
        "Bx": "-0.000345",
        "By": "0.000002",
        "Bz": "-0.000194",
        "Bdip": "0.000396",
        "muon_frac": [
            "0.2496675214011516",
            "0.25124625009596924",
            "0.2503274873960332"
        ],
        "void_frac": [
            "0.5",
            "0.5",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -11.1403,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.2441,
            "nearest_atom_pristine": 2.3045,
            "local_distortion": -2.624
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.508158071542429,
                "pct": -3.8567269877920918
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.507945373394224,
                "pct": -3.861263096732259
            },
            "z": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.50783251237944,
                "pct": -3.8636700281629355
            },
            "local_vol_change": -11.140297781750508
        },
        "energy": -99791.007971235
    },
    "body_jitter8": {
        "Bc": "0.0000",
        "Bx": "0.000176",
        "By": "-0.000295",
        "Bz": "0.000130",
        "Bdip": "0.000367",
        "muon_frac": [
            "0.25081242040946894",
            "0.24860845802943055",
            "0.25056685726167627"
        ],
        "void_frac": [
            "0.5",
            "0.5",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -11.2526,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.2426,
            "nearest_atom_pristine": 2.2948,
            "local_distortion": -2.2735
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.506121545389621,
                "pct": -3.900158980814228
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.5064597058849785,
                "pct": -3.8929471980170938
            },
            "z": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.505654842788983,
                "pct": -3.910112117957276
            },
            "local_vol_change": -11.252604745366668
        },
        "energy": -99791.007959126
    },
    "body_jitter9": {
        "Bc": "0.0000",
        "Bx": "-0.000387",
        "By": "-0.000065",
        "Bz": "0.000063",
        "Bdip": "0.000397",
        "muon_frac": [
            "0.249110598827042",
            "0.2505961813393047",
            "0.2511867121667733"
        ],
        "void_frac": [
            "0.5",
            "0.5",
            "0.5"
        ],
        "distortion": {
            "lattice_distortion": -11.1029,
            "nearest_atom_symbol": "In",
            "nearest_atom_distance": 2.2449,
            "nearest_atom_pristine": 2.3048,
            "local_distortion": -2.597
        },
        "axial_expansions": {
            "x": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.508889194577482,
                "pct": -3.841134685914227
            },
            "y": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.508336915923817,
                "pct": -3.852912861509561
            },
            "z": {
                "symbol": "In-In",
                "pristine": 4.689,
                "relaxed": 4.50860565122104,
                "pct": -3.8471816758148925
            },
            "local_vol_change": -11.10292332206435
        },
        "energy": -99791.064559211
    }
};
const DYNAMIC_BRANCH_LOGS = {
    "edge_exact": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "edge_jitter1": {
        "step8_bc_ERROR.log": true,
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "edge_jitter2": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "edge_jitter3": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "edge_jitter4": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "edge_jitter5": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "edge_jitter6": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "edge_jitter7": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "edge_jitter8": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "edge_jitter9": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "body_exact": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "body_jitter1": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "body_jitter2": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "body_jitter3": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "body_jitter4": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "body_jitter5": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "body_jitter6": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "body_jitter7": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "body_jitter8": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    },
    "body_jitter9": {
        "step9_bdip.log": true,
        "step4_geometry.log": true,
        "step8_bc.log": true,
        "step3_relax_submit.log": true,
        "step6_ppx_submit.log": true,
        "step7_cube_dl.log": true,
        "step10_compiler.log": true,
        "step5_afm_submit.log": true,
        "step4b_distortion.log": true
    }
};
const DYNAMIC_BRANCH_FILES = {
    "edge_exact": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "edge_jitter1": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "edge_jitter2": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "edge_jitter3": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "edge_jitter4": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "edge_jitter5": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "edge_jitter6": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "edge_jitter7": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "edge_jitter8": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "edge_jitter9": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "body_exact": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "body_jitter1": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "body_jitter2": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "body_jitter3": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "body_jitter4": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "body_jitter5": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "body_jitter6": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "body_jitter7": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "body_jitter8": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    },
    "body_jitter9": {
        "cein3_pre_relax.cif": true,
        "cein3_relaxed_muon.cif": true,
        "final_muSR_results.txt": true
    }
};
const DYNAMIC_SHARED_LOGS = {
    "extract_energies.log": true,
    "pipeline_master.log": true
};
const DYNAMIC_RESULTS = {
    "Bc": "0.0000",
    "Bx": "0.037737",
    "By": "0.037795",
    "Bz": "0.075726",
    "Bdip": "0.092666",
    "muon_frac": [
        "0.06540881693324803",
        "0.06526274969076562",
        "0.2497315718063553"
    ],
    "void_frac": [
        "0.0",
        "0.0",
        "0.5"
    ],
    "distortion": {
        "lattice_distortion": -13.6046,
        "nearest_atom_symbol": "In",
        "nearest_atom_distance": 2.0214,
        "nearest_atom_pristine": 2.2948,
        "local_distortion": -11.9124
    },
    "axial_expansions": {
        "x": {
            "symbol": "In-In",
            "pristine": 4.689,
            "relaxed": 4.456793308399395,
            "pct": -4.952158063565893
        },
        "y": {
            "symbol": "In-In",
            "pristine": 4.689,
            "relaxed": 4.456486995089143,
            "pct": -4.958690657088027
        },
        "z": {
            "symbol": "Ce-Ce",
            "pristine": 4.689,
            "relaxed": 4.484523143206123,
            "pct": -4.36077749613728
        },
        "local_vol_change": -13.604582378005148
    },
    "energy": -99792.35114485
};
const DYNAMIC_MUON_FRAC = [
    "0.06540881693324803",
    "0.06526274969076562",
    "0.2497315718063553"
];
const DYNAMIC_VOID_FRAC = [
    "0.0",
    "0.0",
    "0.25"
];
const DYNAMIC_LOGS = {
    "extract_energies.log": true,
    "pipeline_master.log": true,
    "step8_bc_ERROR.log": true,
    "step9_bdip.log": true,
    "step4_geometry.log": true,
    "step8_bc.log": true,
    "step6_ppx_submit.log": true,
    "step7_cube_dl.log": true,
    "step10_compiler.log": true,
    "step5_afm_submit.log": true,
    "step4b_distortion.log": true
};
const DYNAMIC_RELAXED_CIF = true;
const DYNAMIC_FINAL_REPORT = true;
const DYNAMIC_CANDIDATES_REPORT = "MUON STOPPING SITE CANDIDATES\nGlobal max: 1.101200 eV\n  Rank 1: frac=[0.  0.  0.5]  V=1.101200 eV\n  Rank 2: frac=[0.  0.5 0. ]  V=1.101200 eV\n  Rank 3: frac=[0.5 0.  0. ]  V=1.101200 eV\n";
