import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BehaviorSubject, catchError, concatMap, debounceTime, finalize, forkJoin, of, switchMap, tap } from 'rxjs';
import { RecipesService } from '../core/services/recipes.service';
import * as recipeTags from '../core/models/tags';
import { UploadRecipesPreviewService } from '../core/services/upload-recipes-preview.service';

@Component({
  selector: 'app-recipe-creation',
  templateUrl: './recipe-creation.component.html',
  styleUrls: ['./recipe-creation.component.scss']
})
export class RecipeCreationComponent {

  counter: number = 0;
  uploadProgress: number = 0;

  constructor(private fb: FormBuilder, 
    private service: RecipesService,
    private uploadService: UploadRecipesPreviewService) { }


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

  uploadFilesSubject$ = new BehaviorSubject<File[]>([]);
  uploadRecipeImages$ = this.uploadFilesSubject$.pipe(
    switchMap(uploadedFiles => forkJoin([
      uploadedFiles.map((file: File) => {
        this.uploadService.uploadFile(this.recipeForm.value.id, file).pipe(
          catchError(errors => of(errors)),
          finalize(() => this.calculateProgressPercentage(++this.counter, uploadedFiles.length))
        )
      })])
    )
  );

  onUpload(files: File[] | undefined) {
    console.log(files);
    if (!files) return;
    this.uploadFilesSubject$.next(files);
  }

  private calculateProgressPercentage(completedRequests: number, totalRequests: number) {
    this.uploadProgress = (completedRequests/totalRequests)*100;
    console.log(this.uploadProgress);
  }
}
