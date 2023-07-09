import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, catchError, of } from 'rxjs';

const BASE_PATH = environment.basePath

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  
  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`).pipe(
    catchError(error => of([]))
  );

  private filterRecipeSubject = new BehaviorSubject<Recipe>({title: ''});
  filterRecipesAction$ = this.filterRecipeSubject.asObservable();

  constructor(private http: HttpClient) { }

  updateFilter(criteria: Recipe) {
    this.filterRecipeSubject.next(criteria);
  }
}
