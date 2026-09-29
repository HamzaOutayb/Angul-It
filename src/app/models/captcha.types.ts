/**
 * Captcha Types & Data Models
 *
 * Flow & Purpose:
 * Defines TypeScript interfaces used throughout Angul-It for type safety,
 * challenge generation, stage tracking, and session state persistence.
 */

/**
 * Represents an individual CAPTCHA tile image.
 */
export interface CaptchaImage {
  id: string;        // Unique identifier for the image (e.g. 'cat-01')
  url: string;       // Relative URL path to asset file (e.g. 'assets/captcha/cats/cat-01.jpg')
  category: string;  // Category label (e.g. 'cat', 'dog', 'car', 'truck')
}

/**
 * Payload data for an image selection challenge.
 */
export interface ImageSelectionData {
  images: CaptchaImage[];  // 9 randomized images (mix of target category and distractors)
  targetCategory: string;  // The category the user must find (e.g. 'cat')
}

/**
 * Represents a single verification challenge stage.
 */
export interface Challenge {
  id: string;                     // Unique challenge identifier
  type: 'image-selection';        // Challenge type
  question: string;               // User-facing prompt (e.g. "Select all images containing cats")
  data: ImageSelectionData;       // Challenge payload
}

/**
 * Tracks the user's progress for an individual stage.
 */
export interface StageProgress {
  challengeId: string;            // ID of the corresponding challenge
  completed: boolean;             // Whether this stage was successfully verified
  selectedImageIds: string[];     // IDs of images selected by the user for this stage
  attempts: number;               // Number of verification attempts made on this stage
}

/**
 * Complete session state representing the user's current CAPTCHA run.
 * Saved to localStorage so progress is retained across page reloads.
 */
export interface CaptchaSession {
  sessionId: string;              // Unique session ID
  currentStageIndex: number;      // Active stage index (0-based: 0, 1, 2)
  challenges: Challenge[];        // Array of generated challenges for this session
  progress: StageProgress[];      // Array of progress trackers corresponding to challenges
  startedAt: number;              // Timestamp when session began (in milliseconds)
  completedAt?: number;           // Timestamp when all stages were finished (in milliseconds)
  isAllCompleted: boolean;        // True once every stage in the session is solved
}
