import { Task } from '../../models/task.model/task.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class TaskService {
    private taskUrl = 'http://localhost:3001/api/tasks';

    constructor(private http: Http) { }

    saveTask(body: Task): Observable<any> {
        return this.http.post(this.taskUrl, body)
            .map(response => {
                let data = response.json();
                return data;
            });
    }

    editTask(task: Task): Observable<any> {
        let body = { task };
        return this
            .http
            .put(`${this.taskUrl}/${task._id}`, body)
            .map(response => {
                let data = response.json();
                return data;
            });
    }

    deleteTask(task: Task): Observable<any> {
        let url = `${this.taskUrl}/${task._id}/delete`;
        let body = { projectId: task.projectId };
        return this
            .http
            .put(url, body)
            .map(response => {
                let data = response.json();
                return data;
            });
    }

    getAllTasks(): Observable<any> {
        return this
            .http
            .get(this.taskUrl)
            .map(response => {
                let data = response.json();
                return data;
            });
    }
};
