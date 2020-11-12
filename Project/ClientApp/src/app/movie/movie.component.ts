import { Component, Input, OnInit } from "@angular/core";
import { Movie } from "../classes/movie";
import { MovieService } from "../movie.service";

@Component({
  selector: "movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"],
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;

  constructor(private movieService: MovieService) {}

  ngOnInit() {}

  onRatingChange(event: any) {
    this.movie.Rate = event.rating;
    this.movieService.rateMovie(this.movie);
  }
}
