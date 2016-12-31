import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Http } from '@angular/http';
import { User } from '../../models/user.model/user.model';
import { StorageService } from '../storage.service/storage.service';

@Injectable()
export class UserService {
    private usersUrl = 'http://localhost:3001/api/users';
    public profile: any;

    constructor(private storageService: StorageService, private http: Http) {
        this.storageService
            .getProfileItem()
            .subscribe(resProfile => this.profile = resProfile);
    }

    saveUser(body: User): Observable<any> {
        return this.http.post(this.usersUrl, body).map(response => {
            let data = response.json();
            return data;
        });
    }

    editUser(propsToEdit: any): Observable<any> {
        let { firstName, lastName, company } = propsToEdit;
        let body = { firstName, lastName, company };
        return this
            .http
            .put(`${this.usersUrl}/${propsToEdit.id}`, body)
            .map(response => {
                let data = response.json();
                return data;
            });
    }

    getUserById(id: string): Observable<any> {
        let url = `${this.usersUrl}/${id}`;
        return this
            .http
            .get(url)
            .map(response => {
                let data = response.json();
                return data;
            });
    }

    getUserByUsername(username: string): Observable<any> {
        return this.http.get(`${this.usersUrl}/${username}/details`)
            .map((response: any) => {
                let data = response.json();
                return data;
            });
    }

    getAllUsers() {
        return this.http.get(this.usersUrl)
            .map(res => {
                let resJson = res.json();
                let users = resJson.map(u => u.username);
                return users;
            });
    }

    addProject(userId: string, projectId: string, projectName: string) {
        let url = `${this.usersUrl}/${userId}/projects`;
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
