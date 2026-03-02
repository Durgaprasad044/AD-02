const fs = require('fs');
const path = require('path');

const replacements = {
  'var(--color-elevated)': 'var(--color-card)',
  'var(--color-glass)': 'var(--color-card)',
  'var(--color-danger)': 'var(--color-destructive)',
  'var(--color-error)': 'var(--color-destructive)',
  'var(--color-text-primary)': 'var(--color-foreground)',
  'var(--color-text-secondary)': 'var(--color-muted-foreground)',
  'var(--color-success)': 'var(--color-accent)',
  'var(--color-warning)': 'var(--color-secondary)',
  'var(--shadow-glow)': 'var(--shadow-md)',
  'var(--shadow-glow-hover)': 'var(--shadow-lg)',
  'bg-[#0B0F0E]': ''
};

const srcDir = path.join(__dirname, 'src');
const logPath = path.join(__dirname, 'replace_node_log.txt');
fs.writeFileSync(logPath, 'Starting node replacement...\n');

let count = 0;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fulldir = path.join(dir, f);
    if (fs.statSync(fulldir).isDirectory()) {
      walk(fulldir);
    } else if (f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.css')) {
      let content = fs.readFileSync(fulldir, 'utf8');
      let original = content;
      for (const [key, val] of Object.entries(replacements)) {
         content = content.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), val);
      }
      if (content !== original) {
        fs.writeFileSync(fulldir, content, 'utf8');
        fs.appendFileSync(logPath, `Updated ${fulldir}\n`);
        count++;
      }
    }
  }
}

try {
  walk(srcDir);
  fs.appendFileSync(logPath, `Finished. Total files updated: ${count}\n`);
} catch (e) {
  fs.appendFileSync(logPath, `Error: ${e.message}\n`);
}
