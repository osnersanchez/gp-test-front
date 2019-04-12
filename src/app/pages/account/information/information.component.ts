import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {
  emailValidator,
  matchingPasswords
} from '../../../theme/utils/app-validators';
import { TokenStorageService } from '../../../shared/auth/token-storage.service';
import { UserService } from '../../sign-in/user.service';
import { UserRegister } from '../../../shared/models/user-register';
import { Token } from '../../../shared/models/token';
import { UserFieldsManagerService } from '../../../shared/subjects/user-fields-manager.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  token: Token;
  constructor(
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public tokenStorageService: TokenStorageService,
    public userService: UserService,
    public userFieldsManagerService: UserFieldsManagerService
  ) {}

  ngOnInit() {
    this.token = this.tokenStorageService.getStorageValue();

    this.infoForm = this.formBuilder.group({
      firstName: [
        this.token.firstName,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      lastName: [
        this.token.lastName,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ]
    });

    this.passwordForm = this.formBuilder.group(
      {
        newPassword: [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)])
        ],
        confirmNewPassword: [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)])
        ]
      },
      { validator: matchingPasswords('newPassword', 'confirmNewPassword') }
    );
  }

  public onInfoFormSubmit(values?: Object): void {
    if (!this.infoForm.valid) {
      this.snackBar.open('Error al modificar nombre', '×', {
        verticalPosition: 'top',
        duration: 3000
      });
      return;
    } else {
      console.log(this.infoForm.value);
      const auxUser = new UserRegister(
        this.token.userId,
        this.infoForm.value.firstName,
        this.infoForm.value.lastName,
        this.token.emailAddress,
        this.token.emailAddress,
        null
      );

      this.userService.updateUser(auxUser).subscribe(
        (response: any) => {
          this.userFieldsManagerService.setFullName(
            this.infoForm.value.firstName + ' ' + this.infoForm.value.lastName
          );
          this.token.firstName = this.infoForm.value.firstName;
          this.token.lastName = this.infoForm.value.lastName;

          this.tokenStorageService.setToken(JSON.stringify(this.token));
          this.snackBar.open('Modificación exitosa!', '×', {
            verticalPosition: 'top',
            duration: 3000
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  public onPasswordFormSubmit(values?: Object): void {
    if (
      !this.passwordForm.valid ||
      this.passwordForm.controls.confirmNewPassword.hasError(
        'mismatchedPasswords'
      )
    ) {
      this.snackBar.open('Error al modificar contraseña', '×', {
        verticalPosition: 'top',
        duration: 3000
      });
      return;
    } else {
      console.log(this.infoForm.value);
      const auxUser = new UserRegister(
        this.token.userId,
        this.token.firstName,
        this.token.lastName,
        this.token.emailAddress,
        this.token.emailAddress,
        this.passwordForm.value.newPassword
      );

      this.userService.updateUser(auxUser).subscribe(
        (response: any) => {
          this.snackBar.open('Modificación exitosa!', '×', {
            verticalPosition: 'top',
            duration: 3000
          });
        },
        (error: any) => {
          console.log(error);
          this.snackBar.open('Error al modificar!', '×', {
            verticalPosition: 'top',
            duration: 3000
          });
        }
      );
    }
  }
}
