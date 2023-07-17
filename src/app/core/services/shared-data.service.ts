import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private selectedRecipeSubject = new BehaviorSubject<Recipe>({});
  selectedRecipe$ = this.selectedRecipeSubject.asObservable();

  constructor() { }

  updateSelctedRecipe(recipe: Recipe) {
    this.selectedRecipeSubject.next(recipe);
  }
}
