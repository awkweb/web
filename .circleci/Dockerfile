# Start from node image
FROM node:8.11

# Create dir for code
RUN mkdir /home/web
WORKDIR /home/web

# Install yarn globally
RUN npm i -g yarn
RUN chmod u+x /usr/local/bin/yarn

# Copy over node requirements and install
ADD package.json /home/web/
RUN yarn --prod

# Build for production
ADD . /home/web/
RUN yarn build

# Clean up files
RUN rm -r node_modules public src package.json tsconfig.json
VOLUME /home/web
