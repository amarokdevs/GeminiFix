import esbuild from 'esbuild';
import fs from 'fs';

esbuild.build({
  entryPoints: ['src/app.js'],
  bundle: true,
  outfile: 'public/app.js',
  format: 'esm',
  minify: true,
  sourcemap: true,
  loader: {
    '.js': 'jsx',
    '.png': 'dataurl',
    '.onnx': 'dataurl'
  },
  define: {
    'process.env.NODE_ENV': '\"production\"'
  }
}).catch(() => process.exit(1));

fs.copyFileSync('src/i18n/en-US.json', 'public/i18n/en-US.json');
