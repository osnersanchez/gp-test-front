import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { PublicationsManagerService } from '../../../shared/subjects/publications-manager.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatSnackBar } from "@angular/material";
import { MethodPaymentDialogComponent } from '../../../shared/method-payment-dialog/method-payment-dialog.component';
import { Data, AppService } from '../../../app.service';
import { TokenStorageService } from '../../../shared/auth/token-storage.service';
import { StoreService } from '../../../shared/services/store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { BenefitsComponent } from '../benefits/benefits.component';
import { PublicationsApiService } from '../../../shared/services/publications-api.service';
import { Environments } from '../../../../environments/environments.constanst';
// declare var $:any;

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss']
})
export class AddPublicationComponent implements OnInit, OnDestroy {
  isLinear = false;

  private susbcriptions: Subscription = new Subscription()
  public loading: boolean = false;
  public publication_title;
  public segundoStepNext = true;
  public categoryList = [];

  public formPublication = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    idCategory: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required)
  })

  months = [];
  years = [];
  impuesto: number = 0.08;

  productInformationForm: FormGroup;
  productTypeForm: FormGroup;
  productPlanForm: FormGroup;
  productAttachedForm: FormGroup;
  selectPrecioForm: FormGroup;
  productLinkForm: FormGroup;
  // publicationTypeForm: FormGroup;
  paymentForm: FormGroup;
  publicationTypeVacioForm: FormGroup;

  invalidEmail: boolean = false;
  productId = null;

  color = 'accent';
  checked = false;
  disabled = false;
  isChecked = false;
  publicationApply: boolean = false;

  //links
  public links = [];
  public horizontalStepper: boolean = false;

  panelOpenState = false;
  favoriteSeason: string;
  paymentMethod;
  categoriesList;
  planSelection;
  emailAddress: string;
  pagoExtra: number = 0;

  //tipo de publicación
  typePublicationData;
  AuctionStartDate: Date;
  AuctionChecked = false;
  AuctionPriceInit = 0;
  public enviroment = Environments.ENDPOINT


  //publicacion de producto pagada
  isPublicationPay = false;
  StoreId;

  imagePrincipal;

  PremiumPlan: number = 0;

  public ciudades = [
    { value: '0', name: 'Juarez' },
    { value: '1', name: 'Oaxaca' },
    { value: '2', name: 'Yucatan' }
  ];
  public municipios = [
    { value: '0', name: 'Juarez' },
    { value: '1', name: 'Oaxaca' },
    { value: '2', name: 'Yucatan' }
  ];
  public currencyType = [
    { name: 'MXN', value: 'MXN' },
    { name: 'USD', value: 'USD' }
  ];
  public linkType = [
    { name: 'Video', value: 'video' },
    { name: 'PDF', value: 'pdf' },
    { name: 'Link', value: 'link' }
  ];
  public paymentMethodsType = [
    { name: 'Una Exhibición', value: 'OneExhibition' },
    { name: 'Credito', value: 'Credit' }
  ];
  public qualityType = [
    { name: 'Nuevo', value: 'New' },
    { name: 'Segunda Mano', value: 'SecondHand' },
    { name: 'Calidad Exportada', value: 'ExportQuality' }
  ];
  public salesType = [
    { name: 'Venta', value: 'Sale' },
    { name: 'Subasta', value: 'Auction' }
  ];
  public publicationType = [
    { name: 'Publicación Libre', value: 1 },
    { name: 'Publicación Premium', value: 2 }
    // { name: 'Compra Garantizada', value: 2 },
    // { name: 'Subasta', value: 3 },
    // { name: 'Liquidaciones e Inventario', value: 4 },
    // { name: 'Innovaciones y Novedades', value: 5 }
  ];
  public paymentMethods = [
    { name: 'Tarjeta de crédito (con Openpay)', value: 'Openpay' },
    { name: 'PayPal', value: 'PayPal' }
  ];

  public unitMeasure = [
    // { name:'Caja', value:'1'},
    // { name:'Pieza', value:'2'},
    // { name:'Volumen', value:'3'},
    // { name:'Paquete', value:'4'}
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private publicationService: PublicationsManagerService,
    private publicationsApi: PublicationsApiService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public appService: AppService,
    public tokenSesion: TokenStorageService,
    public storeService: StoreService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  saveProduct() {
    console.log(this.formPublication.value);
    if (this.formPublication.valid) {
      this.loading = true;
      let val = { ...this.formPublication.value };
      let body: FormData;
      if (this.formPublication.value.photo instanceof FormData){
        body = this.formPublication.value.photo;
        delete val.photo;
      } else {
        body = new FormData();
      }
      for (var key in val) {
        body.append(key, this.formPublication.value[key])
      }
      if (!this.productId) {
        this.publicationsApi.addProduct(body)
          .subscribe(res => {
            this.loading = false;
            this.snackBar.open('Creado exitosamente!', null, {
              duration: 2000
            });
            this.router.navigate(['/publications'])
          }, err => {
            this.snackBar.open('No se pudo crear', null, {
              duration: 2000
            });
            this.loading = false;
          })
      } else {
        this.publicationsApi.editProduct(body, this.productId)
          .subscribe(res => { 
            console.log(res);
            
            this.loading = false;
            this.snackBar.open('Cambios guardos!', null, {
              duration: 2000
            });
            this.router.navigate(['/publications'])
          }, err => {
            this.snackBar.open('No se pudieron guardar los cambios', null, {
              duration: 2000
            });
            this.loading = false;
          })

      }
    }
  }

  ngOnInit() {
    this.susbcriptions.add(this.publicationService.getCategoriesList().subscribe((res) => { this.categoriesList = res; }));
    this.susbcriptions.add(this.publicationService.getLoadingDetails().subscribe(load => this.loading = load))

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.productId = params.id
        this.publicationsApi.getProduct(params.id)
          .subscribe((res: any) => {
            console.log(res);
            this.formPublication.patchValue(res)
          });
      }
    });

    this.publicationsApi.getCategory()
      .subscribe((res: any) => {

        this.categoryList = res.data
      })

    // this.publicationService.getPlantList().subscribe(plast=>{
    //   this.publicationType = plast;
    // })

    this.publicationService.getUnitList().subscribe(unitsList => {
      this.unitMeasure = unitsList;
    })

    this.publicationService.loadAllPlans();
    this.publicationService.loadAllUnits();

    this.syncProductInformationForm();
    this.syncProductTypeForm();
    this.syncProductPlan();
    this.syncAttachedPlan();
    this.syncAttachedPlan();
    this.syncSelectPrecio();
    // this.syncPaypalTypeForm();
    // this.syncVacioForm();

    (window.innerWidth < 768) ? this.horizontalStepper = false : this.horizontalStepper = true;

    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();

    this.emailAddress = this.tokenSesion.getemailAddress();
  }

  ngOnDestroy() {
    this.publicationService.resetPublication();
    this.susbcriptions.unsubscribe();
  }

  cambio(data) {
    this.isChecked = data.checked;
  }

  saveImageList(list: FormData) {
    this.productAttachedForm.patchValue({ attached: list });
  }

  PrincipalImage(list) {
    console.log("imagen principal", list[0]);
    this.imagePrincipal = list[0];
  }

  savePlan(plan) {
    this.planSelection = plan;
  }

  private syncProductInformationForm() {
    this.productInformationForm = new FormGroup({
      Title: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      Description: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      Stock: new FormControl(1, [Validators.required, Validators.min(1)]),
      Qualities: new FormControl(null, [Validators.required]),
      DeliveryTime: new FormControl(1, Validators.required)
    });
    this.productLinkForm = new FormGroup({
      type: new FormControl(null, Validators.required),
      link: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required)
    });
  }

  private syncProductTypeForm() {
    this.productTypeForm = new FormGroup({
      CategoryId: new FormControl(null, Validators.required)
    });
  }

  private syncProductPlan() {
    this.productPlanForm = new FormGroup({
      PublicationPlan: new FormControl(null, Validators.required),
      Comission: new FormControl(null, Validators.required)
    });
  }

  private syncAttachedPlan() {
    this.productAttachedForm = new FormGroup({
      attached: new FormControl(null, Validators.required)
    });
  }

  private syncSelectPrecio() {
    this.selectPrecioForm = new FormGroup({
      Precio: new FormControl(null, Validators.required)
    });
  }

  // private syncVacioForm() {
  //   this.publicationTypeVacioForm = new FormGroup({
  //     PublicationId: new FormControl(null, Validators.required),
  //   });
  // }

  // private syncPaypalTypeForm() {
  //   this.paymentForm = new FormGroup({
  //     cardHolderName: new FormControl(null, Validators.required),
  //     cardNumber: new FormControl(null, Validators.required),
  //     expiredMonth: new FormControl(null, Validators.required),
  //     expiredYear: new FormControl(null, Validators.required),
  //     cvv: new FormControl(null, Validators.required),
  //   });
  // }

  // AddLink() {
  //   this.links.push(this.productLinkForm.value);
  //   this.productLinkForm.reset();
  // }

  private addhttp(url) {
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = 'http://' + url;
    }
    return url;
  }

  removeLinks(array, x) {
    console.log("removeLinks() --> links.component (padre)");

    document.getElementById(`link-${x}`).classList.add("fadeOut");

    setTimeout(() => { array.splice(x, 1); }, 400);
  }

  handleSelection(event) {
    if (event.option.selected) {
      event.source.deselectAll();
      event.option._setSelected(true);
    }
  }

  save() {
    if (this.publication_title == 3) {
      this.typePublicationData = {
        ...{ Price: this.typePublicationData.Price },
        ...{ ReservePrice: this.typePublicationData.ReservePrice },
        ...{ InitDate: this.AuctionStartDate },
        ...{ AllowVisits: this.AuctionChecked }
      }
    }

    this.publicationService.addPublication({
      ...this.productInformationForm.value,
      ...this.productTypeForm.value,
      ...this.productPlanForm.value,
      ...{ ExternalLinks: this.links },
      ...this.productAttachedForm.value,
      ...{ SaleType: this.publication_title },
      ...this.typePublicationData,
      ...{ StoreId: this.StoreId }
    });
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 768) ? this.horizontalStepper = false : this.horizontalStepper = true;
  }

  change_title(event) {
    console.log("Tipo de publicacion");
    console.log(event.value);

    this.publication_title = event.value;
    this.pagoExtra = 0;
    this.segundoStepNext = true;
    this.emailAddress = this.tokenSesion.getemailAddress();

    let publication = this.publicationType.find((element) => { return element.value == event.value; });
    console.log("publicacion seleccionada", publication);
    this.alertBenefits(publication.name);

  }

  onChangePayment(paymentMethod) {
    console.log("metodo de pago");
    console.log(paymentMethod);

    this.paymentMethod = paymentMethod;
    // if (this.paymentMethod === 'PayPal') {
    //   this.paymentForm.disable();
    // } else {
    //   this.paymentForm.enable();
    // }

    let dialogRef = this.dialog.open(MethodPaymentDialogComponent, {
      data: {
        grandTotal: this.pagoExtra,
        paymentMethod: paymentMethod
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.isPublicationPay = true;
        this.save();
        console.log("Compra realizada exitosamente");
      } else {
        console.log("Error al realizar la compra");
      }
    });
  }

  primerStepNext() {
    let next = this.productInformationForm.valid && this.productAttachedForm.valid && this.productTypeForm.valid;
    return next;
  }

  segundoStep() {
    if (this.publication_title == 1 || this.publication_title == 2 || this.publication_title == 4 || this.publication_title == 5) {
      this.pagoExtra = this.typePublicationData.Price * 0.1;
    } else {
      this.pagoExtra = this.AuctionPriceInit * 0.1;
    }
  }

  onFormSubmit(userForm: NgForm) {

    // if(userForm.value.ContactEmail){
    //   var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    //   let correo = userForm.value.ContactEmail;    

    //   console.log("entre en formulario de correo");

    //   if (correo && !emailRegexp.test(correo)) {
    //     console.log("true");

    //     this.invalidEmail = true;
    //   }
    // }else{
    //   this.invalidEmail = false;
    // }

    this.typePublicationData = userForm.value;
    this.segundoStepNext = userForm.valid ? false : true;
  }

  onFormSubmitSubasta(userForm: NgForm, date: Date) {

    if (date) {
      this.AuctionStartDate = date;
    }

    if (userForm.value.ReservePrice) {
      this.AuctionPriceInit = userForm.value.ReservePrice;
    }

    if (userForm.valid && this.AuctionStartDate) {

      let data = {
        Price: userForm.value.ReservePrice,
        ReservePrice: userForm.value.Price,
        InitDate: this.AuctionStartDate,
        AllowVisits: this.AuctionChecked
      }

      this.typePublicationData = data;
      // console.log(this.typePublicationData);

      this.segundoStepNext = false;

    } else {
      this.segundoStepNext = true;
    }
  }

  resetUserForm(userForm: NgForm) {
    userForm.resetForm();
  }

  console(data) {
    this.AuctionChecked = data.checked;
    console.log(data.checked);
  }

  // productPlanForm.patchValue({PublicationPlan:$event.PlanId, Comission: $event.PlanComission})
  savePlanType(data) {
    this.productPlanForm.patchValue({ PublicationPlan: data.PlanId, Comission: data.Comission })
    this.pagoExtra = this.typePublicationData.Price * (data.Comission / 100);
  }

  alertImage(disabled) {
    if (disabled) {
      let confirmDialogRef = this.dialog.open(AlertComponent, {
        width: '500px',
        data: { menssage: "No puede agregar más de 3 imagenes", type: "warning" }
      });

      confirmDialogRef.afterClosed().subscribe(result => {


      });
    }
  }

  alertBenefits(name) {
    let confirmDialogRef = this.dialog.open(BenefitsComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: {
        title: name
      }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      } else {
        console.log("salida sin aceptar");
      }

    });
  }

  planSelectionPremium(plan) {
    console.log("plan", plan)
    this.PremiumPlan = plan.PlanId;
  }

}
