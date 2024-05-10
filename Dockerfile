FROM node:latest AS build
WORKDIR /build
COPY . .
RUN npm ci --legacy-peer-deps
RUN npm run justbuild
FROM httpd:alpine

RUN echo "LoadModule rewrite_module modules/mod_rewrite.so" >> /usr/local/apache2/conf/httpd.conf
RUN sed -i 's#AllowOverride [Nn]one#AllowOverride All#' /usr/local/apache2/conf/httpd.conf

WORKDIR /usr/local/apache2/htdocs/ 
COPY --from=build /build/dist/ .
