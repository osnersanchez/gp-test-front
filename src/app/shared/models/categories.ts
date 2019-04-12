export class Categories {
  public Id: number;
  public Name: string;
  public Parent: number;
  public Categories: Categories[];
  public expanded: boolean; // only for mobile use

  constructor(
    id: number,
    name: string,
    parent: number,
    categories: Categories[]
  ) {
    this.Id = id;
    this.Name = name;
    this.Parent = parent;
    this.Categories = categories;
  }
}
