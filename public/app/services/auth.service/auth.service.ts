import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

declare var Auth0Lock: any;

@Injectable()
export class Auth {
  lock = new Auth0Lock('56NEm0h7x2Z2leD37lBXdwAoWlHWtK2M', 'somename.eu.auth0.com', {
    additionalSignUpFields: [{
      name: 'isManager',
      placeholder: 'false'
    }]
  });

  constructor(private router: Router) {
    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
      });

      this.lock.hide();
    });
  }

  public login() {
    this.lock.show();
  }

  public authenticated() {
    return tokenNotExpired();
  }

  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    this.router.navigateByUrl('/profile');
  }
}
