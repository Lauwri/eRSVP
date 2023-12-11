FROM node:18-alpine

WORKDIR /app

# Copy the whole monorepo
COPY . .
RUN chmod +x /app/wait-for.sh
# Install dependencies and build artifacts
RUN npm install --workspace:rsvp-db

CMD [ "npm", "run", "migrate:latest" ]
