import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Roles } from '../../../Models/Enums/Roles';

@Pipe({ name: 'roleName' })
export class RoleNamePipe implements PipeTransform {
    constructor( private sanitizer: DomSanitizer) {    }

    transform(value: string) {
        var name = value;

        var nullContent = "<span class='text-muted'><em>brak</em></span>"
        if (value == null || value == 'undefined' || value == "")
            return this.sanitizer.bypassSecurityTrustHtml(nullContent);

        switch (value) {
            case Roles.Admin:
                name = "Administrator";
                break;
            case Roles.Carrier:
                name = "Dostawca";
                break;
            case Roles.SalePoint:
                name = "Punkt sprzedaży";
                break;
            case Roles.Organisation:
                name = "Właściciel";
                break;
        }
        return name;
    }
}