import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { UserService } from '../user.service/user.service';

declare var Auth0: any;

@Injectable()
export class Auth {
  auth0 = new Auth0({
    domain: 'toolsforteams.eu.auth0.com',
    clientID: 'wFe7CwezBHRXTHI7ZTCK3Jp7x4PWLqrK',
    responseType: 'token',
    callbackURL: 'http://localhost:4200/login-callback'
  });

  private router: Router;
  private userService: UserService;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;

    var result = this.auth0.parseHash(window.location.hash);
    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      this.auth0.getProfile(result.idToken, (err: any, profile: any) => {
        if (err) {
          console.log(err);
        }

        let id = profile.user_id;

        this.userService.getUserById(id).subscribe(resUser => {
          let userToShow = {
            username: resUser.username,
            id: resUser.id,
            email: resUser.email,
            company: resUser.company,
            picture: resUser.picture,
            name: resUser.name
          }

          localStorage.setItem('profile', JSON.stringify(userToShow));
        });


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
      if (err) {
        alert('something went wrong: ' + err.message);
      }
    });

  }

  public googleLogin() {
    this.auth0.login({
      connection: 'google-oauth2'
    }, function (err: any) {
      if (err) {
        alert('something went wrong: ' + err.message);
      }
    });
  }

  public signUp(username: string, password: string, name: string, picture: string, company: string) {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
    }, (err: any, signUpObj: any) => {
      if (err) {
        alert('something went wrong: ' + err.message);
      } else {
        this.auth0.getProfile(signUpObj.idToken, (error: any, profile: any) => {
          if (err) {
            console.log(err);
          }

          let user = {
            id: profile.user_id,
            username: profile.nickname,
            name: name,
            picture: picture || profile.picture,
            email: username,
            company: company
          };

          this.userService.saveUser(user).subscribe(() => {
            console.log('User registered');
            this.router.navigateByUrl('/login');
          });
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
