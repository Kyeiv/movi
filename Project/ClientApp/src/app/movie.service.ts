import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { BehaviorSubject, ReplaySubject, Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Movie } from "./classes/movie";
import { UserInfo } from "./classes/User";

interface SearchMoviesResponse {
  Search: Movie[];
}
@Injectable({
  providedIn: "root",
})
export class MovieService {
  rateMovie(movie: Movie) {
    const parsedBody = {
      Title: movie.Title,
      Genre: movie.Genre,
      Director: movie.Director,
      Rate: movie.Rate,
      Year: parseInt(movie.Year as any),
      Rated: movie.Rated,
      Released: new Date(movie.Released),
      Writer: movie.Writer,
      Runtime: parseInt(movie.Runtime),
      Actors: movie.Actors,
      Plot: movie.Plot,
      Country: movie.Country,
      Awards: movie.Awards,
      Metascore: movie.Metascore,
      UserId: parseInt(this.authService.getUserData().Id),
      Poster: movie.Poster,
      imdbID: movie.imdbID,
      MovieId: movie.MovieId,
    };
    if (movie.MovieId) {
      this.http
        .put("https://localhost:5001/api/movies/" + movie.MovieId, parsedBody, {
          headers: { Authorization: "Bearer " + this.authService.getToken() },
        })
        .subscribe((res) => {
          this.getUserMovies();
          this.snackBar.open("Movie rated succesfully!", null, {
            duration: 5000,
          });
        });
    } else {
      this.http
        .post("https://localhost:5001/api/movies", parsedBody, {
          headers: { Authorization: "Bearer " + this.authService.getToken() },
        })
        .subscribe((res) => {
          this.getUserMovies();
          this.snackBar.open("Movie rated succesfully!", null, {
            duration: 5000,
          });
        });
    }
  }
  private searchSub: Subscription;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.getUserMovies();
  }

  public getUserMovies() {
    this.http
      .get(
        "https://localhost:5001/api/users/" + this.authService.getUserData().Id,
        { headers: { Authorization: "Bearer " + this.authService.getToken() } }
      )
      .subscribe((res: any) => {
        this.movies$.next(
          res.movies
            ? res.movies.map((m) => ({
                MovieId: m.movieId,
                Title: m.title,
                Genre: m.genre,
                Director: m.director,
                Rate: m.rate,
                Year: m.year,
                Rated: m.rated,
                Released: m.released,
                Writer: m.writer,
                Runtime: m.runtime,
                Actors: m.actors,
                Plot: m.plot,
                Country: m.country,
                Awards: m.awards,
                Metascore: m.metascore,
                UserId: m.userId,
                UserInfo: m.userInfo,
                Poster: m.poster,
                imdbID: m.imdbID,
              }))
            : []
        );
      });
  }

  public search(searchString: string) {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
      this.searchSub = null;
    }
    this.searchSub = this.http
      .get("https://www.omdbapi.com/?apikey=49e1bd1e&s=" + searchString)
      .subscribe((res: SearchMoviesResponse) => {
        this.searchedMovies$.next(res.Search);
      });
  }

  getMovieById(id: string) {
    return this.http
      .get("https://www.omdbapi.com/?apikey=49e1bd1e&i=" + id)
      .pipe(
        map((movie: Movie) => {
          const myMovies = this.movies$.value;
          const foundMovie = myMovies.find(
            (m) => m.Title === movie.Title && m.Year == movie.Year
          );
          movie.Rate = foundMovie ? foundMovie.Rate : 0;
          movie.MovieId = foundMovie ? foundMovie.MovieId : null;
          return movie;
        })
      );
  }

  movies$ = new BehaviorSubject<Movie[]>([]);
  searchedMovies$ = new ReplaySubject<Movie[]>();
}
