import { Component, Inject, ViewChild, Injectable, OnInit, AfterViewChecked } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { CheckoutComponent } from '../../pages/checkout/checkout.component';
import { TokenStorageService } from '../auth/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { UserService } from '../../pages/sign-in/user.service';
import { CheckoutService } from '../../pages/checkout/checkout.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCartManagerService } from '../subjects/shopping-cart.service';
import { Router } from '@angular/router';

declare var OpenPay: any;
declare let paypal: any;

@Component({
  selector: 'method-payment-dialog',
  templateUrl: 'method-payment-dialog.component.html',
  styleUrls: ['./method-payment-dialog.component.scss']
})

export class MethodPaymentDialogComponent implements OnInit, AfterViewChecked {

  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  countries = [];
  items;
  loadDetails: boolean = false;  
  months = [];
  years = [];
  deviceSessionId: any;
  openPaytokenId: any;
  deliveryMethods = [];  
  paymentMethod;

  grandTotal = 0;
  isReadyToSubmit: boolean = false;
  addScript: boolean = false;
  paypalLoad: boolean = false;

  paymentMethods = [
    { name: 'Tarjeta de crédito (con Openpay)', value: 'Openpay' },
    { name: 'PayPal', value: 'PayPal'}
  ];

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox:
        'Ae1re2T3ocbGRqHZDcD_vm_hutYfiv9oz-_DmNO4GhHDKGM__xnm3G8nqKQNlUtWmtNl_j-FHt2wv96Q',
      production:
        'Ae1re2T3ocbGRqHZDcD_vm_hutYfiv9oz-_DmNO4GhHDKGM__xnm3G8nqKQNlUtWmtNl_j-FHt2wv96Q'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.grandTotal, currency: 'MXN' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      this.isReadyToSubmit = true;
      return actions.payment
        .execute()
        .then(payment => {
          let userId = this.tokenStorageService.getUserId();
          const paymentMethod = { PaymentMethod: 'PayPal' 
        };
          this.checkoutService.post(userId, paymentMethod).subscribe(
            success => {
              this.isReadyToSubmit = false;
              this.snackBar.open('Compra realizada!', null, {
                duration: 2000
              });
              this.closeDialog(true);
              // this.shoppingCartManagerService.setNumberOfItem([]);
            },
            error => {
              this.isReadyToSubmit = false;
              this.snackBar.open('Error al comprar verifique sus datos', null, {
                duration: 2000
              });
            }
          );
        })
        .catch(er => {
          console.log(er);
          this.snackBar.open('Error al comprar verifique sus datos', null, {
            duration: 2000
          });
          this.isReadyToSubmit = false;
        });
    }
  };
  
  constructor(
    private dialogRef: MatDialogRef<MethodPaymentDialogComponent>, 
    public appService: AppService,
    public formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private checkoutService: CheckoutService,
    private shoppingCartService: ShoppingCartService,
    public shoppingCartManagerService: ShoppingCartManagerService,
    private router: Router,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data : any) { }

    ngOnInit() {
      let userId = this.tokenStorageService.getUserId();
      OpenPay.setId('mb8olxuhgdiz0yn9ythk');
      OpenPay.setApiKey('pk_42d2335b413044d882362efc0d6490d4');
      OpenPay.setSandboxMode(true);

      this.grandTotal = this.data.grandTotal;
      this.paymentMethod = this.data.paymentMethod;

      this.deviceSessionId = OpenPay.deviceData.setup();
      // this.loadShoppingCart(); //revisar este metodo puede que no se utilice
      this.countries = this.appService.getCountries();
      this.months = this.appService.getMonths();
      this.years = this.appService.getYears();
      this.deliveryMethods = this.appService.getDeliveryMethods();
      this.deliveryForm = this.formBuilder.group({
        deliveryMethod: [this.deliveryMethods[0]]
      });
      this.paymentForm = this.formBuilder.group({
        cardHolderName: ['', Validators.required],
        cardNumber: ['', Validators.required],
        expiredMonth: ['', Validators.required],
        expiredYear: ['', Validators.required],
        cvv: ['', Validators.required]
      });
    }

    ngAfterViewChecked(): void {
      if (!this.addScript) {
        this.addPaypalScript().then(() => {
          paypal.Button.render(this.paypalConfig, 'paypal-checkout-btn');
          this.paypalLoad = false;
        });
      }
    }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  public placeOrder() {
    // this.appService.Data.cartList.length = 0;
    this.addCheckout();
  }

  addCheckout() {
    this.isReadyToSubmit = true;
    let userId = this.tokenStorageService.getUserId();
    let cardNumberString: string = this.paymentForm.get('cardNumber').value;
    let cardNumber: number = parseInt(cardNumberString.replace(' ', '').replace(' ', '').replace(' ', ''),10);

    let month = this.paymentForm.get('expiredMonth').value;
    let year =
      this.paymentForm.get('expiredYear').value.charAt(2) +
      this.paymentForm.get('expiredYear').value.charAt(3);
    OpenPay.token.create(
      {
        card_number: cardNumber,
        holder_name: this.paymentForm.get('cardHolderName').value,
        expiration_year: year,
        expiration_month: month,
        cvv2: this.paymentForm.get('cvv').value,
      },
      (response: {
        data: {
          id: string;
          holder_name: string;
          brand: string;
        };
        message: string;
        status: number;
      }) => {
        this.openPaytokenId = response.data.id;

        let payload = {
          method: 'card',
          source_id: this.openPaytokenId,
          amount: this.grandTotal,
          description: `Compra utilizando Tarjeta de crédito (OpenPay) por parte del userId: ${userId}`,
          device_session_id: this.deviceSessionId
          //"OrderId":"1"
        };
        this.userService.postOpenpay(payload).subscribe(
          (res: any) => {
            const paymentMethod = {
              PaymentMethod: 'OpenPay'
            };
            this.checkoutService.post(userId, paymentMethod).subscribe(
              success => {
                this.snackBar.open('Compra realizada!', null, {
                  duration: 2000
                });
                // this.shoppingCartManagerService.setNumberOfItem([]);
                this.isReadyToSubmit = false;
                this.closeDialog(true);
                //cerrar dialogo y proceder a la carga de datos

              },
              error => {
                this.isReadyToSubmit = false;
                this.closeDialog(false);
                this.snackBar.open(
                  'Error, verifique su conexión a internet y vuelva a intentarlo!',
                  null, { duration: 2000 });
              }
            );
          },
          (err: any) => {
            console.log(err);
            this.loadDetails = false;
            this.snackBar.open('Error, verifique sus datos!', null, {
              duration: 2000
            });
            this.isReadyToSubmit = false;
            // this.closeDialog(false);
          }
        ),
          error => {
            this.loadDetails = false;
            this.snackBar.open('Error, verifique sus datos!', null, {
              duration: 2000
            });
            this.isReadyToSubmit = false;
            // this.closeDialog(false);
          };
      },
      (error: {
        data: {
          status: number;
          description: string;
          request_id: string;
        };
        message: string;
      }) => {
        console.log(error);
        this.loadDetails = false;
        this.snackBar.open('Error, verifique sus datos!', null, {
          duration: 2000
        });
        // this.closeDialog(false);
        this.isReadyToSubmit = false;
      }
    );
  }


  public closeDialog(valor: Boolean){
    this.dialogRef.close(valor);
  }

}