FROM node:lts

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

RUN npm run build-bundle

EXPOSE 5000

CMD [ "npm", "run", "start" ]