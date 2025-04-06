const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// MIME type for AVIF images
express.static.mime.define({'image/avif': ['avif']});

// Serve static files with caching headers
app.use(express.static(__dirname, {
    maxAge: '1h',
    setHeaders: (res, path) => {
        if (path.endsWith('.avif')) {
            res.setHeader('Content-Type', 'image/avif');
        }
        res.setHeader('Cache-Control', 'public, max-age=3600');
    }
}));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 