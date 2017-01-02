import { Project } from '../models/project';
import { Message } from '../models/message';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class ProjectService {
    private projectUrl = 'http://localhost:3001/api/project';    
    private projectsUrl = 'http://localhost:3001/api/projects';
    private messageUrl = 'http://localhost:3001/api/messages';

    constructor(private http: Http) { }

    getAllProjects(): Observable<any> {
        return this.http.get(`${this.projectsUrl}/all`)
            .map((response: any) => {
                let data = response.json();
                return data;
            });
    }

    getProjectById(id: string): Observable<any> {
        return this.http.get(`${this.projectsUrl}/${id}`).map(response => {
            let data = response.json();
            return data;
        });
    }

    getMappedProjectById(id: string): Observable<any> {
        return this.http.get(`${this.projectsUrl}/${id}/filtered`).map(response => {
            let data = response.json();
            return data;
        });
    }

    getTenMessages(projectName: string): Observable<Message[]> {
        return this.http.get(`${this.messageUrl}/${projectName}`)
            .map(response => {
                let data = response.json();
                return data;
            });
    }

    getAllProjectsByUsername(): Observable<any> {
        return this.http.get(this.projectsUrl).map(p => p.json());
    }

    addUserToProject(id: string, username: string) {
        return this.http.put(`${this.projectsUrl}/${id}`, { username })
            .map(response => {
                let data = response.json();
                return data;
            });
    }

    saveMessage(body: Message): Observable<any> {
        return this.http.post(this.messageUrl, body)
            .map(response => {
                let data = response.json();
                return data;
            })
    }

    saveProject(body: Project): Observable<any> {
        return this.http.post(this.projectsUrl, body)
            .map(response => {
                let data = response.json();
                return data;
            });
    }


    getProjectByProjectName(projectName: string) {
        return this.http.get(`${this.projectUrl}/${projectName}`)
            .map(response => {
                let data = response.json();
                return data;
            });
    }

    addNotesToProject(projectName: string, notes: any[]) {
        return this.http.put(`${this.projectUrl}/${projectName}/notes`, { notes })
    }
};
