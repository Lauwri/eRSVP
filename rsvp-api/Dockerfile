# Stage 1: Build Dependencies
FROM node:18-alpine AS builder

WORKDIR /app

# Copy the whole monorepo
COPY . .

# Install dependencies and build artifacts
RUN npm install --workspace:rsvp-api
RUN npm run build:db
RUN npm run build:api

# Stage 2: Create the Final Image
FROM node:18-alpine as production

WORKDIR /app

# Copy only what's needed from the previous build stage
COPY --from=builder /app/rsvp-api/dist /app/rsvp-api/dist
COPY --from=builder /app/rsvp-api/package*.json /app/rsvp-api
COPY --from=builder /app/rsvp-db/dist /app/rsvp-db/dist
COPY --from=builder /app/rsvp-db/package*.json /app/rsvp-db

COPY --from=builder /app/node_modules /app/node_modules

COPY --from=builder /app/wait-and-run.sh /app
RUN chmod +x wait-and-run.sh

# Expose the port
EXPOSE 8080

# Command to run the application
CMD ["node", "./rsvp-api/dist/src/index.js" ]
