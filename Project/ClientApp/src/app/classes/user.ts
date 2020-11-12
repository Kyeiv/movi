import { Movie } from "./movie";

export interface User {
  Id: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
}

export interface UserInfo extends User {
  movies: Movie[];
}
