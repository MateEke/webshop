FROM nginx:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./dist/webshop/browser /usr/src/app

COPY nginx.conf /etc/nginx/conf.d/default.conf