import { spawn } from 'child_process';
import http from 'http';
import httpProxy from 'http-proxy';

// Start the Eleventy development server
console.log('Starting Eleventy development server...');
const eleventyProcess = spawn('npx', ['@11ty/eleventy', '--serve', '--port=8080'], {
  stdio: 'pipe',
  shell: true
});

// Log Eleventy output
eleventyProcess.stdout.on('data', (data) => {
  console.log(`Eleventy: ${data}`);
});

eleventyProcess.stderr.on('data', (data) => {
  console.error(`Eleventy Error: ${data}`);
});

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Create the server that will forward requests to Eleventy
const server = http.createServer((req, res) => {
  // Forward to localhost:8080
  proxy.web(req, res, { target: 'http://localhost:8080' });
});

// Listen on port 12000 and all interfaces
server.listen(12000, '0.0.0.0', () => {
  console.log('Proxy server running on 0.0.0.0:12000');
  console.log('Access the site at https://work-1-avznhvglfozizoxs.prod-runtime.all-hands.dev');
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  eleventyProcess.kill();
  server.close();
  process.exit();
});