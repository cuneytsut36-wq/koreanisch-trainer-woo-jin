// Temporary offline mode, 2026-10-16.
// The previous implementation is preserved in the backup-woo-jin-before-offline-2026-10-16 branch.
import http from 'node:http';

const port = Number(process.env.PORT || 3000);
const page = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>Website vorübergehend offline</title>
  <style>
    html,body{margin:0;min-height:100%;font:16px system-ui,sans-serif;background:#111827;color:#f9fafb}
    main{min-height:100vh;min-height:100dvh;display:grid;place-items:center;text-align:center;padding:24px;box-sizing:border-box}
    h1{font-size:clamp(24px,5vw,36px);margin:0 0 12px}
    p{margin:0;color:#9ca3af;line-height:1.5}
  </style>
</head>
<body><main><div><h1>Diese Website ist vorübergehend offline.</h1>
<p>Die Anwendung ist derzeit nicht verfügbar.</p></div></main></body>
</html>`;

http.createServer((req,res) => {
  res.writeHead(503, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store, max-age=0, must-revalidate',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    'X-Content-Type-Options': 'nosniff',
    'Retry-After': '86400'
  });
  res.end(req.method === 'HEAD' ? undefined : page);
}).listen(port, '0.0.0.0', () => console.log('Woo Jin temporarily offline'));
