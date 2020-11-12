import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./auth.service";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MyMoviesComponent } from "./my-movies/my-movies.component";
import { SearchComponent } from "./search/search.component";
import { MovieComponent } from "./movie/movie.component";
import { AuthGuard } from "./auth.guard";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatCardModule,
  MatIconModule,
  MatTabsModule,
  MatToolbarModule,
} from "@angular/material";
import { NgxMasonryModule } from "ngx-masonry";
import { StarRatingModule } from "angular-star-rating";
import { MovieService } from "./movie.service";
import { MovieViewComponent } from "./movie-view/movie-view.component";
import { AppViewComponent } from "./app-view/app-view.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyMoviesComponent,
    SearchComponent,
    MovieComponent,
    MovieViewComponent,
    AppViewComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatTabsModule,
    MatCardModule,
    NgxMasonryModule,
    MatIconModule,
    MatToolbarModule,
    StarRatingModule.forRoot(),
    RouterModule.forRoot([
      { path: "login", component: LoginComponent },
      {
        path: "app",
        component: AppViewComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
          {
            path: "my-movies",
            component: MyMoviesComponent,
          },
          {
            path: "search",
            component: SearchComponent,
          },
          {
            path: "movie/:id/:ref",
            component: MovieViewComponent,
          },
        ],
      },
      { path: "**", redirectTo: "/login", pathMatch: "full" },
      { path: "", redirectTo: "/login", pathMatch: "full" },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [AuthService, MovieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
