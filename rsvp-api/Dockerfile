# Stage 1: Build Dependencies
FROM node:18-alpine AS builder

WORKDIR /app

# Copy the whole monorepo
COPY . .

# Install dependencies and build artifacts
RUN npm install
RUN npm run build:api

# Stage 2: Create the Final Image
FROM node:18-alpine as production

WORKDIR /app

# Copy only what's needed from the previous build stage
COPY --from=builder /app/rsvp-api /app
COPY --from=builder /app/rsvp-db /app/rsvp-db
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/rsvp-api/package*.json /app/

# Expose the port
EXPOSE 8080

# Command to run the application
CMD ["node", "./dist/src/index.js" ]
