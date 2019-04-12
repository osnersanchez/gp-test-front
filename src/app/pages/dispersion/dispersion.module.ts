import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispersionRoutingModule } from './dispersion-routing.module';
import { ListComponent } from './list/list.component';
import { GenerateComponent } from './generate/generate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { ListDialogComponent } from './list/list-dialog/list-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    DispersionRoutingModule,
    FormsModule,
    ReactiveFormsModule,   
    SwiperModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [ListComponent, GenerateComponent, ListDialogComponent],
  entryComponents:[ListDialogComponent]
})
export class DispersionModule { }
