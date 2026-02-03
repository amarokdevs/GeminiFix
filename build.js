import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

esbuild.build({
  entryPoints: [path.join(__dirname, 'src', 'app.js')],
  bundle: true,
  outfile: path.join(__dirname, 'public', 'app.js'),
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

fs.mkdirSync(path.join(__dirname, 'public', 'dpk'), { recursive: true });
fs.copyFileSync(path.join(__dirname, 'src', 'dpk', 'en-US.json'), path.join(__dirname, 'public', 'dpk', 'en-US.json'));
