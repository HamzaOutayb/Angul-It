import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class HomeComponent {
    constructor(private router: Router) {}

  startChallenge(): void {
    this.router.navigate(['/captcha']);
  }
}
