import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { combineLatest } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Movie } from "../classes/movie";
import { MovieService } from "../movie.service";

@Component({
  selector: "app-my-movies",
  templateUrl: "./my-movies.component.html",
  styleUrls: ["./my-movies.component.css"],
})
export class MyMoviesComponent implements OnInit {
  public filterControl: FormControl = new FormControl("");
  constructor(private movieService: MovieService) {}

  movies$ = combineLatest([
    this.movieService.movies$,
    this.filterControl.valueChanges.pipe(startWith("")),
  ]).pipe(
    map(([movies, filterStr]) =>
      filterStr
        ? (movies as Movie[]).filter(
            (m) =>
              m.Title.toLocaleLowerCase().indexOf(
                filterStr.toLocaleLowerCase()
              ) > -1
          )
        : movies
    )
  );

  ngOnInit() {}
}
