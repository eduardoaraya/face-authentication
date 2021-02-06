FROM node:14.0
WORKDIR /var/api
EXPOSE 8000:8000
COPY ./src/project /var/api/
RUN apt-get update && apt-get upgrade -y --no-install-recommends
RUN npm install 
USER 1000:1000

