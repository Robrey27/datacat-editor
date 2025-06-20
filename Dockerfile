FROM node:lts-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY .env ./
COPY tsconfig.json ./
COPY src ./src
COPY public ./public
COPY index.html ./
COPY vite.config.ts ./
COPY vite-env.d.ts ./

ENV VITE_API_URL=/graphql

EXPOSE 3000
CMD ["npm", "start"]


