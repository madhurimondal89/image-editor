const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// পাবলিক ফোল্ডার থেকে স্ট্যাটিক ফাইল সার্ভ করা
app.use(express.static(path.join(__dirname, 'public')));

// হোম পেজ রুট
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});