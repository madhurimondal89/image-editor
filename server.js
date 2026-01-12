const express = require('express');
const path = require('path');
const app = express();

// Coolify বা Docker এর জন্য পোর্ট এবং হোস্ট সেটআপ
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // এটি খুব জরুরি! localhost দিলে কাজ করবে না

// পাবলিক ফোল্ডার সার্ভ করা
app.use(express.static(path.join(__dirname, 'public')));

// রুট হ্যান্ডলিং
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 হ্যান্ডলিং (যেকোনো ভুল লিঙ্কে হোমপেজে পাঠাবে)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// সার্ভার চালু করা (HOST প্যারামিটার সহ)
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});