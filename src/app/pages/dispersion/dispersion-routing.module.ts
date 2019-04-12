import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateComponent } from './generate/generate.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'list', component: ListComponent, data: { breadcrumb: 'Listado' } },
  { path: 'generate', component: GenerateComponent, data: { breadcrumb: 'Generar Excel' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispersionRoutingModule { }
