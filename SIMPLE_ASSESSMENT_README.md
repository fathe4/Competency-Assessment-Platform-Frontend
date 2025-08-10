# Simple Assessment System

This is a simplified, beginner-friendly assessment system that implements the Test_School requirements.

## Features

✅ **3-Step Progressive Testing**

- Step 1: A1 & A2 levels (44 questions)
- Step 2: B1 & B2 levels (44 questions)
- Step 3: C1 & C2 levels (44 questions)

✅ **Scoring Rules**

- Step 1: <25% = FAIL (no retake), 25-49% = A1, 50-74% = A2, ≥75% = A2 + proceed to Step 2
- Step 2: <25% = remain A2, 25-49% = B1, 50-74% = B2, ≥75% = B2 + proceed to Step 3
- Step 3: <25% = remain B2, 25-49% = C1, ≥50% = C2

✅ **Timer System**

- 1 minute per question
- Auto-submit when time expires
- Live countdown display

## How to Use

### 1. Assessment State (`useAssessment` hook)

```typescript
const {
  // Basic state
  currentStep, // 1, 2, 3, or null
  isActive, // true when test is running
  isCompleted, // true when test finished

  // Current question
  currentQuestion, // { id, text, options, correctAnswer, competency, level }
  currentQuestionIndex, // 0-based index
  totalQuestions, // total number of questions

  // Results
  score, // percentage (0-100)
  level, // "A1", "A2", "B1", "B2", "C1", "C2", or "FAILED"
  canProceedToNext, // true if can go to next step

  // Timer
  timeElapsed, // seconds elapsed
  timeRemaining, // seconds remaining
  progress, // percentage complete (0-100)

  // Actions
  startAssessment, // (step: 1|2|3) => void
  submitQuestionAnswer, // (answerIndex: number) => void
  finishAssessment, // () => void
  resetTest, // () => void
} = useAssessment();
```

### 2. Simple Usage Example

```typescript
import { useAssessment } from "../hooks/useAssessment";

function MyTestPage() {
  const {
    isActive,
    currentQuestion,
    startAssessment,
    submitQuestionAnswer
  } = useAssessment();

  // Start Step 1
  const handleStart = () => {
    startAssessment(1);
  };

  // Answer a question
  const handleAnswer = (answerIndex: number) => {
    submitQuestionAnswer(answerIndex);
  };

  if (!isActive) {
    return (
      <button onClick={handleStart}>
        Start Test
      </button>
    );
  }

  return (
    <div>
      <h2>{currentQuestion.text}</h2>
      {currentQuestion.options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(index)}>
          {option}
        </button>
      ))}
    </div>
  );
}
```

### 3. Timer Implementation

```typescript
// Add this to your component to handle the timer
useEffect(() => {
  if (!isActive) return;

  const timer = setInterval(() => {
    updateAssessmentTimer(timeElapsed + 1);
  }, 1000);

  return () => clearInterval(timer);
}, [isActive, updateAssessmentTimer, timeElapsed]);
```

## File Structure

```
frontend/src/
├── hooks/useAssessment.ts          # Main hook with all logic
├── store/slices/assessmentSlice.ts # Redux state management
├── pages/AssessmentTestPage.tsx    # Complete working example
└── store/index.ts                  # Store exports
```

## Redux State Structure

```typescript
{
  currentStep: 1 | 2 | 3 | null,
  isActive: boolean,
  currentQuestionIndex: number,
  totalQuestions: number,
  questions: Array<Question>,
  answers: Array<Answer>,
  timeLimit: number,
  timeElapsed: number,
  score: number,
  level: string | null,
  canProceedToNext: boolean,
  isCompleted: boolean,
  isLoading: boolean,
  error: string | null
}
```

## Key Functions

### `startTest(step, testId, questions)`

- Initializes a new test session
- Sets timer to 1 minute per question
- Resets all state

### `submitAnswer(questionId, selectedAnswer)`

- Records the answer
- Automatically moves to next question
- Calculates if answer is correct

### `completeTest()`

- Calculates final score
- Determines certification level
- Sets whether user can proceed to next step

### `updateTimer(elapsedSeconds)`

- Updates timer state
- Auto-submits test when time expires

## Adding Real Questions

The system now uses real API calls from `assessmentApi.ts`. The current implementation:

```typescript
// Real API calls are now integrated:
const response = await startAssessmentMutation({ step }).unwrap();
await submitAnswerMutation({
  testId: assessmentState.testId,
  questionId: currentQuestion.id,
  selectedOptionIndex: selectedAnswer,
  timeSpent: timeSpent,
}).unwrap();
await completeAssessmentMutation({
  testId: assessmentState.testId,
  totalTimeSpent: assessmentState.timeElapsed,
}).unwrap();
```

**Current Implementation:**

- ✅ Real API integration for starting/submitting/completing assessments
- ✅ API-generated test IDs and question counts
- 🔄 Mock questions (will be replaced with real question API)
- 🔄 Local scoring (will use API scoring results)

**To Complete API Integration:**

1. **Real Questions**: Implement question fetching from `getCurrentQuestion` API
2. **API Scoring**: Use score/level results from `completeAssessment` API response
3. **Progress Sync**: Sync question navigation with server state

## Next Steps

1. **Add Real Questions**: Replace mock data with actual question pool
2. **Add API Integration**: Connect to backend for question fetching
3. **Add Certificate Generation**: Implement PDF certificate creation
4. **Add User Authentication**: Integrate with login system
5. **Add Progress Persistence**: Save progress to database

This simplified system gives you all the core functionality needed for the Test_School assessment platform!
