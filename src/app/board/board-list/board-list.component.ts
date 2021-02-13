import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { IList } from './../list.model';
import { ListService } from './../list.service';




@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, OnDestroy {
  lists?: IList[]
  sub?: Subscription

  constructor(private _listService: ListService) { }

  ngOnInit(): void {
    this.sub = this._listService.getUserLists().subscribe();
  }
  ngOnDestroy() {

  }

}
