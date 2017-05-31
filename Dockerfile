FROM node:alpine as base
EXPOSE 8000
WORKDIR /app
COPY . /app
RUN npm install && npm run build
CMD [ "npm", "start" ]
