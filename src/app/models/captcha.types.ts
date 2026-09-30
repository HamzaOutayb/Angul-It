// Represents an individual CAPTCHA tile image. 
export interface CaptchaImage {
  id: string;        
  url: string;      
  category: string; 
}

// Payload data for an image selection challenge.
export interface ImageSelectionData {
  images: CaptchaImage[]; 
  targetCategory: string; 
}

// Represents a single verification challenge stage.
export interface Challenge {
  id: string;                     
  type: 'image-selection';       
  question: string;               
  data: ImageSelectionData;  
}

// Tracks the user's progress for an individual stage.
export interface StageProgress {
  challengeId: string;
  completed: boolean;            
  selectedImageIds: string[];     
  attempts: number;              
}

export interface CaptchaSession {
  sessionId: string;              
  currentStageIndex: number;     
  challenges: Challenge[];        
  progress: StageProgress[];      
  startedAt: number;              
  completedAt?: number;           
  isAllCompleted: boolean;
}
