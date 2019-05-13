FROM node:latest AS dependencies

COPY package.json .

RUN npm install

FROM dependencies AS build

WORKDIR /app

COPY --from=dependencies /node_modules ./node_modules

COPY . .

RUN npm run build

FROM nginx:alpine

MAINTAINER Florian Zouhar <florian.zouhar@igd.fraunhofer.de>

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
