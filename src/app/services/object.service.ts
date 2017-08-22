import { Injectable } from '@angular/core';

@Injectable()
export class ObjectService {

  constructor() { }

  isObject(object: any): boolean {
    return (typeof object == 'object' ? true : false);
  }

  createRange(length: number): Array<number> {
    let items: number[] = [];
    if(length)
      for (let i = 0; i < length; i++)
        items.push(i);
    else
      items.push(0);
    return items;
  }
}
