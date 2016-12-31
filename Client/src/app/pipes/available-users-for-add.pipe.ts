import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'availableUsers' })
export class AvailableUsersPipe implements PipeTransform {
    transform(users: string[], alreadyInUseUsers: string[]): any {
        let availableUsers = [];
        users.forEach(user => {
            if (alreadyInUseUsers.indexOf(user) < 0) {
                availableUsers.push(user);
            }
        });

        return availableUsers;
    }
}