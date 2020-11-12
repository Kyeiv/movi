import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "./classes/User";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { RegisterForm } from "./classes/register-form";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isLoggedIn = false;
  private user: User;
  private token: string;
  redirectUrl: string;

  private initService() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      this.loginByToken(token);
    }
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.initService();
  }

  private loginByToken(token: string) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.token = token;
    this.user = decodedToken;
    this.isLoggedIn = true;
    localStorage.setItem("token", token);
  }

  public checkLogin() {
    return this.isLoggedIn;
  }

  public login(email: string, password: string) {
    this.http
      .post(
        "https://localhost:5001/api/token",
        {
          Email: email,
          Password: password,
        },
        {
          responseType: "text",
        }
      )
      .subscribe((res) => {
        this.loginByToken(res);
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = "";
        } else {
          this.router.navigate(["/app/my-movies"]);
        }
      });
  }

  public logout() {
    this.token = null;
    this.user = null;
    this.isLoggedIn = false;
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  register(registerForm: RegisterForm, changeIdxCbk: () => void) {
    this.http
      .post("https://localhost:5001/api/users", {
        FirstName: registerForm.firstName,
        LastName: registerForm.lastName,
        UserName: registerForm.userName,
        Email: registerForm.email,
        Password: registerForm.password,
        CreatedDate: new Date(),
      })
      .subscribe((res) => {
        this.snackBar.open("Registered succesfully!", null, {
          duration: 5000,
        });
        changeIdxCbk();
      });
  }

  getUserData() {
    return this.user;
  }

  getToken() {
    return this.token;
  }
}
