import { Project } from '../../models/project.model/project.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class ProjectService {
    private projectUrl = 'http://localhost:3001/api/projects';

    constructor(private http: Http) { }

    getProjectById(id: string): Observable<any> {
        return this.http.get(`${this.projectUrl}/${id}`).map(response => {
            let data = response.json();
            return data;
        });
    }

    getAllProjectsByUsername(): Observable<any> {
        return this.http.get(this.projectUrl).map(p => p.json());
    }

    addUserToProject(id: string, username: string) {
        return this.http.put(`${this.projectUrl}/${id}`, { username }).map(res => { 
            return res.json()
         });
    }

    saveProject(body: Project): Observable<any> {
        return this.http.post(this.projectUrl, body)
            .map(response => {
                let data = response.json();
                return data;
            })
    }
};
