import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatSnackBar
} from '@angular/material';
import {
  emailValidator,
  matchingPasswords
} from '../../theme/utils/app-validators';
import { UserService } from './user.service';
import { UserRegister } from '../../shared/models/user-register';
import { LoginManagerService } from '../../shared/subjects/login-manager.service';
import { UserFieldsManagerService } from '../../shared/subjects/user-fields-manager.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public router: Router, public snackBar: MatSnackBar,
    public userService: UserService,
    public loginManagerService: LoginManagerService,
    public userFieldsManagerService: UserFieldsManagerService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required])]
    });

    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    }, {
        validator: matchingPasswords('password', 'confirmPassword')
      });

  }

  public onLoginFormSubmit(values: Object): void {
    if (this.loginForm.valid) {
      this.userService.login(values)
        .subscribe((data: any) => {
          localStorage.setItem('session', JSON.stringify(data));
          this.userService.getMe().subscribe(
            res => {
              localStorage.setItem('session', JSON.stringify({...data,...res['user']}));
            }
          )

          this.router.navigate(['/']);
          this.loginManagerService.setStatusLoggedIn(true);

          const userFullName = data.firstName + ' ' + data.lastName;
          this.userFieldsManagerService.setFullName(userFullName);

          this.snackBar.open('Bienvenido a Test GoodPanda!', null, {
            duration: 2000
          });
        },
          (error: any) => {
            this.snackBar.open('Error al ingresar!', null, {
              duration: 2000
            });
            console.log(error);
          });
    }
  }

  public onRegisterFormSubmit(values: Object): void {
    if (this.registerForm.valid) {
      const accountInfo = {
        name: values['name'],
        email: values['email'],
        password: values['password']
      };
      this.userService.signup(accountInfo)
        .subscribe(
          (response: any) => {
            this.snackBar.open('Registrado exitosamente!', '×', {
              panelClass: 'success',
              verticalPosition: 'bottom',
              duration: 3000
            });

            this.userService.login({ email: accountInfo.email, password: accountInfo.password }).subscribe((data: any) => {
              localStorage.setItem('session', JSON.stringify(data));
              this.router.navigate(['/']);
              this.loginManagerService.setStatusLoggedIn(true);
              const userFullName = data.firstName + ' ' + data.lastName;
              this.userFieldsManagerService.setFullName(userFullName);
              this.snackBar.open('Bienvenido a Test GoodPanda!', null, {
                duration: 2000
              });
            },
              (error: any) => {
                this.snackBar.open('Error al ingresar!', null, {
                  duration: 2000
                });
                console.log(error);
              });;
          },
          (error: any) => {
            this.snackBar.open('Error al registrar!', '×', {
              verticalPosition: 'bottom',
              duration: 3000
            });
            console.log(error);
          }
        );
    }
  }

  goToSendMail() {
    this.router.navigate(['/send-mail']);
  }


}
