#!/bin/bash
# Emite o certificado SSL inicial com Let's Encrypt usando Certbot.
# Configure DOMAIN e EMAIL no .env.prod antes de executar.

set -e

DOMAIN=${DOMAIN:-}
EMAIL=${EMAIL:-}

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
  echo "Erro: configure as variáveis DOMAIN e EMAIL no .env.prod"
  exit 1
fi

echo "Emitindo certificado Let's Encrypt para $DOMAIN..."

docker compose -f docker-compose.prod.yml run --rm certbot certonly \
  --webroot \
  --webroot-path /var/www/certbot \
  -d "$DOMAIN" \
  --email "$EMAIL" \
  --agree-tos \
  --non-interactive \
  --verbose

echo "Copiando certificado para nginx/ssl/..."
mkdir -p nginx/ssl
cp "certbot/conf/live/$DOMAIN/fullchain.pem" nginx/ssl/cert.pem
cp "certbot/conf/live/$DOMAIN/privkey.pem" nginx/ssl/key.pem

echo "Reiniciando Nginx..."
docker compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "Pronto! Certificado salvo em certbot/conf/live/$DOMAIN/ e copiado para nginx/ssl/"
