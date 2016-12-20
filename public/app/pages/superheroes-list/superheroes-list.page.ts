import { Component } from '@angular/core';
import { PageComponent } from '../../components/page.component/page.component';
import { SuperheroesService } from '../../services/superheroes.service/superheroes.service';
import { Superhero } from '../../models/superhero.model/superhero.model';

@Component({
    moduleId: module.id,
    templateUrl: './superheroes-list.page.html'
})
export class SuperheroesListPage implements PageComponent {
    superheroes: Superhero[] = [];

    constructor(private superheroesData: SuperheroesService) { }

    ngOnInit() {
        this.superheroesData.getAll()
            .then(superheroes => {
                this.superheroes = superheroes;
            });
    }
}