import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RecoveryPasswordComponent } from './recovery-password.component';

export const routes = [
  { path: '', component: RecoveryPasswordComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule
  ],
  declarations: [
    RecoveryPasswordComponent
  ]
})
export class RecoveryPasswordModule { }
