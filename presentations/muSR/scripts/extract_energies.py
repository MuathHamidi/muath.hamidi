import json
import os
from aiida.orm import load_node

def main():
    branches_path = 'branches.json'
    if not os.path.exists(branches_path):
        print("Error: branches.json not found.")
        return
        
    with open(branches_path, 'r') as f:
        branches_data = json.load(f)
    branches = branches_data['branches']
    
    energies = {}
    for b in branches:
        bid = b['id']
        ck_path = f'checkpoint_{bid}.json'
        if os.path.exists(ck_path):
            with open(ck_path, 'r') as f:
                ck = json.load(f)
            if 'step3_pk' in ck:
                try:
                    node = load_node(ck['step3_pk'])
                    # AiiDA Quantum ESPRESSO output energy is in eV
                    energy = node.outputs.output_parameters.get_attribute('energy')
                    energies[bid] = energy
                except Exception as e:
                    print(f"Error loading energy for {bid}: {e}")
                    
    # Write to exports folder
    os.makedirs('../exports', exist_ok=True)
    export_path = '../exports/energies.json'
    with open(export_path, 'w') as f:
        json.dump(energies, f, indent=4)
    print(f"Successfully exported relaxed energies to {export_path}")

if __name__ == '__main__':
    main()
