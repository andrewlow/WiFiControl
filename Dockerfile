# This Dockerfile users multi-stage builds

# The docker builder 
FROM node:alpine AS builder
WORKDIR /build
COPY . /build
RUN cd wificontrolui; npm install; npm run build
RUN cp -R wificontrolui/build/* wificontrol/public/.
RUN cd wificontrol; npm install

# The runtime image
FROM node:alpine
WORKDIR /app
COPY --from=builder /build/wificontrol /app
EXPOSE 3001
CMD [ "npm", "start" ]
