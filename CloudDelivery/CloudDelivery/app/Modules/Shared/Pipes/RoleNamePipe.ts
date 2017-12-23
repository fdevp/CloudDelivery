import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'roleName' })
export class RoleNamePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {

    }

    transform(value: string) {
        var name = value;

        var nullContent = "<span class='text-muted'><em>brak</em></span>"
        if (value == null || value == 'undefined' || value == "")
            return this.sanitizer.bypassSecurityTrustHtml(nullContent);

        switch (value) {
            case "admin":
                name = "Administrator";
                break;
            case "carrier":
                name = "Dostawca";
                break;
            case "salepoint":
                name = "Punkt sprzedaży";
                break;
            case "organisator":
                name = "Właściciel";
                break;
        }
        return name;
    }
}