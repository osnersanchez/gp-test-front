import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagerService {

  private category = new BehaviorSubject([]);
  public category$ = this.category.asObservable();

  constructor(
    private categoryService: CategoryService
  ) { }

  loadCategory() {
    this.categoryService.get().subscribe((categories: any) => {
      this.category.next(categories);
    });
  }

}
