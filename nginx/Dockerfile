
FROM node:14-alpine AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app

COPY ./rsvp-admin .

# Install dependencies and build artifacts
RUN npm install --production
RUN npm run build

# Copy built assets from builder
FROM nginx:latest
ENV NODE_ENV production

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
