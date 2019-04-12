import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationsRoutingModule } from './publications-routing.module';
import { DetailsPublicationComponent } from './details-publication/details-publication.component';
import { ListPublicationsComponent } from './list-publications/list-publications.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { ZoomImgComponent } from './details-publication/zoom-img/zoom-img.component';
import { AddPublicationComponent } from './add-publication/add-publication.component';
import { PlansSelectionComponent } from './plans-selection/plans-selection.component';
import { UpdatePublicationComponent } from './update-publication/update-publication.component';
import { LinksComponent } from './links/links.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { AttachedModule } from '../../shared/attached/attached.module';
import { AddCategoryComponent } from './add-category/add-category.component';

@NgModule({
  imports: [
    CommonModule,
    PublicationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,      
    SwiperModule,
    NgxPaginationModule,
    AttachedModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
    DetailsPublicationComponent, 
    ListPublicationsComponent, 
    ZoomImgComponent, 
    AddPublicationComponent, 
    PlansSelectionComponent, 
    UpdatePublicationComponent, 
    LinksComponent, 
    BenefitsComponent,
    AddCategoryComponent
  ],
  entryComponents: [
    ZoomImgComponent,
    BenefitsComponent
  ]
})
export class PublicationsModule { }
