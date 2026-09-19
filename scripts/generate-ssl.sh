#!/bin/bash
# Gera um certificado SSL autoassinado para testes locais.
# Em produção real, substitua os arquivos em nginx/ssl pelos certificados válidos.

set -e

SSL_DIR="nginx/ssl"
mkdir -p "$SSL_DIR"

if [ -f "$SSL_DIR/cert.pem" ] && [ -f "$SSL_DIR/key.pem" ]; then
  echo "Certificado SSL já existe em $SSL_DIR"
  exit 0
fi

echo "Gerando certificado SSL autoassinado em $SSL_DIR..."
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout "$SSL_DIR/key.pem" \
  -out "$SSL_DIR/cert.pem" \
  -subj "/C=BR/ST=Estado/L=Cidade/O=Bacuri/CN=localhost"

echo "Certificado gerado com sucesso."
echo ""
echo "ATENÇÃO: este certificado é autoassinado e serve apenas para testes."
echo "Em produção, substitua $SSL_DIR/cert.pem e $SSL_DIR/key.pem pelos certificados reais."
