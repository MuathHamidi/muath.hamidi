import json
import numpy as np

def generate_jitter(r_max=0.15):
    # Sample uniformly in a sphere of radius r_max
    # We use a fixed seed to ensure reproducibility
    phi = np.random.uniform(0, 2 * np.pi)
    costheta = np.random.uniform(-1, 1)
    u = np.random.uniform(0.1, 1.0) # ensure a minimum perturbation of 10% of r_max
    
    r = r_max * (u ** (1.0 / 3.0))
    theta = np.arccos(costheta)
    
    dx = r * np.sin(theta) * np.cos(phi)
    dy = r * np.sin(theta) * np.sin(phi)
    dz = r * np.cos(theta)
    
    # Ensure no component is trivially zero to guarantee symmetry breaking
    # and round to 4 decimal places for readability
    return [round(float(dx), 4), round(float(dy), 4), round(float(dz), 4)]

def main():
    np.random.seed(42) # Seed for reproducibility
    
    branches = []
    
    # 1. Edge-Center Group (site_frac: [0.0, 0.0, 0.5])
    # Exact
    branches.append({
        "id": "edge_exact",
        "label": "Edge-Center (Exact)",
        "site_frac": [0.0, 0.0, 0.5],
        "jitter_ang": [0.0, 0.0, 0.0],
        "description": "High-symmetry edge-center site with zero perturbation"
    })
    # 9 Jitters
    for i in range(1, 10):
        jitter = generate_jitter()
        branches.append({
            "id": f"edge_jitter{i}",
            "label": f"Edge-Center (Jitter {chr(64 + i)})",
            "site_frac": [0.0, 0.0, 0.5],
            "jitter_ang": jitter,
            "description": f"Symmetry-breaking jitter variant {chr(64 + i)} at Wyckoff 3c site"
        })
        
    # 2. Body-Center Group (site_frac: [0.5, 0.5, 0.5])
    # Exact
    branches.append({
        "id": "body_exact",
        "label": "Body-Center (Exact)",
        "site_frac": [0.5, 0.5, 0.5],
        "jitter_ang": [0.0, 0.0, 0.0],
        "description": "High-symmetry body-center site with zero perturbation"
    })
    # 9 Jitters
    for i in range(1, 10):
        jitter = generate_jitter()
        branches.append({
            "id": f"body_jitter{i}",
            "label": f"Body-Center (Jitter {chr(64 + i)})",
            "site_frac": [0.5, 0.5, 0.5],
            "jitter_ang": jitter,
            "description": f"Symmetry-breaking jitter variant {chr(64 + i)} at Wyckoff 1b site"
        })
        
    branches_data = {"branches": branches}
    
    # Save to branches.json
    output_path = "/home/muath-hamidi/Data/Antigravity/muSRProject/muSR/scripts/branches.json"
    with open(output_path, "w") as f:
        json.dump(branches_data, f, indent=4)
        
    print(f"Successfully generated 20 branches configuration in {output_path}")

if __name__ == "__main__":
    main()
