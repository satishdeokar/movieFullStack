import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';


const routes: Routes = [
  {
    path: 'create-movie',
    component: CreateMovieComponent
  },
  {
    path: 'create-movie/:movieId',
    component: CreateMovieComponent
  },
  {
    path: 'movie-list',
    component: MoviesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
