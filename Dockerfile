FROM node:latest AS build
WORKDIR /build
COPY . .
RUN npm ci --legacy-peer-deps
RUN npm run justbuild
FROM httpd:alpine
WORKDIR /usr/local/apache2/htdocs/ 
COPY --from=build /build/dist/ .
