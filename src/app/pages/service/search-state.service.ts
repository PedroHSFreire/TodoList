import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class SearchStateService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  private selectedVideoSubject = new BehaviorSubject<any | null>(null);

  searchQuery$ = this.searchQuerySubject.asObservable();
  selectedVideo$ = this.selectedVideoSubject.asObservable();

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  setSelectedVideo(video: any): void {
    this.selectedVideoSubject.next(video);
  }
}
