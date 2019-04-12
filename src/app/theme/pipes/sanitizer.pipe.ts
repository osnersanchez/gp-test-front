import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizer',
})
export class SanitizerPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url:string) {
        if(url.includes("yout") && url.includes("watch")){
            url = url.replace("watch?v=", "embed/");
        }else{
            if(url.includes(".pdf")){
                url = `https://docs.google.com/viewer?url=${url}&embedded=true`
            }
            
        }
        console.log(url);
        
            
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    /* transform(url: string): any[] {
        try {
            if (!items) return [];
            if (!searchText) return items;
            if (!properties.length) return items;

            searchText = searchText.toLowerCase();
            return items.filter(it => {
                return properties.find(property => {
                    if(!it[property]) return false;
                    return it[property].toLowerCase().includes(searchText)
                });
            });
        } catch (error) {
            return items;
        }
    } */



}
