import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss',
})
export class ListaComponent {
  constructor(public auth: AuthService) {}
  todos: Todo[] = [];
  newTodo: string = '';

  addTodo() {
    if (this.newTodo.trim()) {
      const newTask: Todo = {
        id: Date.now(),
        title: this.newTodo,
        completed: false,
      };
      this.todos = [...this.todos, newTask];
      this.newTodo = '';
    }
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
  logout() {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }
}
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
