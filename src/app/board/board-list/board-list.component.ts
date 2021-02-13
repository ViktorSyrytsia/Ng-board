import { tap } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { IList } from './../list.model';
import { ListService } from './../list.service';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogComponent } from '../dialogs/list-dialog.component';




@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, OnDestroy {
  lists! : IList[]
  sub?: Subscription

  constructor(private _listService: ListService, public dialog: MatDialog) { }

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

  openListDialog():void {
      const dialogRef = this.dialog.open(ListDialogComponent, {
        width:'400px',
        data: {}
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._listService.createList({
            title: result,
            priority: this.lists.length
          })
        }
      })
  }

}
