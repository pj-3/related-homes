FROM node:latest

RUN mkdir -p /src/app

WORKDIR /src/app

COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

COPY . /src/app

RUN npm install

RUN npm run build-bundle

EXPOSE 5000

CMD [ "npm", "run", "start" ]