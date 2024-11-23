import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class homeComponent implements OnInit {
  tasks: any[] = [];
  constructor(
    public auth: AuthService,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  scrollLeft() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    carousel.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    carousel.scrollBy({ left: 200, behavior: 'smooth' });
  }

  playPreview(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.play();
  }

  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }
}
