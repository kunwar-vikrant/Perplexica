import { readFileSync, writeFileSync } from 'fs';

const tpl = readFileSync('config.template.toml', 'utf8');

const rendered = tpl.replace(/\$\{([A-Z0-9_]+)\}/g, (_, name) => {
  return process.env[name] ?? '';
});

writeFileSync('config.toml', rendered);
console.log('[config] Generated config.toml');