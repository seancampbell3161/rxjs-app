import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { RecipeCreationComponent } from './recipe-creation/recipe-creation.component';

const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'new', component: RecipeCreationComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
