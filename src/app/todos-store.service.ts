import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Todo} from './todo.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosStoreService {

  private readonly _todos = new BehaviorSubject<Todo[]>([]);

  readonly todos$ = this._todos.asObservable();

  readonly completedTodos$ = this.todos$.pipe(
    map(todos => todos.filter(todo => todo.isCompleted))
  );

  get todos(): Todo[] {
    return this._todos.getValue();
  }

  private set todos(val: Todo[]) {
    this._todos.next(val);
  }

  addTodo(title: string) {
    this._todos = [
      ...this.todos,
      {id: this.todos.length + 1, title, isComplete: false}
    ];
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  setCompleted(id: number, isCompleted: boolean) {
    let todo = this.todos.find(todo => todo.id === id);

    if (todo) {
      const index = this.todos.indexOf(todo);
      this.todos[index] = {
        ...todo,
        isCompleted
      };
      this.todos = [...this.todos];
    }
  }

}
