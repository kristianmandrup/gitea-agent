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
# Copy the built TypeScript application to the Gitea container
COPY --from=builder /app /app

# Install gitea CLI tool
RUN apk update && apk add --no-cache curl bash \
    && curl -L https://github.com/go-gitea/gitea/releases/download/v1.15.6/gitea-1.21.11-linux-amd64 -o /usr/local/bin/gitea \
    && chmod +x /usr/local/bin/gitea

# Expose Gitea's default port
EXPOSE 3000

# Set up initial user and access token
ARG GITEA_USER_NAME
ARG GITEA_USER_EMAIL
ARG GITEA_USER_PASSWORD

# Run Gitea setup commands
RUN /usr/local/bin/gitea admin create-user --name "$GITEA_USER_NAME" --email "$GITEA_USER_EMAIL" --password "$GITEA_USER_PASSWORD"

RUN GITEA_ACCESS_TOKEN=$(/usr/local/bin/gitea admin token create --name "Initial Token" --scopes "api:all" --user "$GITEA_USER_NAME" | grep -oP 'Token:\s+\K\w+') \
    && echo "GITEA_ACCESS_TOKEN=$GITEA_ACCESS_TOKEN" >> /etc/profile

# Start Gitea
CMD ["/usr/bin/entrypoint"]
