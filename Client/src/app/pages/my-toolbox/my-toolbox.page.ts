import { 
    Component, 
    OnInit,    
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes 
} from '@angular/core';
import { PageComponent } from '../../components/page.component/page.component';
import { StorageService } from '../../services/storage.service/storage.service';
import { UserService } from '../../services/user.service/user.service';

@Component({
    templateUrl: './my-toolbox.page.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({opacity: 1, transform: 'scale(1.0)'})),
            state('out', style({opacity: 0, transform: 'scale(0.0)'})),
            transition('in => out', animate('300ms')),
            transition('out => in', animate('600ms'))
        ])
    ]
})
export class ToolboxPage implements PageComponent, OnInit {
    private profile: any;
    private projects: any[];

    stateOne: string = 'out';
    stateTwo: string = 'out';

    constructor(private storageService: StorageService, private userService: UserService) {
        this.projects = [];
        this.profile = {};
    }

    ngOnInit() {
        this.storageService
            .getProfileItem()
            .subscribe(resProfile => {
                this.profile = resProfile;
                this.userService.getUserById(this.profile.id)
                    .subscribe(user => {
                        this.projects = user.projects;
                    });
            });
    }

    toggleMove(btnId) {
        if(btnId === 'btn-one') {
            this.stateOne = (this.stateOne === 'out' ? 'in' : 'out');
        } else if (btnId === 'btn-two') {
            this.stateTwo = (this.stateTwo === 'out' ? 'in' : 'out');
        }
    }
}