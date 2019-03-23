# FROM node:latest
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# COPY package.json /usr/src/app
# # RUN npm cache clean
# RUN npm install
# COPY . /usr/src/app
# EXPOSE 4200
# CMD ["ng","serve"]
# CMD ["echo","testing"]

 FROM nginx:latest
 COPY wrapper.sh /
 COPY dist/proejctmanagement /usr/share/nginx/html
 CMD ["./wrapper.sh"]
