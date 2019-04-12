import { Image } from './image';

// export class CoverZoneState {
//   public Street: string;
//   public zone: string;
//   public Zipcode: number;
//   public State: string;

//   constructor(Street: string, zone: string, Zipcode: number, State: string) {
//     (this.Street = Street),
//       (this.zone = zone),
//       (this.Zipcode = Zipcode),
//       (this.State = State);
//   }
// }

// export class ContactInfo {
//   public email: string;
//   public phone1: number;
//   public phone2: number;

//   constructor(email: string, phone1: number, phone2?: number) {
//     this.email = email;
//     this.phone1 = phone1;
//     this.phone2 = phone2 || null;
//   }
// }

export enum PaymentType {
  CreditCard,
  Cash,
  Transfer
}

export class Product {
  public id: number;
  public userId: number;
  public title: string;
  public description: string;
  public categoryId: number;
  public attachments: Image[];
  public qualities: string;
  public saleType: number; // 0 sale, 1 auction
  public stock: number;
  // public CoverZoneState: CoverZoneState;
  // public ContactInfo: ContactInfo;
  public currency: number; // 0 MXN, 1 USD
  public deliveryTime: string;
  public price: number;
  public publicationPlan: string;
  public externalLinks: string;
  public initDate?: string;
  public expireDate?: string;
  public offer?: number;

  constructor(
    id: number,
    userId: number,
    title: string,
    description: string,
    categoryId: number,
    attachments: Image[],
    qualities: string,
    saleType: number,
    stock: number,
    // CoverZoneState: CoverZoneState,
    // ContactInfo: ContactInfo,
    currency: number,
    deliveryTime: string,
    price: number,
    publicationPlan: string,
    externalLinks: string,
    initDate: string,
    expireDate: string,
    offer: number
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.categoryId = categoryId;
    this.attachments = attachments;
    this.qualities = qualities;
    this.saleType = saleType;
    this.stock = stock;
    this.currency = currency;
    this.deliveryTime = deliveryTime;
    this.price = price;
    this.publicationPlan = publicationPlan;
    this.externalLinks = externalLinks;
    (this.initDate = initDate),
      (this.expireDate = expireDate),
      (this.offer = offer);
  }
}
