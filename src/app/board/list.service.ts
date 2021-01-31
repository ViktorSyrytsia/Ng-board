import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { IList, ITask } from './list.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  async createList(data: IList) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('lists').add({
      ...data,
      uid: user?.uid,
      tasks: [{ description: 'First Task', label: 'yellow' }],
    });
  }

  deleteList(listId: string) {
    return this.db.collection('lists').doc(listId).delete();
  }
  updateTasks(listId: string, tasks: ITask[]) {
    return this.db.collection('lists').doc(listId).update({ tasks });
  }

  removeTask(listId: string, task: ITask) {
    return this.db
      .collection('lists')
      .doc(listId)
      .update({
        tasks: firebase.default.firestore.FieldValue.arrayRemove(task),
      });
  }

  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap((user): any => {
        if (user) {
          return this.db
            .collection<IList>('lists', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  sortLists(lists: IList[]) {
    const db = firebase.default.firestore();
    const batch = db.batch();
    const refs = lists.map((list) => db.collection('lists').doc(list.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
