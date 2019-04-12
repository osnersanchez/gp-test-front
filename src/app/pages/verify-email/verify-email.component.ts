import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../sign-in/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TokenStorageService } from '../../shared/auth/token-storage.service';
import { Token } from '../../shared/models/token';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  isTokenValid;

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    public tokenStorageService: TokenStorageService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      (response: any) => {
         this.userService.verifyEmail(response.token)
         .subscribe(
           (res: any) => {
            this.snackBar.open('Correo Verificado Exitosamente!', '×',
            { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
            this.isTokenValid = 'Valid';
            const tokenStorage = this.tokenStorageService.getStorageValue();
            tokenStorage.emailConfirmed = 'True';
            this.tokenStorageService.setToken(JSON.stringify(tokenStorage));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000);
           },
           (er: any) => {
            if (er.status === 400) {
              this.isTokenValid = 'Valid';
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 4000);
              return;
            } else {
              this.isTokenValid = 'Expired';
            }
            this.userService.resendVerificationEmail(response.token)
            .subscribe(
              (r: any) => {
                setTimeout(() => {
                  this.router.navigate(['/']);
                }, 4000);
              },
              (e: any) => {
                // console.log(e);
              }
            );
           }
         );
      },
      (err: any) => {
        this.snackBar.open('Ha ocurrido un error!', '×',
            { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
      }
    );
  }

}
