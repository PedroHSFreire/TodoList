import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

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
    return this.http.get<any[]>(`${this.apiUrl}/favorites`);
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
}
