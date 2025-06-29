# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (caching)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
