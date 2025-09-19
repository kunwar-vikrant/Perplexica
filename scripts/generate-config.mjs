import { readFileSync, writeFileSync, existsSync } from 'fs';

console.log('[config] Starting config generation...');
console.log('[config] Current working directory:', process.cwd());

if (!existsSync('config.template.toml')) {
  console.error('[config] ERROR: config.template.toml not found!');
  process.exit(1);
}

const tpl = readFileSync('config.template.toml', 'utf8');
console.log('[config] Template loaded, length:', tpl.length);

const rendered = tpl.replace(/\$\{([A-Z0-9_]+)\}/g, (_, name) => {
  const value = process.env[name] ?? '';
  console.log(`[config] ${name} = "${value}"`);
  return value;
});

writeFileSync('config.toml', rendered);
console.log('[config] Generated config.toml successfully');

// Verify the file was written
if (existsSync('config.toml')) {
  const size = readFileSync('config.toml', 'utf8').length;
  console.log('[config] Verification: config.toml exists, size:', size);
} else {
  console.error('[config] ERROR: config.toml was not created!');
}