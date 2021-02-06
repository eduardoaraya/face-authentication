FROM node:14.0

RUN apt-get update && apt-get upgrade -y --no-install-recommends

EXPOSE 8000:8000

COPY ./web-api-ts /var/api

WORKDIR /var/api

RUN npm install 

USER 1000:1000

