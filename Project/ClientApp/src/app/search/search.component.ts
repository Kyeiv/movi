import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filterControl = new FormControl()
  movies$ = this.movieService.searchedMovies$.pipe(tap((movies) => console.log(movies)))

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.filterControl.valueChanges.pipe(debounceTime(300)).subscribe(
      res => {
        this.movieService.search(res)
      }
    )
  }

}
