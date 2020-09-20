import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesListComponent } from './components/movies-list/movies-list.component';


@NgModule({
  declarations: [CreateMovieComponent, MoviesListComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule
  ]
})
export class MoviesModule { }
