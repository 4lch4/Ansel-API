FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

COPY . .

EXPOSE 4242

ENV AWS_ACCESS_KEY_ID=#{AWS_ACCESS_KEY_ID}#
ENV AWS_SECRET_ACCESS_KEY=#{AWS_SECRET_ACCESS_KEY}#

CMD ["npm", "start"]