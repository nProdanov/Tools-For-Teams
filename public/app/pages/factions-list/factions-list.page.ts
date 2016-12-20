import { Component } from '@angular/core';

import { PageComponent } from '../../components/page.component/page.component';

import { Faction } from '../../models/fraction.model/faction.model';
import { FactionsService } from '../../services/fractions.service/factions-service';

@Component({
    moduleId: module.id,
    templateUrl: './factions-list.page.html'
})
export class FactionsListPage implements PageComponent {
    factions: Faction[] = [];
    constructor(private factionsService: FactionsService) { }

    ngOnInit() {
        this.factionsService.getAll()
            .then(factions => {
                this.factions = factions;
            });
    }
}
