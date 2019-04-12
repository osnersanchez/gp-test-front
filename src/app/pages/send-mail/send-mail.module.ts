import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SendMailComponent } from './send-mail.component';

export const routes = [
  { path: '', component: SendMailComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule
  ],
  declarations: [
    SendMailComponent
  ]
})
export class SendMailModule { }
