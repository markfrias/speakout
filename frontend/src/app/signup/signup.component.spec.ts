import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

/*describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

"use strict";
var password = ("#password");
var confirmPassword = ("#confirm_password");
//Hide hints
("form span").hide();
function isPasswordValid() {
    return password.valueOf().length > 8;
}
function arePasswordsMatching() {
    return password.valueOf() === confirmPassword.valueOf();
}
function canSubmit() {
    return isPasswordValid() && arePasswordsMatching();
}
function passwordEvent() {
    //Find out if password is valid  
    if (isPasswordValid()) {
        //Hide hint if valid
        password.next().hide();
    }
    else {
        //else show hint
        password.next().show();
    }
}
function confirmPasswordEvent() {
    //Find out if password and confirmation match
    if (arePasswordsMatching()) {
        //Hide hint if match
        confirmPassword.next().hide();
    }
    else {
        //else show hint 
        confirmPassword.next().show();
    }
}
function enableSubmitEvent() {
    ("#submit").prop("disabled", !canSubmit());
}
//When event happens on password input
password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);
//When event happens on confirmation input
confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);
enableSubmitEvent();*/

import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class AppComponent {
  loginForm: FormGroup;

  error_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' }
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'required', message: 'please enter a valid email address.' }
    ],

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
  }

  constructor(
    public formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])),
    }, { 
      validators: this.password.bind(this)
    });
  }

  ngOnInit() {
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

}