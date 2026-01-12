# হালকা নোড ইমেজ
FROM node:18-alpine

# ফোল্ডার তৈরি
WORKDIR /app

# প্যাকেজ ফাইল কপি
COPY package*.json ./

# ডিপেন্ডেন্সি ইন্সটল
RUN npm install

# বাকি সব ফাইল কপি
COPY . .

# পোর্ট এক্সপোজ (এটি Coolify কে পোর্ট চিনতে সাহায্য করে)
EXPOSE 3000

# এনভায়রনমেন্ট ভেরিয়েবল সেট করা
ENV PORT=3000
ENV HOST=0.0.0.0

# সার্ভার স্টার্ট
CMD ["node", "server.js"]