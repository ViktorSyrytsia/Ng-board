import { TaskDialogComponent } from './../dialogs/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(private _listService: ListService, public dialog: MatDialog) { }

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list.tasks! , event.previousIndex, event.currentIndex);
    this._listService.updateTasks(this.list.id!, this.list.tasks!);
  }

  openDialog(task?: ITask, idx?: number):void {
    const newTask = {label:"purple"};
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width:"500px",
      data: task ?
      {task: {...task}, isNew: false, listId: this.list.id, idx} :
      {task: newTask, isNew: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this._listService.updateTasks(this.list.id!, [...this.list.tasks!, result.task])
        } else {
          const update = this.list.tasks;
          update!.splice(result.idx, 1, result.task);
          this._listService.updateTasks(this.list.id!, this.list.tasks!)
        }
      }
    })
  }

  handleDelete() {
    this._listService.deleteList(this.list.id!)
  }

}
