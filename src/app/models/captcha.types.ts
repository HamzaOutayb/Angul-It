export type ChallengeType =
  | 'image-selection'
  | 'math'
  | 'text'
  | 'puzzle';

export interface CaptchaImage {
  id: string;
  url: string;
  category: string;
}

export interface ImageSelectionData {
  images: CaptchaImage[];
  targetCategory: string;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  question: string;
  data: ImageSelectionData;
}