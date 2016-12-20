import { Project } from '../../models/project.model/project.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class ProjectService {
    private projectUrl = '/api/project';
    constructor(private http: Http) { }

    saveProject(body: Project): Observable<any> {
        return this.http.post(this.projectUrl, body).map(response => {
                let data = response.json();
                return data;
            });
    }
};
