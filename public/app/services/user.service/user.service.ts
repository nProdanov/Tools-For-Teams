import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { User } from '../../models/user.model/user.model';

@Injectable()
export class UserService {
    private projectUrl = '/api/users';
    constructor(private http: Http) { }

    saveUser(body: User): Observable<any> {
        return this.http.post(this.projectUrl, body).map(response => {
            let data = response.json();
            return data;
        });
    }

    getUserById(id: any): Observable<any> {
        let url = `${this.projectUrl}/:${id}`;
        return this
            .http
            .get(this.projectUrl)
            .map(response => {
                let data = response.json();
                return data;
            });
    }

    getUserByNickname(nickname: string): Observable<any> {
        let url = `${this.projectUrl}/${nickname}`;
        return this.http.get(url).map(response => {
            let data = response.json();
            return data;
        });
    }
};
