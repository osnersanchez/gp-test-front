import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../sign-in/user.service';


@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements OnInit {


  constructor(private userService: UserService,
              private router: Router,
              public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.sendResetPasswordMail({EmailAddress: form.value.emailAddress})
    .subscribe(
      (response: any) => {
        this.snackBar.open('Por Favor Revise Su Correo!', '×',
            { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 1000);
      },
      (err: any) => {
        this.snackBar.open('Ha Ocurrido Un Error!', '×',
            { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
      }
    );
  }

}
