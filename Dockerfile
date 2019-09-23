FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

COPY . .

EXPOSE 4242

CMD ["npm", "start"]