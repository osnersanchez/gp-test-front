import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../sign-in/user.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {

  token;

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (response: any) => {
        this.token = response.token;
      },
      (err: any) => {
        this.snackBar.open('Error!', '×',
            { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.value.password !== form.value.passwordConfirm ) {
      this.snackBar.open('Error contraseñas no coinciden!', '×',
            { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
            return;
    } else {

      this.userService.resetPassword(this.token, {Password: form.value.password}).subscribe(
        (res: any) => {
          this.snackBar.open('Contraseña cambiada exitosamente!', '×',
            { panelClass: 'sucess', verticalPosition: 'bottom', duration: 3000 });
          setTimeout(() => {
              this.router.navigate(['/']);
          }, 2000);
        },
        (er: any) => {
          this.snackBar.open('Error! Correo De Recuperacion ha Caducado. Por Favor Vuelva a Solicitar Otro Correo!!!!', '×',
          { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
        }
      );
    }
  }

}
