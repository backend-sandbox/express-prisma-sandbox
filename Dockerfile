FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma --allow-no-models
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]