FROM node:24-alpine AS build

# ENV
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
ARG NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . ./

RUN yarn build

FROM node:24-alpine AS production

WORKDIR /app

RUN npm install -g serve
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]