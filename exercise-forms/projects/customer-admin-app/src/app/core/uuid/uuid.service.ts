import uuid from 'uuid/v4';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UuidService {
  constructor() {}

  generate(): string {
    return uuid();
  }
}
