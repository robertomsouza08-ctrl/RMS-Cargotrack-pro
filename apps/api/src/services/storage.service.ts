
import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';

@Injectable()
export class StorageService {
  s3: AWS.S3;
  bucket: string;
  constructor(){
    this.s3 = new AWS.S3({
      endpoint: process.env.S3_ENDPOINT,
      accessKeyId: process.env.S3_KEY,
      secretAccessKey: process.env.S3_SECRET,
      s3ForcePathStyle: true,
      signatureVersion: 'v4'
    });
    this.bucket = process.env.S3_BUCKET || 'rms-cargotrack-pro';
  }
  async upload(file: Express.Multer.File, key: string){
    await this.s3.putObject({ Bucket: this.bucket, Key: key, Body: file.buffer, ContentType: file.mimetype || 'image/jpeg', ACL: 'public-read' }).promise();
    const endpoint = (process.env.S3_PUBLIC_BASE || `${process.env.S3_ENDPOINT}/${this.bucket}`).replace(/\/$/, '');
    return `${endpoint}/${key}`;
  }
}
