import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ToastsManager } from 'ng2-toastr';
import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';
import { ProjectService } from './project.service';

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

  constructor(
    private storageService: StorageService,
    private notificationService: NotificationService,
    private toastr: ToastsManager,
    private projectService: ProjectService,
    router: Router,
    userService: UserService) {
    this.router = router;
    this.userService = userService;

    var result = this.auth0.parseHash(window.location.hash);
    if (result && result.idToken) {
      this.storageService
        .setItem('id_token', result.idToken)
        .subscribe();
      this.auth0.getProfile(result.idToken, (err: any, profile: any) => {
        if (err) {
          console.log(err);
        }

        let id = profile.user_id;

        this.userService
          .getUserById(id)
          .subscribe(resUser => {
            let userToShow = {};
            if (resUser) {
              userToShow = {
                username: resUser.username,
                id: resUser.id,
                email: resUser.email,
                company: resUser.company,
                picture: resUser.picture,
                name: resUser.name
              }
              this.storageService.setProfileItem(userToShow).subscribe();
            }
            else {
              let user = {
                id: profile.user_id,
                username: profile.nickname,
                firstName: profile.given_name,
                lastName: profile.family_name,
                gender: profile.gender === 'male' ? 'm' : 'f',
                picture: profile.picture,
                email: profile.email,
                company: ''
              }

              this.userService.saveUser(user).subscribe(res => {
                if (res.error) {
                  this.toastr.error(res.error);
                  this.router.navigateByUrl('/home');
                }
                else {
                  userToShow = {
                    username: user.username,
                    id: user.id,
                    email: user.email,
                    company: user.company,
                    picture: user.picture,
                    name: user.firstName
                  };
                  this.storageService.setProfileItem(userToShow).subscribe();
                }
              })
            }
          });
      });
    } else if (result && result.error) {
      this.toastr.error('error: ' + result.error);
    }
  }

  public login({email, password}) {
    this.auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email,
      password,
    }, (err: any) => {
      if (err) {
        this.toastr.error(err.message);
      }
    });

  }

  public googleLogin() {
    this.auth0.login({
      connection: 'google-oauth2'
    }, function (err: any, signObj: any) {
      if (err) {
        alert('something went wrong: ' + err.message);
      }
      else {
        this.auth0.getProfile(signObj.idToken, (error: any, profile: any) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  }

  public signUp({email, username, firstName, lastName, password, picture, gender, company}) {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: email,
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
            username: username,
            firstName: firstName,
            lastName: lastName,
            gender,
            picture: picture || profile.picture,
            email: email,
            company: company
          };

          this.userService.saveUser(user).subscribe((res) => {
            if (res.error) {
              this.toastr.error(res.error);
            }
            else {
              this.toastr.success(res);

            }
            this.router.navigateByUrl('/login');
          });
        });
      }
    });
  };

  logout() {
    this.storageService
      .removeProfileItem()
      .subscribe();
    this.storageService
      .removeItem('id_token')
      .subscribe();
    this.router.navigateByUrl('/');
  }

  authenticated() {
    return tokenNotExpired();
  }
}
