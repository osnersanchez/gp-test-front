import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { Token } from '@angular/compiler';
import { TokenStorageService } from '../../shared/auth/token-storage.service';
import { UserService } from '../sign-in/user.service';
import { MatSnackBar } from '@angular/material';
import { CheckoutService } from './checkout.service';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { Router } from '@angular/router';
import { ShoppingCartManagerService } from '../../shared/subjects/shopping-cart.service';
declare var OpenPay: any;
declare let paypal: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewChecked {
  @ViewChild('horizontalStepper')
  horizontalStepper: MatStepper;
  @ViewChild('verticalStepper')
  verticalStepper: MatStepper;
  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  countries = [];
  items;
  loadDetails: boolean = false;
  isReadyToSubmit: boolean = false;
  months = [];
  years = [];
  deviceSessionId: any;
  openPaytokenId: any;
  deliveryMethods = [];
  grandTotal = 0;
  paymentMethod;
  paymentMethods = [
    {
      name: 'Tarjeta de crédito (con Openpay)',
      value: 'Openpay'
    },
    {
      name: 'PayPal',
      value: 'PayPal'
    }
  ];

  addScript: boolean = false;
  paypalLoad: boolean = false;
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
          const paymentMethod = {
            PaymentMethod: 'PayPal'
          };
          this.checkoutService.post(userId, paymentMethod).subscribe(
            success => {
              if (this.horizontalStepper) {
                this.horizontalStepper.selectedIndex = 3;
                this.horizontalStepper.next();
              }
              if (this.verticalStepper) {
                this.verticalStepper.selectedIndex = 3;
                this.verticalStepper.next();
              }
              this.isReadyToSubmit = false;
              this.snackBar.open('Compra realizada!', null, {
                duration: 2000
              });
              this.shoppingCartManagerService.setNumberOfItem([]);
            },
            error => {
              this.isReadyToSubmit = false;
              this.snackBar.open('Error al comprar verifique sus datos', null, {
                duration: 2000
              });
              // this.confirmationToast({
              //   msg: `Verifique su conexión a internet y vuelva a intentarlo`
              // });
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
    public appService: AppService,
    public formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private checkoutService: CheckoutService,
    private shoppingCartService: ShoppingCartService,
    public shoppingCartManagerService: ShoppingCartManagerService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

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

  ngOnInit() {
    let userId = this.tokenStorageService.getUserId();
    OpenPay.setId('mb8olxuhgdiz0yn9ythk');
    OpenPay.setApiKey('pk_42d2335b413044d882362efc0d6490d4');
    OpenPay.setSandboxMode(true);
    this.grandTotal = 0;
    this.deviceSessionId = OpenPay.deviceData.setup();
    this.loadShoppingCart();
    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.billingForm = this.formBuilder.group({
      // firstName: [''],
      // lastName: [''],
      // middleName: '',
      // company: '',
      // email: [''],
      // phone: [''],
      // country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      address: ['', Validators.required]
    });
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

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  loadShoppingCart() {
    this.isReadyToSubmit = false;
    this.loadDetails = true;
    let userId = this.tokenStorageService.getUserId();
    this.shoppingCartService.getByUser('en_proceso').subscribe(
      (items: any) => {
        this.loadDetails = false;
        this.items = items.shoping_carts;
        this.items.forEach(element => {
          this.grandTotal = element.TotalPrice + this.grandTotal;
        });
        const grouped = this.groupBy(items, type => type.Currency);

        const MxnItems = grouped.get(0);
        const UsdItems = grouped.get(1);

        if (MxnItems || UsdItems) {
          this.paymentMethods = [
            {
              name: 'PayPal',
              value: 'PayPal'
            },
            {
              name: 'Tarjeta de crédito (con Openpay)',
              value: 'Openpay'
            }
          ];
        }

        if (MxnItems && UsdItems) {
          this.paymentMethods = [
            {
              name: 'Tarjeta de crédito (con Openpay)',
              value: 'Openpay'
            }
          ];
        }
      },
      error => {
        console.log(error);
        this.loadDetails = false;
      }
    );
  }

  onChangePayment(paymentMethod) {
    this.paymentMethod = paymentMethod;
    if (this.paymentMethod === 'PayPal') {
      this.paymentForm.disable();
    } else {
      this.paymentForm.enable();
    }
  }
  public placeOrder() {
    // this.appService.Data.cartList.length = 0;
    this.addCheckout();
  }

  addCheckout() {
    this.isReadyToSubmit = true;
    let userId = this.tokenStorageService.getUserId();
    let cardNumberString: string = this.paymentForm.get('cardNumber').value;
    let cardNumber: number = parseInt(
      cardNumberString
        .replace(' ', '')
        .replace(' ', '')
        .replace(' ', ''),
      10
    );

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
        address: {
          city: this.billingForm.get('city').value,
          line3: '',
          postal_code: this.billingForm.get('zip').value,
          line1: this.billingForm.get('address').value,
          line2: 'Mexico',
          state: this.billingForm.get('state').value,
          country_code: 'MX'
        }
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
          description: `Compra en Betwinc utilizando Tarjeta de crédito (OpenPay) por parte del userId: ${userId}`,
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
                if (this.horizontalStepper) {
                  this.horizontalStepper.selectedIndex = 3;
                  this.horizontalStepper.next();
                  this.horizontalStepper._steps.forEach(
                    step => (step.editable = false)
                  );
                }
                if (this.verticalStepper) {
                  this.verticalStepper.selectedIndex = 3;
                  this.verticalStepper.next();
                  this.verticalStepper._steps.forEach(
                    step => (step.editable = false)
                  );
                }
                this.snackBar.open('Compra realizada!', null, {
                  duration: 2000
                });
                this.shoppingCartManagerService.setNumberOfItem([]);

                this.isReadyToSubmit = false;
              },
              error => {
                this.isReadyToSubmit = false;

                this.snackBar.open(
                  'Error, verifique su conexión a internet y vuelva a intentarlo!',
                  null,
                  {
                    duration: 2000
                  }
                );
                // this.confirmationToast({
                //   msg: `Verifique su conexión a internet y vuelva a intentarlo`
                // });
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
            // this.confirmationToast({
            //   msg: `Verifique su conexión a internet y vuelva a intentarlo`
            // });
          }
        ),
          error => {
            this.loadDetails = false;
            this.snackBar.open('Error, verifique sus datos!', null, {
              duration: 2000
            });
            this.isReadyToSubmit = false;
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
        if (this.horizontalStepper) {
          this.horizontalStepper.selectedIndex = 2;
          this.horizontalStepper.previous();
          // this.horizontalStepper._steps.forEach(
          //   step => (step.editable = false)
          // );
        }
        if (this.verticalStepper) {
          this.verticalStepper.selectedIndex = 2;
          this.verticalStepper.previous();
          // this.verticalStepper._steps.forEach(step => (step.editable = false));
        }
        this.loadDetails = false;
        this.snackBar.open('Error, verifique sus datos!', null, {
          duration: 2000
        });
        this.isReadyToSubmit = false;
        // this.confirmationToast({
        //   msg: `Verifique su conexión a internet y vuelva a intentarlo`
        // });
      }
    );
  }
}
