import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'destinationAddress' })
export class DestinationAddressPipe implements PipeTransform {
    transform(value: any) {
       return value.DestinationCity + ", "+value.DestinationAddress
    }
}