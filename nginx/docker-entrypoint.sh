#!/bin/sh
# Substitui variáveis de ambiente no nginx.conf e inicia o Nginx.

set -e

# Cria o nginx.conf final a partir do template
envsubst '\$DOMAIN' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Inicia o Nginx em primeiro plano
exec nginx -g 'daemon off;'
