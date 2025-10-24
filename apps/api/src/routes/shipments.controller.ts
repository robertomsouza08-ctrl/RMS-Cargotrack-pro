
import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { StorageService } from '../services/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

function toRad(x:number){return x*Math.PI/180}
function haversine(lat1:number, lon1:number, lat2:number, lon2:number){
  const R=6371000; const dLat=toRad(lat2-lat1); const dLon=toRad(lon2-lon1);
  const a=Math.sin(dLat/2)**2+Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(a));
}

@Controller('shipments')
export class ShipmentsController {
  constructor(private prisma: PrismaService, private storage: StorageService) {}

  @Get()
  async list(){
    return this.prisma.shipment.findMany({ include: { driver: true, pickupDc: true, proof: true } });
  }

  @Get(':id')
  async detail(@Param('id') id: string){
    const s = await this.prisma.shipment.findUnique({ where: { id }, include: { checkpoints: true, proof: true } });
    if(!s) throw new BadRequestException('Shipment não encontrado');
    return s;
  }

  @Post(':id/checkin')
  async checkin(@Param('id') id: string, @Body() body: { lat:number; lng:number; accuracy?:number; }){
    const s = await this.prisma.shipment.findUnique({ where: { id }, include: { pickupDc: true } });
    if(!s) throw new BadRequestException('Shipment inválido');
    const d = haversine(body.lat, body.lng, s.pickupDc.lat, s.pickupDc.lng);
    if(d>150) throw new BadRequestException('Fora do raio do CD');
    await this.prisma.checkpoint.create({ data: { shipmentId: id, type: 'CHECKIN', lat: body.lat, lng: body.lng, accuracy: body.accuracy ?? null } });
    await this.prisma.shipment.update({ where: { id }, data: { status: 'IN_TRANSIT' } });
    return { ok: true };
  }

  @Post(':id/track')
  async track(@Param('id') id: string, @Body() body: { lat:number; lng:number; accuracy?:number; }){
    await this.prisma.checkpoint.create({ data: { shipmentId: id, type: 'TRACK', lat: body.lat, lng: body.lng, accuracy: body.accuracy ?? null } });
    return { ok: true };
  }

  @Post(':id/checkout')
  @UseInterceptors(FileInterceptor('photo'))
  async checkout(@Param('id') id: string, @UploadedFile() photo: any, @Body() body: { lat:number; lng:number; accuracy?:number; notes?:string; }){
    const s = await this.prisma.shipment.findUnique({ where: { id } });
    if(!s) throw new BadRequestException('Shipment inválido');
    const d = haversine(body.lat, body.lng, s.deliveryLat, s.deliveryLng);
    if(d> (s.deliveryRadiusM||100)) throw new BadRequestException('Fora do raio de entrega');
    if(!photo) throw new BadRequestException('Foto é obrigatória');
    const url = await this.storage.upload(photo, `proofs/${id}-${Date.now()}.jpg`);
    await this.prisma.checkpoint.create({ data: { shipmentId: id, type: 'CHECKOUT', lat: body.lat, lng: body.lng, accuracy: body.accuracy ?? null } });
    await this.prisma.deliveryProof.create({ data: { shipmentId: id, photoUrl: url, lat: body.lat, lng: body.lng, notes: body.notes ?? null } });
    await this.prisma.shipment.update({ where: { id }, data: { status: 'DELIVERED' } });
    return { ok: true, photoUrl: url };
  }
}
