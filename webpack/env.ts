import path from 'path';

const isDev = String(process.env.NODE_ENV).trim() === 'development';
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');
const filename = (ext: string) => (isDev ? `main.${ext}` : `main.${ext}`);

const alias = {
  '@': srcDir,
  '@game': path.join(__dirname, '../src/pages/Game')
};

export { isDev, srcDir, distDir, filename, alias };
