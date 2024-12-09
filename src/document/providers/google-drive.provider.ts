import { Injectable } from '@nestjs/common';
import { drive_v3 } from 'googleapis';


@Injectable()
export class GoogleDriveProvider {
  constructor(private readonly driveClient: drive_v3.Drive) {}
}
