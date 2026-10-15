const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4','.txt':'text/plain; charset=utf-8'};
function handler(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, {Allow:'GET, HEAD'}); res.end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end('Bad request'); return; }
  const filename = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
  if (!filename.startsWith(`${root}${path.sep}`) || /(^|\/)\./.test(pathname) || pathname.includes('\0')) { res.writeHead(404); res.end('Not found'); return; }
  let stat;
  try { stat = fs.statSync(filename); } catch { res.writeHead(404); res.end('Not found'); return; }
  if (!stat.isFile()) { res.writeHead(404); res.end('Not found'); return; }
  const headers = {'Content-Type':types[path.extname(filename)] || 'application/octet-stream','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
  let start = 0, end = stat.size - 1, partial = false;
  if (req.headers.range) {
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    if (range && (range[1] || range[2])) {
      partial = true;
      if (!range[1]) { start = Math.max(0, stat.size - Number(range[2])); }
      else { start = Number(range[1]); if (range[2]) end = Math.min(Number(range[2]), end); }
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= stat.size) { res.writeHead(416, {'Content-Range':`bytes */${stat.size}`}); res.end(); return; }
      headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
    }
  }
  res.writeHead(partial ? 206 : 200, {...headers, 'Content-Length':Math.max(0,end-start+1)});
  if (req.method === 'HEAD' || stat.size === 0) { res.end(); return; }
  const stream = fs.createReadStream(filename, {start,end});
  stream.on('error', () => res.destroy()); res.on('close', () => stream.destroy()); stream.pipe(res);
}
module.exports = {handler};
if (require.main === module) {
  const port = Number(process.env.PORT || 4175);
  const server = http.createServer(handler);
  server.on('error', error => { console.error(error.message); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`Scriptwriter portfolio: http://localhost:${port}`));
}
