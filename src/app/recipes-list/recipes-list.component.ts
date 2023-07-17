import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipesService } from '../core/services/recipes.service';
import { combineLatest, map } from 'rxjs';
import { Recipe } from '../core/models/recipe';
import { SharedDataService } from '../core/services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {

  recipes$ = this.service.recipes$;
  filterRecipesAction$ = this.service.filterRecipesAction$;

  filteredRecipes$ = combineLatest([this.recipes$, this.filterRecipesAction$]).pipe(
    map(([recipes, filter]: [Recipe[], Recipe]) => {
      return recipes.filter(recipe => 
        recipe.title?.toLocaleLowerCase().indexOf(filter?.title?.toLowerCase() ?? '') !== -1
      );
    })
  );

  constructor(private service: RecipesService, 
    private sharedService: SharedDataService,
    private router: Router) {}

  editRecipe(recipe: Recipe) {
    this.sharedService.updateSelctedRecipe(recipe);
    this.router.navigate(['/recipes/details']);
  }
}
