import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('angular_autopote');
  isLoaded = signal<boolean>(false);

  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.authService.fetchJwtToken().subscribe({
      next: (response) => {
        console.log(response);
        this.isLoaded.set(true);
      },
      error: (err) => {
        console.error('Impossible de récupérer le JWT');
        console.log(err);
      },
    });
  }

}
