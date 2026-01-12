# বেস ইমেজ
FROM node:18-alpine

# ১. Health Check এর জন্য curl ইন্সটল করা (এটাই আসল ফিক্স)
RUN apk add --no-cache curl

# ওয়ার্কিং ডিরেক্টরি
WORKDIR /app

# ফাইল কপি এবং ইন্সটল
COPY package*.json ./
RUN npm install
COPY . .

# পোর্ট এবং এনভায়রনমেন্ট
EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

# সার্ভার স্টার্ট
CMD ["node", "server.js"]