import { Component } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CommonModule],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
})
export class LoginComponent {
  profile!: User | null | undefined;

  constructor(public auth: AuthService) {}

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }
  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.profile = profile;
    });
  }
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
}
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
