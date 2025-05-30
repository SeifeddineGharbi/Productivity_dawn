import Purchases, {
  type PurchasesOffering,
  type PurchasesPackage,
  type CustomerInfo,
  type PurchasesError,
} from "react-native-purchases"
import type { SubscriptionDetails } from "./types"

class RevenueCatService {
  private isConfigured = false

  // Initialize RevenueCat
  async configure(apiKey: string, userId?: string): Promise<boolean> {
    try {
      if (this.isConfigured) return true

      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG)

      await Purchases.configure({
        apiKey,
        appUserID: userId || null,
        observerMode: false,
        userDefaultsSuiteName: null,
      })

      this.isConfigured = true
      console.log("RevenueCat configured successfully")
      return true
    } catch (error) {
      console.error("Error configuring RevenueCat:", error)
      return false
    }
  }

  // Get available offerings
  async getOfferings(): Promise<PurchasesOffering | null> {
    try {
      const offerings = await Purchases.getOfferings()

      if (offerings.current && offerings.current.availablePackages.length > 0) {
        return offerings.current
      }

      console.warn("No offerings available")
      return null
    } catch (error) {
      console.error("Error getting offerings:", error)
      return null
    }
  }

  // Purchase a package
  async purchasePackage(packageToPurchase: PurchasesPackage): Promise<{
    success: boolean
    customerInfo?: CustomerInfo
    error?: string
  }> {
    try {
      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase)

      // Check if the purchase was successful
      const entitlements = customerInfo.entitlements.active
      const hasActiveSubscription = Object.keys(entitlements).length > 0

      if (hasActiveSubscription) {
        console.log("Purchase successful:", customerInfo)
        return { success: true, customerInfo }
      } else {
        return { success: false, error: "Purchase completed but no active entitlements found" }
      }
    } catch (error) {
      console.error("Error purchasing package:", error)

      if (error instanceof Error) {
        // Handle specific RevenueCat errors
        const purchasesError = error as PurchasesError

        switch (purchasesError.code) {
          case Purchases.PURCHASES_ERROR_CODE.PURCHASE_CANCELLED:
            return { success: false, error: "Purchase was cancelled" }
          case Purchases.PURCHASES_ERROR_CODE.PAYMENT_PENDING:
            return { success: false, error: "Payment is pending approval" }
          case Purchases.PURCHASES_ERROR_CODE.INSUFFICIENT_PERMISSIONS:
            return { success: false, error: "Insufficient permissions for purchase" }
          case Purchases.PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED:
            return { success: false, error: "Purchase not allowed on this device" }
          case Purchases.PURCHASES_ERROR_CODE.PURCHASE_INVALID:
            return { success: false, error: "Invalid purchase" }
          case Purchases.PURCHASES_ERROR_CODE.PRODUCT_NOT_AVAILABLE:
            return { success: false, error: "Product not available" }
          case Purchases.PURCHASES_ERROR_CODE.NETWORK_ERROR:
            return { success: false, error: "Network error. Please check your connection and try again." }
          default:
            return { success: false, error: purchasesError.message || "Purchase failed" }
        }
      }

      return { success: false, error: "An unexpected error occurred" }
    }
  }

  // Restore purchases
  async restorePurchases(): Promise<{
    success: boolean
    customerInfo?: CustomerInfo
    error?: string
  }> {
    try {
      const { customerInfo } = await Purchases.restorePurchases()

      const entitlements = customerInfo.entitlements.active
      const hasActiveSubscription = Object.keys(entitlements).length > 0

      if (hasActiveSubscription) {
        console.log("Purchases restored successfully:", customerInfo)
        return { success: true, customerInfo }
      } else {
        return { success: false, error: "No active subscriptions found to restore" }
      }
    } catch (error) {
      console.error("Error restoring purchases:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to restore purchases",
      }
    }
  }

  // Get customer info
  async getCustomerInfo(): Promise<CustomerInfo | null> {
    try {
      const customerInfo = await Purchases.getCustomerInfo()
      return customerInfo
    } catch (error) {
      console.error("Error getting customer info:", error)
      return null
    }
  }

  // Check if user has active subscription
  async hasActiveSubscription(): Promise<boolean> {
    try {
      const customerInfo = await this.getCustomerInfo()
      if (!customerInfo) return false

      const entitlements = customerInfo.entitlements.active
      return Object.keys(entitlements).length > 0
    } catch (error) {
      console.error("Error checking subscription status:", error)
      return false
    }
  }

  // Convert RevenueCat customer info to our subscription details
  convertToSubscriptionDetails(customerInfo: CustomerInfo): SubscriptionDetails | null {
    try {
      const entitlements = customerInfo.entitlements.active
      const entitlementKeys = Object.keys(entitlements)

      if (entitlementKeys.length === 0) return null

      const entitlement = entitlements[entitlementKeys[0]]
      const productId = entitlement.productIdentifier

      // Determine plan type based on product identifier
      let plan: "weekly" | "annual" = "weekly"
      if (productId.includes("annual") || productId.includes("year")) {
        plan = "annual"
      }

      return {
        productId,
        plan,
        isTrialPeriod: entitlement.isActive && entitlement.willRenew && entitlement.periodType === "trial",
        expirationDate: new Date(entitlement.expirationDate),
        originalTransactionDate: new Date(entitlement.originalPurchaseDate),
        purchaseDate: new Date(entitlement.latestPurchaseDate),
      }
    } catch (error) {
      console.error("Error converting subscription details:", error)
      return null
    }
  }

  // Set user ID
  async setUserId(userId: string): Promise<void> {
    try {
      await Purchases.logIn(userId)
      console.log("User ID set successfully:", userId)
    } catch (error) {
      console.error("Error setting user ID:", error)
    }
  }

  // Log out user
  async logOut(): Promise<void> {
    try {
      await Purchases.logOut()
      console.log("User logged out successfully")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }
}

export const revenueCatService = new RevenueCatService()
