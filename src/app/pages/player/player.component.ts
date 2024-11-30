import { Component, OnInit } from '@angular/core';
import { ApiService, Task } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../pipes/safeUrl.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe, RouterLink],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  selectedVideo: Task | null = null;
  isFavorite: boolean = false;
  errorMessage: string = '';
  constructor(
    private apiService: ApiService,
    public auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.apiService.selectedVideo$.subscribe((video) => {
      this.selectedVideo = video;
      if (video) {
        this.checkIfFavorite(video.id!);
      }
    });
    this.route.queryParams.subscribe((params) => {
      const videoId = params['id'];
      if (videoId) {
        this.apiService.getVideoById(videoId).subscribe((video) => {
          this.selectedVideo = video || null;
        });
      }
    });
  }

  /*dropdown*/
  isMenuOpen: boolean = false;
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  isRotated: boolean = false;
  toggleRotation(): void {
    this.isRotated = !this.isRotated;
  }
  getYouTubeEmbedUrl(): string {
    if (!this.selectedVideo) return '';
    const url = this.selectedVideo.url;
    const videoIdMatch = url.match(/v=([^&]*)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';
  }
  addToFavorites(): void {
    if (this.selectedVideo) {
      this.apiService.addToFavorites(this.selectedVideo).subscribe({
        next: () => {
          this.isFavorite = true;
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
    }
  }

  checkIfFavorite(videoId: number): void {
    this.apiService.getFavorites().subscribe((favorites) => {
      this.isFavorite = favorites.some((fav) => fav.id === videoId);
    });
  }
  /*logout*/
  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }
}
