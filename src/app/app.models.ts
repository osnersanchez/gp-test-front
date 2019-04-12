export class Category {
  constructor(
    public id: number,
    public name: string,
    public hasSubCategory: boolean,
    public parentId: number
  ) {}
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public images: Array<any>,
    public oldPrice: number,
    public newPrice: number,
    public discount: number,
    public ratingsCount: number,
    public Attachments: any,
    public Title: string,
    public Price: any,
    public ratingsValue: number,
    public description: any,
    public availibilityCount: number,
    public color: Array<string>,
    public size: Array<string>,
    public weight: number,
    public categoryId: any,
    public Category,
    public Description
  ) {}
}
