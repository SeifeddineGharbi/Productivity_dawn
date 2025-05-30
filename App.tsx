import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { View } from "react-native"
import { PaywallScreenExample } from "./paywall/PaywallScreenExample"

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />

          {/* 
            Main App Entry Point for Productivity Dawn
            
            In a real app, this would contain:
            - Navigation container (React Navigation)
            - Authentication state management
            - Global providers (Firebase, RevenueCat, etc.)
            - Theme provider
            - Error boundaries
            
            For demonstration purposes, we're showing the Paywall screen
            as it's the most recent component created.
          */}

          <PaywallScreenExample />

          {/* 
            Other available screens for testing:
            - <AuthFlowDemo />
            - <OnboardingExample />
            - <TasksScreenExample />
            - <AnalyticsScreenExample />
            - <SettingsScreenExample />
          */}
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
