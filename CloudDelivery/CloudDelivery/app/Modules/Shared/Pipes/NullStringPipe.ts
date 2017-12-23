import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'nullString' })
export class NullStringPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {

    }
    transform(value: string) {
        var content = "<span class='text-muted'><em>brak</em></span>"
        if (value == null || value == 'undefined')
            return this.sanitizer.bypassSecurityTrustHtml(content);
        return value;
    }
}