FROM node:alpine

WORKDIR /app

COPY wificontrol /app

EXPOSE 3001
CMD [ "npm", "start" ]
