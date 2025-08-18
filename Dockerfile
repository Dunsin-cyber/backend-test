# Use Node.js as the base image
FROM node:20.14.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npm run db:init

# Build the TypeScript project
RUN npm run build

# Declare a build-time variable
ARG DATABASE_URL

# Set it as an environment variable
ENV DATABASE_URL=${DATABASE_URL}

# Run migrations
RUN npm run db:deploy:prod

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]  