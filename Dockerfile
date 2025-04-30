# Use uma imagem oficial do Node.js compatível com o Angular CLI
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala o Angular CLI globalmente
RUN npm install -g @angular/cli
RUN npm install tslib --save

# Instala as dependências do projeto
RUN npm install --legacy-peer-deps

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Define a variável de ambiente para desativar o Analytics
ENV NG_CLI_ANALYTICS=false

# Expõe a porta padrão do Angular
EXPOSE 4200

# Comando para iniciar o servidor de desenvolvimento do Angular
CMD ["npm", "start"]
