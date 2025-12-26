FROM node:18-alpine

WORKDIR /app

# Copiar manifests
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
