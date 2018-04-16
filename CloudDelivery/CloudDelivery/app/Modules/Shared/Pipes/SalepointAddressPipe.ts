import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'salepointAddress' })
export class SalepointAddressPipe implements PipeTransform {
    
    transform(value: any) {
        console.warn("SP PIPE", value);
       return value.SalepointCity + ", "+value.SalepointAddress
    }
}