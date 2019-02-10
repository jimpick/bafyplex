const http = require('http')

const base32CidRegex = /^baf[abcdefghijklmnopqrstuvwxyz234567=]{56}$/

const server = http.createServer((req, res) => {
	// console.log('url:', req.url)
  const subdomain = req.headers.host.replace(/\..*$/, '')
  if (req.url.match(/^\/lunet.js/)) {
    res.setHeader('Content-Type', 'application/javascript')
    res.end('importScripts("https://lunet.jimpick.com/lunet/proxy.js")')
  } else if (req.url === '/favicon.ico') {
    res.statusCode = 404
    res.end()
  } else if (subdomain.toLowerCase().match(base32CidRegex)) {
    // console.log('subdomain:', subdomain)
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="mount"
      content="/ipfs/${subdomain}/"
    />
    <title>P2P Site</title>
    <script
      type="module"
      async
      src="https://lunet.jimpick.com/lunet/client.js"
    ></script>
  </head>
  <body></body>
</html>
`
    res.end(html)
  } else {
    res.statusCode = 404
    res.end('Unrecognized IPFS address ... need to be base 32, eg. bafy....')
  }
})
server.listen(23987)
