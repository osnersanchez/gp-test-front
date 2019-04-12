export class AuctionProduct {
  public AuctionId: number;
  public UserId: number;
  public ProductId: number;
  public UserName: string;
  public InitDate: string;
  public ExpireDate: string;
  public ProductImage: string;
  public ActualPrice: number;
  public Currency: string;
  public ProductTitle: string;
  public ProductDescription: string;
  public ProductCategory: string;
  public ActualBid: any;
  public Price: number;

  constructor(
    IdAction = 0,
    IdUser = 0,
    IdProduct = 0,
    ProductName = 'empty',
    Expire = 'never',
    ProductImage = 'none',
    Actual_Price = 0,
    Currency = 'noone',
    Offer = 0,
    ProductTitle = '',
    ProductDescription = '',
    ProductCategory = '',
    ProductAttachments: any[] = new Array<any>()
  ) {}
}
