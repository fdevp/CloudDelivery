import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'salepointAddress' })
export class SalepointAddressPipe implements PipeTransform {
    
    transform(value: any) {
       return value.SalepointCity + ", "+value.SalepointAddress
    }
}