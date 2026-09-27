import { Injectable } from '@angular/core';
import { CAPTCHA_IMAGES } from '../models/captcha-data';
import { CaptchaImage, Challenge } from '../models/captcha.types';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  generateImageChallenge(): Challenge {
    const categories = ['dog', 'cat', 'car', 'truck'];

    const targetCategory = this.randomItem(categories);

    const correctImages = this.shuffle(
      CAPTCHA_IMAGES.filter(
        image => image.category === targetCategory
      )
    ).slice(0, 3);

    const incorrectImages = this.shuffle(
      CAPTCHA_IMAGES.filter(
        image => image.category !== targetCategory
      )
    ).slice(0, 6);

    const images = this.shuffle([
      ...correctImages,
      ...incorrectImages
    ]);

    return {
      id: crypto.randomUUID(),
      type: 'image-selection',
      question: `Select all images containing ${targetCategory}s`,
      data: {
        images,
        targetCategory
      }
    };
  }

  validateImageChallenge(
    challenge: Challenge,
    selectedIds: string[]
  ): boolean {

    const correctIds = challenge.data.images
      .filter(
        image => image.category === challenge.data.targetCategory
      )
      .map(image => image.id);

    if (correctIds.length !== selectedIds.length) {
      return false;
    }

    return correctIds.every(
      id => selectedIds.includes(id)
    );
  }

  private shuffle<T>(array: T[]): T[] {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  private randomItem<T>(array: T[]): T {
    const index = Math.floor(Math.random() * array.length);

    return array[index];
  }
}