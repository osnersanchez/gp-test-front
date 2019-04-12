import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

  checked = false
  panelOpenState = false;

  constructor(
    public dialogRef: MatDialogRef<BenefitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

  // close(): void {
  //   this.dialogRef.close();
  // }

  // ok(): void {
  //   this.dialogRef.close(true);
  // }

}
