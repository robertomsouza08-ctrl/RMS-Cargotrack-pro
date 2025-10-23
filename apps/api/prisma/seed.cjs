
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

(async () => {
  const adminPass = await bcrypt.hash('admin123', 10);
  const driverPass = await bcrypt.hash('driver123', 10);
  const dispatcherPass = await bcrypt.hash('dispatcher123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@rms.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@rms.com', passwordHash: adminPass, role: 'ADMIN' }
  });

  const dispatcher = await prisma.user.upsert({
    where: { email: 'desp@rms.com' },
    update: {},
    create: { name: 'Despachante', email: 'desp@rms.com', passwordHash: dispatcherPass, role: 'DISPATCHER' }
  });

  const driver = await prisma.user.upsert({
    where: { email: 'motorista@rms.com' },
    update: {},
    create: { name: 'Motorista Demo', email: 'motorista@rms.com', passwordHash: driverPass, role: 'DRIVER' }
  });

  const dc = await prisma.distributionCenter.create({
    data: { name: 'CD São Paulo', address: 'Av. Exemplo, 1000, São Paulo - SP', lat: -23.55052, lng: -46.633308 }
  });

  await prisma.shipment.create({
    data: {
      code: 'CARGA-0001',
      description: 'Entrega demo',
      pickupDcId: dc.id,
      deliveryAddress: 'Praça da Sé, São Paulo - SP',
      deliveryLat: -23.5503099,
      deliveryLng: -46.6342006,
      driverId: driver.id
    }
  });

  console.log('Seed concluído');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
