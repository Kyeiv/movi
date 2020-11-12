import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-app-view",
  templateUrl: "./app-view.component.html",
  styleUrls: ["./app-view.component.css"],
})
export class AppViewComponent implements OnInit {
  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
