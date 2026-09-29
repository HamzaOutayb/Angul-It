# Angul-It — Image CAPTCHA App

A multi-stage image-selection CAPTCHA built with **Angular 18** (signals, standalone components).

---

## How It Works — Step by Step

### 1. App starts → `HomeComponent`
The user lands on the home page and clicks **Start Challenge**.  
This navigates to `/captcha`.

---

### 2. Session is created → `CaptchaService`
When `CaptchaService` loads, it checks `localStorage` for a saved session.

- **Found?** → restore it (so progress survives a page reload).
- **Not found?** → call `createNewSession()`.

A new session generates **3 challenges** (cat → dog → car), each with:
- **3 correct images** randomly picked from the target category.
- **6 distractor images** picked from the other categories.
- All 9 images shuffled into random positions.

The session is saved to `localStorage` after every state change.

---

### 3. User completes a stage → `CaptchaComponent`

```
User sees a 3×3 grid of images
        ↓
User clicks tiles to toggle selection  (toggleImage)
        ↓
User clicks "Verify"                   (verify)
        ↓
Service checks: selected IDs == correct IDs?
  ✓ Yes → stage marked completed, show success message
  ✗ No  → show error message, let user try again
        ↓
User clicks "Next →"                   (goNext)
  → service moves to next stage, local state is reset
```

Each tile click calls `toggleImage(image)`:
- Image already in `selectedIds`? → remove it.
- Not in there? → add it.

---

### 4. Verification logic → `CaptchaService.verifyCurrentStage()`

```
1. Record the selected IDs and increment attempt count.
2. Find the correct IDs: images whose category === targetCategory.
3. Pass if:  selectedIds.length === correctIds.length
         AND every correctId is in selectedIds
4. Mark stage completed (or not) and save session.
5. Return { success, message } to the component.
```

---

### 5. Navigation rules

| Button               | Enabled when                          | What it does                 |
|----------------------|---------------------------------------|------------------------------|
| **Previous**         | not on stage 1                        | go back one stage            |
| **Verify**           | always                                | check the current selection  |
| **Next →**           | current stage is completed (✓ Solved) | advance to next stage        |
| **View Results →**   | last stage completed                  | navigate to `/result`        |

You can freely go **back** to any earlier stage.  
You can only go **forward** if the current stage is solved.

---

### 6. All stages done → `ResultComponent`

Protected by `resultGuard` — if you try to visit `/result` directly without finishing, you are redirected to `/captcha`.

The result page shows:
- ✅ Stages completed / total.
- 🔢 Total verification attempts across all stages.
- ⏱ Time taken from start to finish.

---

## Project Structure

```
src/app/
├── pages/
│   ├── home/              # Landing page
│   ├── captcha/           # CAPTCHA challenge UI (component + template + styles)
│   └── result/            # Completion summary page
├── services/
│   └── captcha.ts         # All state, session, and verification logic
├── models/
│   ├── captcha.types.ts   # TypeScript interfaces
│   └── captcha-data.ts    # Image catalog (dogs, cats, cars, trucks)
├── guards/
│   └── result.guard.ts    # Blocks /result unless all stages are done
└── app.routes.ts          # Route definitions
```

---

## Key Concepts Used

| Concept | Where |
|---|---|
| Angular Signals | `CaptchaService` — reactive state with `signal()` and `computed()` |
| Standalone Components | All components use `standalone: true` |
| `localStorage` | Session persisted so page refresh doesn't lose progress |
| Route Guard | `resultGuard` protects the `/result` page |
| Fisher-Yates shuffle | Randomises image order in every challenge |

---

## Run Locally

```bash
npm install
ng serve
```

Then open [http://localhost:4200](http://localhost:4200).
