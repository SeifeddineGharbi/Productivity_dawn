# Productivity Dawn Onboarding System

A comprehensive onboarding flow for the Productivity Dawn app, built with React Native, NativeWind, Firebase, and RevenueCat.

## Features

- **14-Step Onboarding Flow**: Personalized questions to tailor the user experience
- **Firebase Integration**: Real-time data saving to Firestore
- **Analytics Tracking**: Event tracking for each question and action
- **Time Validation**: Cross-validation between wake time and work start time
- **RevenueCat Integration**: Seamless transition to subscription paywall
- **Progress Tracking**: Visual progress bar and step indicators
- **Celebration Animation**: Particle effects upon completion

## Architecture

The onboarding system is built with a modular architecture:

1. **OnboardingContainer**: Main container component that manages the flow
2. **QuestionTemplate**: Flexible template for different question types
3. **Input Components**: Multiple choice, text input, and time picker components
4. **Firebase Service**: Handles data persistence and analytics
5. **RevenueCat Service**: Manages subscription offerings and purchases
6. **Validation Utilities**: Ensures data integrity and cross-field validation

## Question Flow

The onboarding flow consists of 14 questions:

1. **Source**: How the user heard about the app (skippable)
2. **Name**: User's preferred name (required)
3. **Gender**: User's gender identity (required)
4. **Wake Time**: User's typical wake-up time (required)
5. **Situation**: User's current work/study situation (required)
6. **Work Start Time**: When user starts work/study (required, must be after wake time)
7. **Work Mode**: How user works/studies (required)
8. **Bed Time**: Time spent in bed after waking (required)
9. **Energy Slumps**: Frequency of afternoon energy slumps (required)
10. **Morning Productivity**: Self-assessment of morning productivity (required)
11. **Primary Goal**: Main goal for using the app (required)
12. **Coffee Habits**: User's coffee consumption habits (required)
13. **Social Media**: Morning social media checking habits (required)
14. **Weekend Productivity**: Approach to productivity on weekends (required)

## Firebase Data Structure

\`\`\`typescript
interface OnboardingData {
  id: string;
  userId: string;
  completed: boolean;
  currentStep: number;
  startedAt: Date;
  completedAt?: Date;
  answers: {
    [key: string]: Answer;
  };
}

type Answer = string | number | { hour: number; minute: number } | null;
\`\`\`

## Time Validation Logic

\`\`\`typescript
const validateTimes = (wakeTime: TimeValue, workStartTime: TimeValue): boolean => {
  const wakeMinutes = (wakeTime.hour * 60) + wakeTime.minute;
  const workMinutes = (workStartTime.hour * 60) + workStartTime.minute;
  
  if (workMinutes <= wakeMinutes) {
    throw new Error("Your work/study time cannot be earlier than your wake up time. Please select a later time.");
  }
  return true;
};
\`\`\`

## Analytics Events

The system tracks the following analytics events:

- `onboarding_started`: When the user starts the onboarding flow
- `question_answered`: When the user answers a question
- `onboarding_completed`: When the user completes the onboarding flow
- `paywall_completed`: When the user completes the paywall flow

## Usage

\`\`\`tsx
import { OnboardingFlow } from './onboarding/OnboardingFlow';

const App = () => {
  return (
    <OnboardingFlow
      firebaseUserId="user123"
      revenueCatApiKey="your_revenuecat_api_key"
      onComplete={() => console.log('Onboarding completed')}
      onSkip={() => console.log('Onboarding skipped')}
    />
  );
};
\`\`\`

## Component Props

### OnboardingFlow

\`\`\`typescript
interface OnboardingFlowProps {
  firebaseUserId: string;
  revenueCatApiKey: string;
  onComplete: () => void;
  onSkip?: () => void;
}
\`\`\`

### OnboardingContainer

\`\`\`typescript
interface OnboardingContainerProps {
  userId: string;
  onComplete: () => void;
  onSkip?: () => void;
}
\`\`\`

### QuestionTemplate

\`\`\`typescript
interface QuestionTemplateProps {
  question: OnboardingQuestion;
  value: Answer;
  onChange: (value: Answer) => void;
  error?: string;
  isLoading?: boolean;
}
\`\`\`

## Error Handling

The system handles the following error scenarios:

1. **Network Errors**: Graceful degradation when offline
2. **Validation Errors**: Clear error messages for invalid inputs
3. **Firebase Errors**: Retry mechanisms and error logging
4. **RevenueCat Errors**: Fallback options for purchase failures

## Best Practices

1. **Real-time Saving**: Each answer is saved immediately to prevent data loss
2. **Progressive Disclosure**: Questions are presented one at a time
3. **Visual Feedback**: Loading indicators and error messages
4. **Accessibility**: Proper labels and touch targets
5. **Performance**: Optimized animations and efficient re-renders

## Dependencies

- React Native
- NativeWind (Tailwind CSS for React Native)
- Firebase/Firestore
- Firebase Analytics
- RevenueCat
- @react-native-community/datetimepicker

## Future Improvements

1. **Offline Support**: Enhanced offline capabilities with local storage
2. **A/B Testing**: Framework for testing different question flows
3. **Personalization**: Dynamic question flow based on previous answers
4. **Accessibility**: Enhanced screen reader support
5. **Localization**: Multi-language support
