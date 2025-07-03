const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Create the server that will forward requests to Eleventy
const server = http.createServer((req, res) => {
  // Forward to localhost:12000
  proxy.web(req, res, { target: 'http://localhost:12000' });
});

// Listen on port 12000 and all interfaces
server.listen(12000, '0.0.0.0', () => {
  console.log('Proxy server running on 0.0.0.0:12000');
});