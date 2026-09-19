#!/bin/sh
# Loop de renovação automática do Certbot.
# Compartilha PID namespace com o Nginx para enviar SIGHUP após renovação.

trap exit TERM

while :; do
  echo "Verificando renovação do certificado Let's Encrypt..."
  if certbot renew --webroot --webroot-path /var/www/certbot --non-interactive --quiet; then
    echo "Certificado renovado ou ainda válido. Recarregando Nginx..."
    kill -HUP $(pidof nginx | awk '{print $1}') 2>/dev/null || true
  fi
  sleep 12h
done
