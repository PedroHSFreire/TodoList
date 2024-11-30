import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Task {
  id?: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  views: number;
  uploadedAt: string;
  completed: boolean;
  included: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  private selectedVideoSubject = new BehaviorSubject<Task | null>(null);
  selectedVideo$ = this.selectedVideoSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/videos`);
  }

  getLikes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/likes`);
  }

  getWatchLater(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/watchLater`);
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/favorites`).pipe(
      map((favorites) =>
        favorites.map((video) => ({
          ...video,
          views: video.views || 'Sem informações',
          uploadedAt: video.uploadedAt || null,
        }))
      )
    );
  }

  searchItems(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?title_like=${query}`);
  }
  updateViews(videoId: number, newViews: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/videos/${videoId}`, {
      views: newViews,
    });
  }
  selectVideo(video: Task): void {
    this.selectedVideoSubject.next(video);
  }
  addToFavorites(video: any): Observable<any> {
    return this.getFavorites().pipe(
      switchMap((favorites) => {
        const exists = favorites.some((fav: any) => fav.id === video.id);
        if (exists) {
          return throwError(() => new Error('Vídeo já está nos favoritos'));
        }
        return this.http.post<any>(`${this.apiUrl}/favorites`, video);
      })
    );
  }
  searchByTitle(title: string): Observable<any | undefined> {
    return this.http
      .get<any[]>(`${this.apiUrl}/videos`)
      .pipe(
        map((videos) =>
          videos.find(
            (video) =>
              video.title.toLowerCase().trim() === title.toLowerCase().trim()
          )
        )
      );
  }
  getVideoById(id: string): Observable<any> {
    return this.http
      .get<any[]>(`${this.apiUrl}/videos`)
      .pipe(map((videos) => videos.find((video) => video.id === id)));
  }
}
