FROM node:latest
LABEL authors="Calin Ionut"

WORKDIR .

COPY package*.json ./

RUN npm install

COPY server .

ENV PORT=
ENV MONGO_HOST=
ENV JWT_SECRET=

EXPOSE 8090

CMD ["node", "elServerino.js"]


