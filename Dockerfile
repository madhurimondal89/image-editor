# বেস ইমেজ
FROM node:18-alpine

# ওয়ার্কিং ডিরেক্টরি
WORKDIR /app

# প্যাকেজ ফাইল কপি করা
COPY package.json ./

# ডিপেন্ডেন্সি ইন্সটল করা
RUN npm install

# বাকি সব ফাইল কপি করা
COPY . .

# পোর্ট এক্সপোজ করা
EXPOSE 3000

# অ্যাপ স্টার্ট করা
CMD ["node", "server.js"]