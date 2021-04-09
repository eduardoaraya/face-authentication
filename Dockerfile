FROM node:15.12.0
WORKDIR /var/api
EXPOSE 8000:8000
RUN apt-get update && apt-get upgrade -y --no-install-recommends
RUN npm install 
USER 1000:1000

