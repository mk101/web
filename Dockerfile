FROM node:19-alpine

WORKDIR /app

EXPOSE 80

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

CMD [ "node", "index.js" ]
