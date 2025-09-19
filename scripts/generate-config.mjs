import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'fs';

console.log('[config] Starting config generation...');

if (!existsSync('config.template.toml')) {
  console.error('[config] ERROR: config.template.toml not found!');
  process.exit(1);
}

const tpl = readFileSync('config.template.toml', 'utf8');

const rendered = tpl.replace(/\$\{([A-Z0-9_]+)\}/g, (_, name) => {
  const value = process.env[name] ?? '';
  console.log(`[config] ${name} = "${value}"`);
  return value;
});

// Write to root directory
writeFileSync('config.toml', rendered);
console.log('[config] Generated config.toml in root');

// Also copy to standalone directory if it exists
if (existsSync('.next/standalone')) {
  copyFileSync('config.toml', '.next/standalone/config.toml');
  console.log('[config] Copied config.toml to .next/standalone/');
}

console.log('[config] Config generation complete');