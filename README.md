# Getting Started 🚀 with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

<div align="center" valign="middle">
<img src="https://www.vectorlogo.zone/logos/docker/docker-official.svg" alt="Docker logo" width="200"/>
<img src="https://cdn.icon-icons.com/icons2/3913/PNG/512/fastify_logo_icon_248574.png" alt="Fastify logo" width="200"/>
<img src="http://mherman.org/assets/img/blog/typescript-logo.png" alt="Typescript logo" width="240"/>
</div>

## 🚀 Installation
1 Clone the repository
```sh
git clone git@github.com:muhryhan/html-to-pdf-extract.git
```
2 Go to the project directory
```sh
cd path/to/html-to-pdf-node
```
3 Install dependencies
```sh
npm install
```
4 Start Developing
```sh
npm run dev
```
5 Build for Production
```sh
npm run start
```

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure 📁
```bash
html-to-pdf-node/
├── src/                        
│   ├── controllers/            
│   │   └── appController.ts    # Main controller for handling core application logic
│   │   └── uploadController.ts
│   ├── helpers/                
│   │   └── dataUtils.ts       # Helper functions read file JSON and decode base64
│   │   └── errorHandler.ts      # Helper for standardized error handling
│   │   └── extractHelper.ts
│   ├── models/                 # Placeholder for data models or schema definitions (if needed)
│   │   └── extractModel.ts
│   ├── plugins/                
│   │   └── corsPlugin.ts       # Mengatur CORS (Cross-Origin Resource Sharing) untuk aplikasi
│   │   └── README.md           
│   │   └── staticPlugin.ts     # Menyajikan file statis dari direktori    
│   │   └── supportPlugin.ts
│   │   └── uploadPlugin.ts
│   │   └── viewPlugin.ts       # Menyajikan view/template menggunakan EJS sebagai templating engine   
│   ├── routes/                 # API route handlers
│   │   └── README.md           
│   │   └── root.ts             # Root route definition and handler for base API endpoint
│   ├── scripts/                # Contains JavaScript/Typescript files or utilities
│   │   └── dataHandling.ts         # function for template.ejs
│   │   └── uploadFile.ts
│   ├── services/
│   │   └── extractionService.ts               
│   │   └── pdfService.ts
│   ├── views/
│   │   └── extract-data.ejs
│   │   └── index.ejs
│   └── app.ts                  # Main app configuration and initialization entry point
│   └── server.ts               # Server setup and listening logic for Fastify
├── test/                       
├── .dockerignore               # Files to exclude from Docker images
├── .gitignore                  # Files to exclude from version control
├── dockerfile                  # Docker configuration for containerizing the app
├── package-lock.json           # Auto-generated file for locking dependencies versions
├── package.json                # Project metadata, dependencies, and scripts
├── README.md                   # Project overview and usage instructions
└── tsconfig.json               # TypeScript compiler options and configuration
```

## Learn More
To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).

## Dockerization
Build docker
```bash
docker build . -t (nama image)
```
Check Docker Img
```bash
docker images
```
Running Container Docker without a specific name
```bash
docker run -p 3000:3000 -d (nama images yang dipakai)
```
Running Container Docker with a specific name
```bash
docker run --name=(nama container) -p 3000:3000 -d (nama images)
```
create volumes dockerfile
```bash
docker run --volume=path/(pwd) -p 3000:3000 -d (nama images yang dipakai)
```
Stop Docker Container
```bash
docker stop container-id
```


### The Dockerfile Breakdown
```bash
FROM node:18-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:ts

EXPOSE 3000

CMD ["npm", "start"]
```



### Documentation at notion
Documentation at Notion (https://www.notion.so/API-FASTIFY-Documentation-10ec73d91e738070927bd2cb9a682365).