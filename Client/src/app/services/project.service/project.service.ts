import { Project } from '../../models/project.model/project.model';
import { Message } from '../../models/message.model/message.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class ProjectService {
    private projectUrl = 'http://localhost:3001/api/projects';
    private messageUrl = 'http://localhost:3001/api/messages';

    constructor(private http: Http) { }

    getProjectById(id: string): Observable<any> {
        return this.http.get(`${this.projectUrl}/${id}`).map(response => {
            let data = response.json();
            return data;
        });
    }

    getLastTenMessages(projectName: string): Observable<Message[]> {
        return this.http.get(`${this.messageUrl}/${projectName}`)
            .map(response => {
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

    saveMessage(body: Message): Observable<any> {
        return this.http.post(this.messageUrl, body)
            .map(response => {
                console.log(response);
                let data = response.json();
                return data;
            })
    }

    saveProject(body: Project): Observable<any> {
        return this.http.post(this.projectUrl, body);
    }
};
