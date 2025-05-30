import { logEvent } from "firebase/analytics"

// This would be imported from your Firebase setup
const analytics = {} as any

class PaywallAnalyticsService {
  // Track paywall view
  trackPaywallView(source?: string): void {
    logEvent(analytics, "paywall_viewed", {
      source: source || "unknown",
      timestamp: Date.now(),
    })
  }

  // Track purchase attempt
  trackPurchaseAttempt(packageId: string, plan: string): void {
    logEvent(analytics, "purchase_attempt", {
      package_id: packageId,
      plan_type: plan,
      timestamp: Date.now(),
    })
  }

  // Track purchase success
  trackPurchaseSuccess(packageId: string, plan: string, isTrialPeriod: boolean): void {
    logEvent(analytics, "purchase_success", {
      package_id: packageId,
      plan_type: plan,
      is_trial: isTrialPeriod,
      timestamp: Date.now(),
    })
  }

  // Track purchase failure
  trackPurchaseFailure(packageId: string, plan: string, error: string): void {
    logEvent(analytics, "purchase_failure", {
      package_id: packageId,
      plan_type: plan,
      error_message: error,
      timestamp: Date.now(),
    })
  }

  // Track restore attempt
  trackRestoreAttempt(): void {
    logEvent(analytics, "restore_attempt", {
      timestamp: Date.now(),
    })
  }

  // Track restore success
  trackRestoreSuccess(): void {
    logEvent(analytics, "restore_success", {
      timestamp: Date.now(),
    })
  }

  // Track restore failure
  trackRestoreFailure(error: string): void {
    logEvent(analytics, "restore_failure", {
      error_message: error,
      timestamp: Date.now(),
    })
  }

  // Track paywall close
  trackPaywallClose(source?: string): void {
    logEvent(analytics, "paywall_closed", {
      source: source || "unknown",
      timestamp: Date.now(),
    })
  }

  // Track legal link taps
  trackLegalLinkTap(linkType: "terms" | "privacy"): void {
    logEvent(analytics, "legal_link_tap", {
      link_type: linkType,
      timestamp: Date.now(),
    })
  }
}

export const paywallAnalytics = new PaywallAnalyticsService()
