import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsPublicationComponent } from './details-publication/details-publication.component';
import { AddPublicationComponent } from './add-publication/add-publication.component';
import { ListPublicationsComponent } from './list-publications/list-publications.component';
import { UpdatePublicationComponent } from './update-publication/update-publication.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
    { path: '', component: ListPublicationsComponent, pathMatch: 'full' },
    { path: 'search/:key', component: ListPublicationsComponent, pathMatch: 'full' },
    { path: 'publication/:Id', component: DetailsPublicationComponent, data: { breadcrumb: 'Detalle' }}, //505
    // { path: 'update/:Id', component: UpdatePublicationComponent, data: { breadcrumb: 'Modificar' }},
    { path: 'category', component: AddCategoryComponent, data: { breadcrumb: 'Categoria' }},
    { path: 'create', component: AddPublicationComponent, data: { breadcrumb: 'Crear' }},
    { path: 'edit/:id', component: AddPublicationComponent, data: { breadcrumb: 'Editar' }}
    // { path: 'catalogue/formulas', component: FormulasMenuComponent },          
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationsRoutingModule { }
