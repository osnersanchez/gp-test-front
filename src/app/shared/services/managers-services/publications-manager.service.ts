import { Injectable } from '@angular/core';
import { PublicationsApiService } from '../publications-api.service';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicationsManagerService {

  private _publicationsList: BehaviorSubject<any> = new BehaviorSubject(null);
  private _publicationDetails: BehaviorSubject<any> = new BehaviorSubject(null);
  private _loadDetails: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _loadPublications: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private publicationsService : PublicationsApiService
  ) { }

  getPublicationsList(id){
    this.loadPublicationsList(id);
    return this._publicationsList.asObservable();
  }

  getPublicationDetails(id){
    this.loadPublicationDetails(id);
    return this._publicationDetails.asObservable();
  }

  getLoadDetails(){
    return this._loadDetails.asObservable();
  }

  getLoadPublications(){
    return this._loadPublications.asObservable();
  }

  loadPublicationsList(id){
    this._loadPublications.next(true);
    this.publicationsService.getPublicationsList(id)
    .pipe(
      first(),
    ).subscribe(res=>{             
      this._publicationsList.next(res);
      this._loadPublications.next(false);
    }, 
      err=>{ 
        console.log("error al cargar la lista de publicaciones"); 
        this._loadPublications.next(false);
      }
    )
  }

  loadPublicationDetails(id){
    this._loadDetails.next(true);
    this.publicationsService.getPublicationDetails(id)
    .pipe(
      first(),
    )
    .subscribe(res=>{             
      this._publicationDetails.next(res);
      this._loadDetails.next(false);
    }, 
      err=>{ 
        console.log("error al cargar los detalles de la publicacion"); 
        this._loadDetails.next(false);
      }
    )
  }
}
