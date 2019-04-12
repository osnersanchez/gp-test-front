import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByIdPipe } from './filter-by-id.pipe';
import { FilterBrandsPipe } from './filter-brands.pipe';
import { BrandSearchPipe } from './brand-search.pipe';
import { SearchPipe } from './search.pipe';
import { SanitizerPipe } from './sanitizer.pipe';

@NgModule({
    imports: [ 
        CommonModule 
    ],
    declarations: [
        FilterByIdPipe,
        FilterBrandsPipe,
        BrandSearchPipe,
        SearchPipe,
        SanitizerPipe
    ],
    exports: [
        FilterByIdPipe,
        FilterBrandsPipe,
        BrandSearchPipe,
        SearchPipe,
        SanitizerPipe
    ]
})
export class PipesModule { }
