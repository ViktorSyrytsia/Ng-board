import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ListService } from './../list.service';
import { IList, ITask } from './../list.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() list!: IList
  constructor(private _listService: ListService) { }

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list.tasks! , event.previousIndex, event.currentIndex);
    this._listService.updateTasks(this.list.id!, this.list.tasks!);
  }

}
