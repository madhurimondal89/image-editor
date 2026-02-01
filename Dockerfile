# বেস ইমেজ
FROM node:18-alpine

# অ্যাপ ডিরেক্টরি
WORKDIR /app

# প্যাকেজ ফাইল কপি
COPY package*.json ./

# ডিপেন্ডেন্সি ইন্সটল
RUN npm install

# ১. পাবলিক ফোল্ডার আলাদাভাবে কপি করা (যাতে নিশ্চিত কপি হয়)
COPY public ./public

# ২. সার্ভার ফাইল কপি করা
COPY server.js .

# curl ইন্সটল (Healthcheck এর জন্য)
RUN apk add --no-cache curl

# পোর্ট সেটআপ
EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

# সার্ভার স্টার্ট
CMD ["node", "server.js"]