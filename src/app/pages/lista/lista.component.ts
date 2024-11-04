import { Component, OnInit } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Task, TaskService } from '../service/task.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(public auth: AuthService, private taskService: TaskService) {}

  ngOnInit(): void {
    //this.loadTasks();
    this.taskService.getTasks().subscribe((dado) => {
      this.tasks = dado;
      console.log(dado);
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        title: this.newTaskTitle,
        completed: false,
        included: true,
      };

      this.taskService.createTask(newTask).subscribe((task) => {
        this.tasks.push(task);
        this.newTaskTitle = '';
      });
    }
  }

  toggleCompletion(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTaskStatus(task.id!, task.completed).subscribe();
  }

  removeTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }
}
