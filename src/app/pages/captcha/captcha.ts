import { Component, OnInit } from '@angular/core';
import { CaptchaService } from '../../services/captcha';
import { CaptchaImage, Challenge } from '../../models/captcha.types';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [],
  templateUrl: './captcha.html',
  styleUrl: './captcha.css'
})
export class CaptchaComponent implements OnInit {

  challenge!: Challenge;

  images: CaptchaImage[] = [];

  selectedIds = new Set<string>();

  message = '';

  success = false;

  constructor(private captchaService: CaptchaService) {}

  ngOnInit(): void {
    this.newLevel();
  }

  newLevel(): void {
    this.challenge =
      this.captchaService.generateImageChallenge();

    this.images = this.challenge.data.images;

    this.selectedIds.clear();

    this.message = '';

    this.success = false;
  }

  selectImage(image: CaptchaImage): void {
    if (this.selectedIds.has(image.id)) {
      this.selectedIds.delete(image.id);
    } else {
      this.selectedIds.add(image.id);
    }
  }

  isSelected(image: CaptchaImage): boolean {
    return this.selectedIds.has(image.id);
  }

  verify(): void {
    const selectedIds = Array.from(this.selectedIds);

    const correct =
      this.captchaService.validateImageChallenge(
        this.challenge,
        selectedIds
      );

    if (correct) {
      this.message = 'Correct!';
      this.success = true;
    } else {
      this.message = 'Incorrect. Try again.';
      this.success = false;
    }
  }
}