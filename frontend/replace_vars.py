import os
import sys

log_file = open("replace_log.txt", "w")
def log(msg):
    log_file.write(msg + "\n")
    print(msg)

replacements = {
    "var(--color-elevated)": "var(--color-card)",
    "var(--color-glass)": "var(--color-card)",
    "var(--color-danger)": "var(--color-destructive)",
    "var(--color-error)": "var(--color-destructive)",
    "var(--color-text-primary)": "var(--color-foreground)",
    "var(--color-text-secondary)": "var(--color-muted-foreground)",
    "var(--color-success)": "var(--color-accent)",
    "var(--color-warning)": "var(--color-secondary)",
    "var(--shadow-glow)": "var(--shadow-md)",
    "var(--shadow-glow-hover)": "var(--shadow-lg)",
    "bg-[#0B0F0E]": ""
}

updated_count = 0
log(f"Starting directory walk in: {os.getcwd()}")

if not os.path.exists("src"):
    log("ERROR: 'src' directory not found!")
    sys.exit(1)

for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith((".jsx", ".js", ".css")):
            filepath = os.path.normpath(os.path.join(root, file))
            # log(f"Checking: {filepath}")
            
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                
                original = content
                for old_val, new_val in replacements.items():
                    content = content.replace(old_val, new_val)
                    
                if content != original:
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(content)
                    log(f"Updated {filepath}")
                    updated_count += 1
            except Exception as e:
                log(f"Error processing {filepath}: {e}")

log(f"Total files updated: {updated_count}")
log_file.close()
