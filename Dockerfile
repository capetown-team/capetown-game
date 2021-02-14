FROM node:13

WORKDIR /usr/app

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
