import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { flatMap, tap, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { RegisterForm } from "../classes/register-form";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  login: Login = {};
  register: RegisterForm = null;
  registerForm: FormGroup = null;
  backgroundIndex: number;
  bgClass: string;
  currentTab: number = 0;
  passwordsMatcher = new RepeatPasswordEStateMatcher();
  currentTabIdx = 0;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  submitLogin() {
    const { email, password } = this.login;
    this.authService.login(email, password);
  }

  submitRegister() {
    const registerForm = this.registerForm.value as RegisterForm;
    const changeIndex = () => (this.currentTabIdx = 0);
    this.authService.register(registerForm, changeIndex);
  }

  ngOnInit() {
    this.generateForm();
    this.backgroundIndex = Math.floor(Math.random() * 3 + 1);
    this.bgClass = `login-bg-${this.backgroundIndex}`;
    console.log(this.backgroundIndex);
  }

  private generateForm() {
    this.registerForm = this.formBuilder.group(
      {
        userName: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(/[A-Za-z0-9]{3,20}/),
          ]),
        ],
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-_,\.])[A-Za-z\d@$!%*#?&-_,\.]{5,64}/
            ),
          ]),
        ],
        cofirmationPassword: ["", Validators.compose([Validators.required])],
        firstName: [
          "",
          Validators.compose([Validators.required, Validators.pattern(/\w*/)]),
        ],
        lastName: [
          "",
          Validators.compose([Validators.required, Validators.pattern(/\w*/)]),
        ],
        email: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(/^(.+)@(.+)$/),
          ]),
        ],
      },
      { validator: RepeatPasswordValidator }
    );
  }
}

interface Login {
  email?: string;
  password?: string;
}

export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (
      control &&
      control.parent.get("password").value !==
        control.parent.get("cofirmationPassword").value
    );
  }
}
export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.cofirmationPassword.value;

  return password === passwordConfirmation ? null : { passwordsNotEqual: true };
}
