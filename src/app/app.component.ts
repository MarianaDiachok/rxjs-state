import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import {TodosStoreService} from './todos-store.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent  {

  @ViewChild('todoTitleInput') todoTitleInput: ElementRef;

  todosTrackFn = (i, todo) => todo.id;

  constructor(public todosStore: TodosStoreService) {}

  onAddTodo(title: string){
    this.todosStore.addTodo(title);
    this.todoTitleInput.nativeElement.value = '';
  }
}
