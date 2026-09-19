#!/bin/bash
# Renova o certificado SSL do Let's Encrypt e reinicia o Nginx.
# O container certbot-prod já faz isso automaticamente a cada 12 horas.
# Use este script apenas se quiser forçar uma renovação manual.

set -e

echo "Forçando renovação do certificado Let's Encrypt..."

docker compose -f docker-compose.prod.yml run --rm certbot renew \
  --webroot \
  --webroot-path /var/www/certbot \
  --non-interactive \
  --verbose \
  --force-renewal

echo "Reiniciando Nginx para aplicar o certificado..."
docker compose -f docker-compose.prod.yml restart nginx

echo "Renovação concluída."
