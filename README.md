# Productivity Dawn Design System

A comprehensive React Native design system built with NativeWind (Tailwind CSS for React Native) for the Productivity Dawn: Morning Mastery app.

## Features

- **iOS-inspired Design Language**: Clean, minimalist aesthetic with iOS system colors
- **NativeWind Integration**: Utility-first styling with Tailwind CSS classes
- **Firebase Ready**: Components optimized for Firebase Auth, Firestore, and Analytics
- **RevenueCat Integration**: Payment and subscription management components
- **Performance Optimized**: 60fps animations and efficient rendering
- **Accessibility First**: VoiceOver/TalkBack support and WCAG compliance
- **TypeScript Support**: Full type safety throughout the design system

## Installation

\`\`\`bash
npm install nativewind react-native-svg react-native-linear-gradient
npm install --save-dev tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## Quick Start

1. **Import the design system:**
\`\`\`tsx
import {
  Screen,
  H1,
  Body,
  PrimaryButton,
  Card,
  designTokens,
} from './design-system';
\`\`\`

2. **Use components with NativeWind classes:**
\`\`\`tsx
export const MyScreen = () => (
  <Screen>
    <Card>
      <H1 className="text-center mb-4">Welcome</H1>
      <Body className="text-gray-600 mb-6">
        Start your morning routine
      </Body>
      <PrimaryButton fullWidth>
        Get Started
      </PrimaryButton>
    </Card>
  </Screen>
);
\`\`\`

## Core Components

### Typography
- `H1`, `H2`, `H3` - Heading components
- `Body`, `BodyLarge`, `BodySmall` - Body text
- `Label`, `Caption` - Supporting text
- `ScoreText`, `MotivationalText` - App-specific typography

### Buttons
- `Button` - Base button with variants (primary, secondary, ghost, danger)
- `PrimaryButton`, `SecondaryButton` - Specialized buttons
- `TaskButton` - Task completion button with color coding

### Inputs
- `Input` - Base text input with validation states
- `PasswordInput` - Password input with strength indicator
- `TimePickerInput` - Time selection component

### Layout
- `Screen` - Main screen container with safe area
- `Header` - Navigation header component
- `Section` - Content section wrapper
- `Row`, `Column` - Flex layout helpers
- `Spacer` - Spacing component

### Cards
- `Card` - Base card component
- `TaskCard` - Task-specific card styling
- `PaywallCard` - Subscription plan cards
- `OnboardingCard` - Onboarding question cards

### Loading & Error States
- `Loading`, `FullScreenLoading` - Loading indicators
- `ErrorState`, `NetworkError` - Error handling
- `SkeletonBox`, `TaskSkeleton` - Skeleton loading

### Progress Indicators
- `ProgressBar` - Linear progress indicator
- `CircularProgress` - Circular progress indicator
- `TaskDots` - Task completion visualization
- `StepProgress` - Multi-step progress indicator

### Notifications
- `Notification`, `Toast`, `Banner` - Alert components
- `OfflineIndicator` - Network status
- `SyncStatus` - Data synchronization status

### Firebase Components
- `SignInForm`, `SignUpForm` - Authentication forms
- `FirebaseStatus` - Connection status indicator
- `DataSync` - Data synchronization component

### RevenueCat Components
- `Paywall` - Subscription paywall
- `SubscriptionStatus` - Current subscription display
- `PurchaseSuccess` - Purchase confirmation

## Color System

The design system uses iOS-inspired colors with specific task-related colors:

\`\`\`tsx
const colors = {
  primary: '#007AFF',    // iOS Blue
  success: '#34C759',    // iOS Green
  warning: '#FF9500',    // iOS Orange
  error: '#FF3B30',      // iOS Red
  background: '#F8F9FA', // Light Gray
  
  // Task-specific colors
  task: {
    water: '#007AFF',     // Blue - hydration
    noSocial: '#FF3B30',  // Red - restriction
    sunlight: '#FFCC00',  // Yellow - sunshine
    elephant: '#34C759',  // Green - growth
  },
};
\`\`\`

## Typography Scale

Based on SF Pro font family with mobile-optimized sizes:

- **H1**: 28pt (text-3xl font-bold)
- **H2**: 24pt (text-2xl font-bold)
- **H3**: 20pt (text-xl font-semibold)
- **Body**: 16pt (text-base font-normal)
- **Caption**: 14pt (text-sm font-normal)

## Spacing System

Consistent spacing using Tailwind standards:

- **xs**: 4px (p-1)
- **sm**: 8px (p-2)
- **md**: 16px (p-4)
- **lg**: 24px (p-6)
- **xl**: 32px (p-8)

## Animation Guidelines

- **Duration**: 300ms for most transitions
- **Easing**: iOS-style bezier curves
- **Performance**: 60fps target with optimized animations
- **Accessibility**: Respects reduced motion preferences

## Best Practices

1. **Use semantic components**: Prefer `PrimaryButton` over `Button variant="primary"`
2. **Consistent spacing**: Use design tokens for spacing values
3. **Color accessibility**: Ensure proper contrast ratios
4. **Performance**: Use skeleton loading for better perceived performance
5. **Error handling**: Always provide error states and retry mechanisms

## Firebase Integration

Components are designed to work seamlessly with Firebase:

\`\`\`tsx
// Authentication
<SignInForm 
  onSubmit={handleFirebaseSignIn}
  loading={authLoading}
  error={authError}
/>

// Data sync status
<SyncStatus status={syncStatus} />
\`\`\`

## RevenueCat Integration

Subscription management made simple:

\`\`\`tsx
// Paywall
<Paywall
  plans={subscriptionPlans}
  onPurchase={handleRevenueCatPurchase}
  onRestore={handleRestorePurchases}
/>

// Subscription status
<SubscriptionStatus
  isActive={subscription.isActive}
  plan={subscription.plan}
  expiresAt={subscription.expiresAt}
/>
\`\`\`

## Customization

The design system is built to be customizable while maintaining consistency:

\`\`\`tsx
// Custom button with design system classes
<Button 
  variant="primary" 
  className="bg-gradient-to-r from-blue-500 to-purple-600"
>
  Custom Gradient Button
</Button>
\`\`\`

## Contributing

1. Follow the established naming conventions
2. Ensure all components are accessible
3. Include TypeScript types for all props
4. Test on both iOS and Android
5. Document any new components or patterns

## Performance Considerations

- Components use React.memo where appropriate
- Animations are optimized for 60fps
- Large lists use FlatList with proper optimization
- Images are properly sized and cached
- Bundle size is minimized through tree shaking

This design system provides a solid foundation for building the entire Productivity Dawn app with consistent, accessible, and performant components.
