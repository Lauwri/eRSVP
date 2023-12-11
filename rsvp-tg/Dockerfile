# Stage 1: Build Dependencies
FROM node:18-alpine AS builder

WORKDIR /app

# Copy the whole monorepo
COPY . .

# Install dependencies and build artifacts
RUN npm install --workspace:rsvp-tg
RUN npm run build:bot
RUN npm run build:db

# Stage 2: Create the Final Image
FROM node:18-alpine as production

WORKDIR /app

# Copy only what's needed from the previous build stage
COPY --from=builder /app/rsvp-tg/dist /app/rsvp-tg/dist
COPY --from=builder /app/rsvp-tg/package*.json /app/rsvp-tg
COPY --from=builder /app/rsvp-db/dist /app/rsvp-db/dist
COPY --from=builder /app/rsvp-db/package*.json /app/rsvp-db

COPY --from=builder /app/node_modules /app/node_modules

COPY --from=builder /app/wait-and-run.sh /app
RUN chmod +x wait-and-run.sh

# Expose the port  
EXPOSE 8000

# Command to run the application
CMD [ "node", "./rsvp-tg/dist/index.js" ]
