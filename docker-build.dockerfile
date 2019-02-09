# Start from node image
FROM node:8.11

MAINTAINER Tom Meagher

# Create dir for code
RUN mkdir /home/web
WORKDIR /home/web

# Install yarn globally
RUN npm i -g yarn
RUN chmod u+x /usr/local/bin/yarn
RUN yarn global add serve

# Copy over node requirements and install
ADD build /home/web/