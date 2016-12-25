import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { User } from '../../models/user.model/user.model';

@Injectable()
export class UserService {
    private projectUrl = 'http://localhost:3001/api/users';
    constructor(private http: Http) { }

    saveUser(body: User): Observable<any> {
        return this.http.post(this.projectUrl, body).map(response => {
            let data = response.json();
            return data;
        });
    }

    getUserById(id: string): Observable<any> {
        let url = `${this.projectUrl}/${id}`;
        return this
            .http
            .get(url)
            .map(response => {
                let data = response.json();
                return data;
            });
    }

    addProject(userId: string, projectId: string, projectName: string) {
        let url = `${this.projectUrl}/${userId}/projects`;
        let body = { projectId, projectName };

        return this
            .http
            .post(url, body)
            .map(response => {
                let data = response.json();
                return data;
            });
    }
};
