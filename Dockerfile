# Étape 1 : Build React
FROM node:22-alpine AS build

WORKDIR /app

COPY . .

RUN npm install
RUN sleep 15
RUN npm run build
RUN sleep 5

CMD ["npm", "run", "dev -- -- host"]
