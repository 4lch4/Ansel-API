FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

RUN wget -O /microscanner https://get.aquasec.com/microscanner && \
    chmod +x /microscanner && \
    /microscanner Y2VjOGM5MDRmNmUx && \
    rm -rf /microscanner

COPY . .

EXPOSE 4242

CMD ["npm", "start"]