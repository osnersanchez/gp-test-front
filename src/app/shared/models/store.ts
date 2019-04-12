import { Image } from './image';
import { Owner } from './owner';

export class Store {
    public Id: number;
    public Name: string;
    public Slogan: string;
    public Photo: string;
    public Attachments: Image[];
    public OwnerId: number | string;
    public Owner: Owner; // only for mobile use

    constructor(
      name: string,
      slogan: string,
      ownerId: number | string,
      owner: Owner = new Owner(),
      id?: number,
      photo?: string,
      attachments?: Image[]
    ) {
      this.Id = id;
      this.Name = name;
      this.Slogan = slogan;
      this.Photo = photo;
      this.OwnerId = ownerId;
      this.Owner = owner;
      this.Attachments = attachments;
    }
  }
