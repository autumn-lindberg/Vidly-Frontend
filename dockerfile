# use node alpine image to run container (build context)
FROM node:latest

# create a user with minimal permissions to run container
#
RUN addgroup app && adduser -S -G app app
USER app

# set pwd in container to be /app
WORKDIR /app

# only copy package and package-lock (faster) - run as app user
# --chown=app:app after COPY
COPY package*.json ./
# update dependencies (cached if nothing is changed)
RUN npm install
# copy files and run as app user
# --chown=app:app after COPY
COPY . .

# expose port 3000 to use
EXPOSE 3000

# run npm start to start frontend
CMD ["npm", "start"]