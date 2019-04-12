import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
})
export class SearchPipe implements PipeTransform {

    transform(items: any[], searchText: string, properties: string[]): any[] {
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
    }



}
