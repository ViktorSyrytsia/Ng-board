import { tap } from 'rxjs/operators';
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
  lists! : IList[]
  sub?: Subscription

  constructor(private _listService: ListService) { }

  ngOnInit(): void {
    this.sub = this._listService.getUserLists().pipe(tap((val) => {console.log(val);
    })).subscribe(lists =>( this.lists = lists as IList[]));
  }
  ngOnDestroy() {
     this.sub?.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
    this._listService.sortLists(this.lists)
  }

}
