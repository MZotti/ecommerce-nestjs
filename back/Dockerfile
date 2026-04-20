FROM node:24.14.1-alpine

WORKDIR /app

COPY package*.json ./
RUN yarn

COPY . .

CMD ["node", "dist/main"]