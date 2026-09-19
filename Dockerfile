FROM node:24.20.0-bookworm-slim

RUN apt-get update \
    && apt-get install -y git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Garante que o usuário node possa instalar dependências e gerar arquivos no volume
RUN chown -R node:node /app
USER node

CMD ["tail", "-f", "/dev/null"]
