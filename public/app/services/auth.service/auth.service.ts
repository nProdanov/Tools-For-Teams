import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

declare var Auth0: any;

@Injectable()
export class Auth {
  auth0 = new Auth0({
    domain: 'toolsforteams.eu.auth0.com',
    clientID: 'wFe7CwezBHRXTHI7ZTCK3Jp7x4PWLqrK',
    responseType: 'token',
    callbackURL: 'http://localhost:3001/login-callback'
  });

  private router: Router;

  constructor(router: Router) {
    this.router = router;
    var result = this.auth0.parseHash(window.location.hash);
    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      this.auth0.getProfile(result.idToken, (err: any, profile: any) => {
        if (err) {
          console.log(err);
        }

        let id = profile.user_id;


      });
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  }

  public login(username: string, password: string) {
    this.auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
    }, function (err: any) {
      if (err) alert("something went wrong: " + err.message);
    });

  }

  public googleLogin() {
    this.auth0.login({
      connection: 'google-oauth2'
    }, function (err: any) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  public signUp(username: string, password: string) {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
    }, function (err: any, signUpObj: any) {
      if (err) {
        alert("something went wrong: " + err.message);
      } else {
        this.auth0.getProfile(signUpObj.idToken, (err: any, profile: any) => {
          if (err) {
            console.log(err);
          }

          //
        });
      }
    });
  };

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    this.router.navigateByUrl('/');
  }

  authenticated() {
    return tokenNotExpired();
  }
}