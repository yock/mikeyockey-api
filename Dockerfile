FROM node:boron
EXPOSE 8000
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install apt-transport-https && \
    /usr/bin/curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | /usr/bin/apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install yarn && yarn install --prod
CMD [ "yarn", "start" ]
