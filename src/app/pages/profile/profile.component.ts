import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(public auth: AuthService) {}
  profile!: User | null | undefined;
  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.profile = profile;
    });
  }
  logout() {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }
}
