FROM node:dubnium-slim

LABEL MAINTAINER prince367

RUN apt-get update
RUN apt-get install procps git redis-server -y
#RUN redis-server --daemonize yes

WORKDIR /CRUD

COPY package.json package.json

RUN npm i

Add . .

ENTRYPOINT ["/bin/bash", "start.sh"]