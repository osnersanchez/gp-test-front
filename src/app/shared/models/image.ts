export class Image {
  public Name: string;
  public Data: string;
  public MimeType: string;
  public Url ?: string;
  public MultimediaId?: number;
  public Id?: number; // ProductId or StoreId

  constructor(
      name: string = '',
      data: string = '',
      mimeType: string = '',
      url: string = ''
  ) {
      this.Name = name;
      this.Data = data;
      this.MimeType = mimeType;
      this.Url = url;
  }
}

