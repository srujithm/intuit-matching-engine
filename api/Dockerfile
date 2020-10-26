FROM node:12.2.0-alpine
WORKDIR /app
COPY package.json .
RUN npm install --silent
COPY . .
EXPOSE 8030
CMD ["npm", "start"]