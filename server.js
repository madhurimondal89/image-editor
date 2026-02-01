const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Current Working Directory ব্যবহার করা (সবচেয়ে নিরাপদ উপায়)
const publicPath = path.join(process.cwd(), 'public');

console.log('Serving static files from:', publicPath); // লগে পাথ দেখাবে

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});