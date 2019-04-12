import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PublicationsApiService } from '../../../shared/services/publications-api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  public formCategory = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  public loading = false;

  constructor(
    private snackBar: MatSnackBar,
    private publicationService: PublicationsApiService
  ) { }

  ngOnInit() {
  }

  save() {
    this.loading = true;
    this.publicationService.addCategory(this.formCategory.value)
      .subscribe(res => {
        this.loading = false;
        this.snackBar.open(res['data'], null, {
          duration: 2000
        });
      }, err => {
        this.loading = false
        this.snackBar.open(err['data'], null, {
          duration: 2000
        });
      })
  }

}
