FROM node:21.5.0-alpine3.19
ENV NODE_ENV=development

WORKDIR /app
COPY index.html /app/
COPY tsconfig.json tsconfig.node.json vite.config.ts /app/
COPY package.json package-lock.json ./
RUN npm install --no-cache-dir

EXPOSE 3000
CMD ["npm", "run", "dev"]
