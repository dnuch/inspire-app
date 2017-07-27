import { Injectable } from '@angular/core';

@Injectable()
export class ObjectService {
    
    constructor() { }
    
    objectLength(object: any): number {
        let length: number = 0;
        for( var key in object )
            if(object.hasOwnProperty(key)) ++length;
        return length;
    }
    
    isObject(object: any): boolean {
        return (typeof object == 'object' ? true : false);
    }
    
    createRange(length: number): Array<number> {
        let items: number[] = [];
        for(let i = 0; i < length; i++) 
            items.push(i);
        return items;
    }
}
