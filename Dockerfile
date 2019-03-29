#  FROM node:latest
#  RUN mkdir -p /usr/src/app
#  WORKDIR /usr/src/app
#  RUN npm i -g @angular/cli@7.1.4
#  COPY package.json /usr/src/app
# # # RUN npm cache clean
#  RUN npm install
#  COPY . /usr/src/app
#  RUN ng build
#  RUN pwd
# # EXPOSE 4200
# # CMD ["ng","serve"]
# # CMD ["echo","testing"]

 # FROM nginx:latest
 # COPY wrapper.sh /
 # COPY nginx/nginx.conf /etc/nginx
 # COPY nginx/nginx.conf.template /etc/nginx/nginx.conf.template
 # COPY dist/proejctmanagement /usr/share/nginx/html
 # RUN chmod 775 wrapper.sh
 # CMD ["./wrapper.sh"]

FROM node:latest AS base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm i -g @angular/cli@7.1.4
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
ENTRYPOINT ["npm"]

FROM base AS builder
RUN npm run build

FROM nginx:latest
COPY --from=builder /usr/src/app/wrapper.sh /
COPY --from=builder /usr/src/app/nginx/nginx.conf.template /etc/nginx/nginx.conf.template
COPY --from=builder /usr/src/app/dist/proejctmanagement /usr/share/nginx/html
RUN chmod 775 wrapper.sh
CMD ["./wrapper.sh"]
