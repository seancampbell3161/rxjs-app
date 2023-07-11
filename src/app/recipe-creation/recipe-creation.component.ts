import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { catchError, concatMap, debounceTime, of, tap } from 'rxjs';
import { RecipesService } from '../core/services/recipes.service';
import * as recipeTags from '../core/models/tags';

@Component({
  selector: 'app-recipe-creation',
  templateUrl: './recipe-creation.component.html',
  styleUrls: ['./recipe-creation.component.scss']
})
export class RecipeCreationComponent {

  constructor(private fb: FormBuilder, private service: RecipesService) { }

  recipeForm = this.fb.group({
    id: new FormControl(),
    title: new FormControl(),
    ingredients: new FormControl(),
    tags: new FormControl(),
    imageUrl: new FormControl(),
    cookingTime: new FormControl(),
    yield: new FormControl(),
    prepTime: new FormControl(),
    steps: new FormControl()
  });

  tags = recipeTags.TAGS;

  valueChanges$ = this.recipeForm.valueChanges.pipe(
    debounceTime(500),
    concatMap(formValue =>
      this.service.saveRecipe(formValue)),
    catchError(errors => of(errors)),
    tap(result => this.saveSuccess(result))
  );

  saveSuccess(result: any) {
    console.log('Saved successfully');
  }
}
