const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const baseDir = path.join(__dirname, 'files');


if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const fileName = parsedUrl.query.name;
    const filePath = path.join(baseDir, fileName || '');

    if (req.method === 'GET' && parsedUrl.pathname === '/read') {
        // Read a file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('File not found');
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });

    } else if (req.method === 'POST' && parsedUrl.pathname === '/create') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            fs.writeFile(filePath, body, err => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Error creating file');
                }
                res.writeHead(201, { 'Content-Type': 'text/plain' });
                res.end('File created successfully');
            });
        });

    } else if (req.method === 'DELETE' && parsedUrl.pathname === '/delete') {
        // Delete a file
        fs.unlink(filePath, err => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('File not found or cannot delete');
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File deleted successfully');
        });

    } else {
        // Default route
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid request');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
