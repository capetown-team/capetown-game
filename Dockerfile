FROM node:13

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
