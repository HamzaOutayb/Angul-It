/**
 * Hardcoded CAPTCHA stage definitions.
 *
 * Stage 1 – Image selection: find all cats in a 3×3 grid.
 * Stage 2 – Text CAPTCHA: type the distorted text shown in an image.
 * Stage 3 – Math equation: solve a simple addition (random numbers 0–100).
 */

// ─── Stage 1: Fixed 3×3 grid of images (3 cats + 6 distractors) ──────────────

export interface GridImage {
  id: string;
  url: string;
  isCat: boolean;
}

export const STAGE1_GRID: GridImage[] = [
  { id: 'cat-01',   url: '/assets/captcha/cats/cat-01.jpg',   isCat: true  },
  { id: 'dog-03',   url: '/assets/captcha/dogs/dog-03.jpg',   isCat: false },
  { id: 'cat-05',   url: '/assets/captcha/cats/cat-05.jpg',   isCat: true  },
  { id: 'truck-02', url: '/assets/captcha/truck/truck-02.jpg', isCat: false },
  { id: 'dog-07',   url: '/assets/captcha/dogs/dog-07.jpg',   isCat: false },
  { id: 'car-04',   url: '/assets/captcha/cars/car-04.jpg',   isCat: false },
  { id: 'cat-09',   url: '/assets/captcha/cats/cat-09.jpg',   isCat: true  },
  { id: 'car-11',   url: '/assets/captcha/cars/car-11.jpg',   isCat: false },
  { id: 'dog-10',   url: '/assets/captcha/dogs/dog-10.jpg',   isCat: false },
];

export const STAGE1_CORRECT_IDS = STAGE1_GRID
  .filter(img => img.isCat)
  .map(img => img.id);

// ─── Stage 2: Text CAPTCHA samples (filename = the answer) ───────────────────

export interface SampleImage {
  url: string;
  answer: string; // case-insensitive
}

export const STAGE2_SAMPLES: SampleImage[] = [
  { url: '/assets/samples/2b827.png',  answer: '2b827'  },
  { url: '/assets/samples/2bg48.png',  answer: '2bg48'  },
  { url: '/assets/samples/2cegf.png',  answer: '2cegf'  },
  { url: '/assets/samples/2cg58.png',  answer: '2cg58'  },
  { url: '/assets/samples/2cgyx.png',  answer: '2cgyx'  },
  { url: '/assets/samples/2enf4.png',  answer: '2enf4'  },
  { url: '/assets/samples/2fxgd.png',  answer: '2fxgd'  },
  { url: '/assets/samples/2g783.png',  answer: '2g783'  },
  { url: '/assets/samples/2g7nm.png',  answer: '2g7nm'  },
  { url: '/assets/samples/2gyb6.png',  answer: '2gyb6'  },
  { url: '/assets/samples/2mpnn.png',  answer: '2mpnn'  },
  { url: '/assets/samples/2n73f.png',  answer: '2n73f'  },
  { url: '/assets/samples/2nbc5.jpg',  answer: '2nbc5'  },
  { url: '/assets/samples/2nbcx.png',  answer: '2nbcx'  },
  { url: '/assets/samples/2nf26.png',  answer: '2nf26'  },
  { url: '/assets/samples/2nx38.png',  answer: '2nx38'  },
  { url: '/assets/samples/2p2y8.png',  answer: '2p2y8'  },
  { url: '/assets/samples/2pfpn.png',  answer: '2pfpn'  },
  { url: '/assets/samples/2w4y7.png',  answer: '2w4y7'  },
  { url: '/assets/samples/2wc38.png',  answer: '2wc38'  },
];
