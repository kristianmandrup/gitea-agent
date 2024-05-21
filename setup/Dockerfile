# Use a base image with Node.js installed
FROM node:latest AS builder

# Set the working directory
WORKDIR /app

# Set up environment variables
ENV CERTBOT_EMAIL=your_email@example.com
ENV CERTBOT_DOMAIN=example.com

# Install Certbot
RUN apt-get update && apt-get install -y certbot

# Run Certbot to obtain SSL certificate
RUN certbot certonly --standalone --agree-tos --non-interactive --email $CERTBOT_EMAIL -d $CERTBOT_DOMAIN

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your TypeScript application
COPY . .

# Build your TypeScript code
RUN npm run build

# Start a new stage for Gitea installation
FROM gitea/gitea:latest

# Set environment variables for Gitea configuration
ENV USER_UID=1000 \
    USER_GID=1000 \
    ROOT_URL=http://localhost:3000 \
    DISABLE_REGISTRATION=false

# Copy the built TypeScript application to the Gitea container
COPY --from=builder /app /app

# Expose Gitea's default port
EXPOSE 3000

# Start Gitea
CMD ["/usr/bin/entrypoint"]
