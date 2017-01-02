import { Observable } from 'rxjs';

export class StorageService {
    storage: any;

    constructor() {
        this.storage = localStorage;
    }

    getItem(key: string): Observable<any> {
        return Observable.create(observer => {
            let item = JSON.parse(this.storage.getItem(key));
            observer.next(item);
            observer.complete();
        });
    }

    setItem(key: string, item: any): Observable<any> {
        return Observable.create(observer => {
            this.storage.setItem(key, JSON.stringify(item));
            observer.complete();
        });
    }

    removeItem(key: string): Observable<any> {
        return Observable.create(observer => {
            this.storage.removeItem(key);
            observer.complete();
        });
    }

    getProfileItem(): Observable<any> {
        return this.getItem('profile');
    }

    setProfileItem(profile: any): Observable<any> {
        return this.setItem('profile', profile);
    }

    removeProfileItem(): Observable<any> {
        return this.removeItem('profile');
    }
}