const http = require('http');
const host = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.end('Hello World\\n');
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
