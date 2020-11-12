import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from "../classes/movie";
import { MovieService } from "../movie.service";

@Component({
  selector: "app-movie-view",
  templateUrl: "./movie-view.component.html",
  styleUrls: ["./movie-view.component.css"],
})
export class MovieViewComponent implements OnInit {
  movie: Movie;
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");

    if (!id) {
      this.router.navigate(["/app/search"]);
    }

    this.movieService
      .getMovieById(id)
      .subscribe((movie: Movie) => (this.movie = movie));
  }

  onRatingChange(event: any) {
    if (this.movie.Rate == event.rating) return;
    this.movie.Rate = event.rating;
    this.movieService.rateMovie(this.movie);
  }

  goBack() {
    this.router.navigate([
      "/app/" + this.activatedRoute.snapshot.paramMap.get("ref"),
    ]);
  }
}
