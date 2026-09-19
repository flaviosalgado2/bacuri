#!/bin/bash
# Renova o certificado SSL do Let's Encrypt e reinicia o Nginx.
# Rode manualmente ou configure um cron para executar a cada 12 horas.

set -e

echo "Verificando renovação do certificado Let's Encrypt..."

docker compose -f docker-compose.prod.yml run --rm certbot renew \
  --webroot \
  --webroot-path /var/www/certbot \
  --non-interactive \
  --quiet

DOMAIN=${DOMAIN:-}

if [ -n "$DOMAIN" ] && [ -f "certbot/conf/live/$DOMAIN/fullchain.pem" ]; then
  echo "Copiando certificado renovado para nginx/ssl/..."
  cp "certbot/conf/live/$DOMAIN/fullchain.pem" nginx/ssl/cert.pem
  cp "certbot/conf/live/$DOMAIN/privkey.pem" nginx/ssl/key.pem
fi

echo "Reiniciando Nginx para aplicar o novo certificado..."
docker compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "Renovação concluída."
