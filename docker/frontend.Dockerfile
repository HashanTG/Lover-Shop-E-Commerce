# Use the official Vite Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app's code
COPY . .

# Expose the port Vite will run on
EXPOSE 5173

# Start Vite development server with hot reloading
CMD ["npm", "run", "dev"]
