# Menggunakan image Node.js sebagai base image
FROM node:18-alpine

# Menentukan direktori kerja di dalam container
WORKDIR /src/app

# Menyalin file package.json dan package-lock.json
COPY package*.json ./

# Menginstal dependensi
RUN npm install

# Menyalin seluruh kode sumber ke dalam container
COPY . .

# Mengompilasi TypeScript
RUN npm run build:ts

# Mengexpose port yang digunakan oleh aplikasi
EXPOSE 3000

# Menjalankan aplikasi
CMD ["npm", "start"]
