FROM nginx:1.23.2

RUN rm /etc/nginx/conf.d/default.conf
COPY ./etc/nginx/nginx.conf /etc/nginx
COPY ./etc/nginx/sites-enabled /etc/nginx/sites-enabled
