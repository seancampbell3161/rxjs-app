import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { concatMap, map } from 'rxjs/operators';
import { RecipesService } from '../core/services/recipes.service';

@Component({
  selector: 'app-recipes-filter',
  templateUrl: './recipes-filter.component.html'
})
export class RecipesFilterComponent implements OnInit {

  recipeForm = this.fb.group({
    title: new FormControl(),
    category: new FormControl(),
    ingredient: new FormControl(),
    tags: new FormControl(),
    prepTime: new FormControl(),
    cookingTime: new FormControl(),
  });

  constructor(private service: RecipesService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  filterResults() {
    this.service.updateFilter(this.recipeForm.value);
  }

  clearFilter() {
    this.recipeForm.reset();
    this.service.updateFilter(this.recipeForm.value);
  }



}