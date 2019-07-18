FROM node:latest AS build

ARG GENERATE_SOURCEMAP=false

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine

MAINTAINER Florian Zouhar <florian.zouhar@igd.fraunhofer.de>

COPY --from=build /app/build /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
