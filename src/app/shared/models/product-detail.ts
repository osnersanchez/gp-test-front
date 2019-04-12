import { Auction } from './auction';

export class ProductDetail {
  public Id: number;
  public Title: string;
  public Category: string;
  public Description: string;
  public Image: string;
  public Like: boolean;
  public Price: number;
  public ProductAverageRating: number;
  public ProductTotalRating: number;
  public QuantityAvailable: number;
  public QuantitySoldOut: number;
  public QuestionsAsked: number;
  public SellerRating: number;
  public Warranty: string;
  public ExternalLinks: string;
  public Offer: number;
  public ActualBid?: Auction;

  constructor(
    id: number,
    title: string,
    category: string,
    description: string,
    image: string,
    like: boolean,
    price: number,
    productAverageRating: number,
    productTotalRating: number,
    quantityAvailable: number,
    quantitySoldOut: number,
    questionsAsked: number,
    sellerRating: number,
    warranty: string,
    ExternalLinks: string
  ) {
    (this.Id = id),
      (this.Title = title),
      (this.Category = category),
      (this.Description = description),
      (this.Image = image),
      (this.Like = like),
      (this.Price = price),
      (this.ProductAverageRating = productAverageRating),
      (this.ProductTotalRating = productTotalRating),
      (this.QuantityAvailable = quantityAvailable),
      (this.QuantitySoldOut = quantitySoldOut),
      (this.QuestionsAsked = questionsAsked),
      (this.SellerRating = sellerRating),
      (this.Warranty = warranty),
      (this.ExternalLinks = ExternalLinks);
  }
}
