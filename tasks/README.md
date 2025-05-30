# Productivity Dawn Tasks Screen

The main Tasks screen is the heart of the Productivity Dawn app, providing users with their daily morning routine tracking and progress visualization.

## 🎯 Core Features

### Daily Task Management
- **4 Essential Tasks**: Water, No Social Media, Sunlight, Elephant Task
- **Real-time Sync**: Firebase Firestore integration with offline support
- **Weighted Scoring**: Hidden algorithm with precise weights
- **Daily Reset**: Automatic reset at 3:00 AM local time

### Firebase Integration
- **Real-time Updates**: Live sync across devices
- **Offline Support**: Queue submissions when offline
- **Analytics Tracking**: Comprehensive event tracking
- **Progress Persistence**: Streak and score tracking

### Smart Notifications
- **Morning Reminders**: 90 minutes after wake time
- **Daily Scheduling**: Automatic recurring notifications
- **Permission Handling**: Graceful permission requests

## 📊 Scoring Algorithm

The app uses a precise weighted scoring system:

\`\`\`javascript
const weights = {
  drinkWater: 0.20,        // 20% weight
  noSocialMedia: 0.30,     // 30% weight (highest)
  sunlightExposure: 0.20,  // 20% weight
  elephantTask: 0.30       // 30% weight (highest)
};
\`\`\`

### Motivational Messages
- **90-100%**: "CRUSHING IT! You're unstoppable!"
- **75-89%**: "STRONG performance! Keep building momentum!"
- **50-74%**: "SOLID effort! Tomorrow's your chance to level up!"
- **30-49%**: "PROGRESS over perfection! You're building something great!"
- **Below 30%**: "Every CHAMPION has off days. Ready to bounce back?"

## 🎨 Task Details

### 💧 Drink Water (#007AFF - Blue)
- **Description**: "Consume water immediately upon waking"
- **Weight**: 20%
- **Purpose**: Hydration and metabolism boost

### 📱 No Social Media (#FF3B30 - Red)
- **Description**: "Avoid notifications/social media before getting out of bed"
- **Weight**: 30% (Highest)
- **Purpose**: Mental clarity and focus

### ☀️ Sunlight Exposure (#FFCC00 - Yellow)
- **Description**: "Get 5-10 minutes of direct sunlight"
- **Weight**: 20%
- **Purpose**: Circadian rhythm regulation

### 🐘 Elephant Task (#34C759 - Green)
- **Description**: "Identify the most important task of the day"
- **Weight**: 30% (Highest)
- **Purpose**: Productivity and goal achievement

## 🔧 Technical Implementation

### Firebase Data Structure

\`\`\`typescript
interface TaskData {
  id: string
  userId: string
  date: string // YYYY-MM-DD format
  tasks: {
    drinkWater: boolean
    noSocialMedia: boolean
    sunlightExposure: boolean
    elephantTask: boolean
  }
  score: number
  submittedAt: Date
  createdAt: Date
  updatedAt: Date
}

interface UserProgress {
  id: string
  userId: string
  currentStreak: number
  longestStreak: number
  totalDays: number
  lastSubmissionDate: string
  wakeTime: { hour: number; minute: number }
  updatedAt: Date
}
\`\`\`

### Offline Support

The app includes comprehensive offline support:

1. **Offline Queue**: Tasks are queued when offline
2. **Auto Sync**: Automatic sync when connection is restored
3. **Local Storage**: AsyncStorage for persistence
4. **Network Monitoring**: Real-time network status tracking

### Performance Optimizations

- **60fps Animations**: Smooth task toggle animations
- **Optimized Re-renders**: Efficient React state management
- **Memory Management**: Proper cleanup of listeners
- **Fast Launch**: Optimized for notification-triggered launches

## 📱 User Experience

### Visual Design
- **iOS-inspired**: Clean, minimalist design language
- **Color-coded Tasks**: Each task has a unique color
- **Progress Visualization**: Weekly calendar with colored dots
- **Smooth Animations**: Spring-based task toggle animations

### Interaction Patterns
- **Touch Feedback**: Visual feedback on all interactions
- **Disabled States**: Clear indication when tasks are submitted
- **Loading States**: Proper loading indicators
- **Error Handling**: Graceful error messages

### Accessibility
- **Screen Reader Support**: Proper accessibility labels
- **Touch Targets**: Minimum 44pt touch targets
- **Color Contrast**: WCAG compliant color ratios
- **Reduced Motion**: Respects system preferences

## 🔔 Notification System

### Morning Reminders
- **Timing**: 90 minutes after user's wake time
- **Content**: Motivational message with task reminder
- **Frequency**: Daily recurring notifications
- **Permissions**: Graceful permission handling

### Implementation
\`\`\`typescript
// Schedule morning reminder
notificationService.scheduleMorningReminder(wakeTime, userId)

// Notification content
{
  title: "🌅 Morning Routine Time!",
  message: "Ready to conquer your day? Complete your 4 morning tasks now!",
  repeatType: "day"
}
\`\`\`

## 📈 Analytics Events

The app tracks comprehensive analytics:

- **Screen Views**: Track screen engagement
- **Task Toggles**: Individual task interactions
- **Task Completions**: Successful task completions
- **Submissions**: Full task submission events
- **Scores**: Performance tracking

### Event Examples
\`\`\`typescript
// Task completion
logEvent(analytics, "task_completed", {
  task_name: taskName,
  user_id: userId,
  score: calculatedScore
})

// Full submission
logEvent(analytics, "tasks_submitted", {
  user_id: userId,
  score: finalScore,
  total_completed: completedCount
})
\`\`\`

## 🚀 Usage

\`\`\`tsx
import { TasksScreen } from './tasks/TasksScreen'

const App = () => {
  return (
    <TasksScreen
      userId="user123"
      userName="Alex"
      wakeTime={{ hour: 7, minute: 0 }}
    />
  )
}
\`\`\`

## 🔄 State Management

The screen manages multiple state layers:

1. **Local State**: Immediate UI updates
2. **Firebase State**: Persistent data
3. **Offline State**: Queued submissions
4. **Animation State**: Visual feedback

### State Flow
1. User toggles task → Local state updates
2. Animation triggers → Visual feedback
3. User submits → Firebase sync
4. If offline → Queue for later sync
5. Real-time listener → UI updates

This comprehensive implementation ensures a smooth, reliable, and engaging user experience while maintaining data integrity and performance.
