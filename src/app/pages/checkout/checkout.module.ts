import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutComponent } from './checkout.component';
import { BrMasker4Module } from 'brmasker4';

export const routes = [
  { path: '', component: CheckoutComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    BrMasker4Module
  ],
  declarations: [CheckoutComponent],
  exports: [CheckoutComponent],
})
export class CheckoutModule {}
