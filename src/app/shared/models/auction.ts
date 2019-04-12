export class Auction {
  public IdUser: number;
  public IdProduct: number;
  public Offer: number;
  public AuctionDate: string;

  constructor(IdUser = 0, IdProduct = 0, Offer = 0, AuctionDate = '') {}
}
