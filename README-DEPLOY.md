
# RMS CargoTrack Pro - Deploy e Operação

## Passo a passo Railway
1. Crie um Postgres no Railway.
2. Conecte o repositório GitHub.
3. Crie serviço API (apps/api/Dockerfile) e WEB (apps/web/Dockerfile).
4. Configure variáveis de ambiente:
   - API: DATABASE_URL, JWT_SECRET, MAPBOX_TOKEN, S3_ENDPOINT, S3_BUCKET, S3_KEY, S3_SECRET, CORS_ORIGINS
   - WEB: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_MAPBOX_TOKEN
   - MOBILE: EXPO_PUBLIC_API_URL, EXPO_PUBLIC_MAPBOX_TOKEN
5. Rode as migrações no serviço API: `npx prisma migrate deploy`.
6. Acesse os domínios do Railway.

## Guia de Operação

### Perfis
- ADMIN, DISPATCHER, DRIVER

### Fluxo Motorista (Mobile)
1) Login -> 2) Cargas atribuídas -> 3) Check-in no CD (raio 150m) -> 4) Rastreamento automático -> 5) Checkout com foto (raio 100m) -> 6) Offline com reenvio

### Fluxo Despachante (Web)
- Dashboard, Mapa, Gestão de Cargas, Timeline, Prova de entrega, Exportação CSV

### Solução de Problemas (FAQ)
- Check-in/Checkout desabilitado: GPS/raio/permissões
- Foto não enviada: conexão; reenvio automático
- Posição não atualiza: iniciar trajeto; permissões; economia de energia
- 401/403: token expirado; papel incorreto
- Geocodificação: MAPBOX_TOKEN

### Configurações úteis
- Raio CD (150m), Raio entrega (100m), Intervalo tracking, Retenção (180 dias)
