import { ListService } from './board/list.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-board';

  constructor(private _listService : ListService) {}

  public onClick() {
    this._listService.getUserLists().subscribe(list => console.log(list)
    )
  }
}
