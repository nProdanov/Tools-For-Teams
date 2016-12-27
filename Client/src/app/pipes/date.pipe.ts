import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customDateFormat' })
export class FormatDatePipe implements PipeTransform {
    transform(userdate: string): any {
        let date = new Date(userdate);
        let seconds = date.getSeconds();        
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let res = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

        return res;
    }
}