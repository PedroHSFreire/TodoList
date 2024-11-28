import { Component, OnInit } from '@angular/core';
import { ApiService, Task } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './safe-url.pipe';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  selectedVideo: Task | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.selectedVideo$.subscribe((video) => {
      this.selectedVideo = video;
    });
  }

  getYouTubeEmbedUrl(): string {
    if (!this.selectedVideo) return '';
    const url = this.selectedVideo.url;
    const videoIdMatch = url.match(/v=([^&]*)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';
  }
}
