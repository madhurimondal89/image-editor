const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// পাবলিক ফোল্ডার সেট করা (সঠিক পাথ পাওয়ার জন্য __dirname ব্যবহার করা জরুরি)
app.use(express.static(path.join(__dirname, 'public')));

// হোম রুট
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// অন্য যেকোনো রুটে গেলে হোমপেজে পাঠাবে (404 ফিক্স)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});