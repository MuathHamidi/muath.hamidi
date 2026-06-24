import os
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def main():
    print("[RESET] Scanning for branch checkpoint files...")
    count = 0
    for filename in os.listdir(BASE_DIR):
        if filename.startswith("checkpoint_") and filename.endswith(".json") and filename != "checkpoint_shared.json":
            path = os.path.join(BASE_DIR, filename)
            try:
                with open(path, 'r') as f:
                    ck = json.load(f)
                
                # Remove distortion_checked key to force re-running phase 4b
                if 'distortion_checked' in ck:
                    del ck['distortion_checked']
                    with open(path, 'w') as f:
                        json.dump(ck, f, indent=4)
                    print(f"  Reset distortion check for: {filename}")
                    count += 1
            except Exception as e:
                print(f"  Error resetting {filename}: {e}")
                
    print(f"[COMPLETE] Successfully reset {count} checkpoint files. Run the pipeline again to regenerate the logs.")

if __name__ == '__main__':
    main()
