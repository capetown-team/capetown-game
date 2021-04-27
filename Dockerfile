FROM node:14-alpine as build-stage
COPY . .
RUN npm install && npm run build
CMD ["npm", "run", "build:serve"]
