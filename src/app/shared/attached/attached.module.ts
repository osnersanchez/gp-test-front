import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachedComponent } from './attached.component';

@NgModule({
  declarations: [AttachedComponent],
  exports: [AttachedComponent],
  imports: [
    CommonModule
  ]
})
export class AttachedModule { }
