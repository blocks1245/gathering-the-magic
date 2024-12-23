# Use a base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the backend code to the container
COPY ./package.json /app

# Install dependencies
RUN npm i

# Copy the backend code to the container
COPY ./src /app

# Expose the port on which the backend will run
EXPOSE 3000

# Define the command to start the backend
CMD npm start