# Stage 1: Сборка приложения
FROM node:19.5.0-alpine AS build
WORKDIR /application
COPY package.json package-lock.json ./
RUN npm install

# Копируем только содержимое папки application внутрь текущей директории
COPY ./ ./
COPY webpack.config.js ./
# Теперь запускаем сборку
ENV ANALYZE false

RUN npm run build
# Stage 2: Сборка nginx
FROM nginx:alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /application/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]





