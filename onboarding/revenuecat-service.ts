import Purchases, { type PurchasesPackage } from "react-native-purchases"

// Initialize RevenueCat
export const initializeRevenueCat = (apiKey: string) => {
  Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG)
  Purchases.configure({
    apiKey,
    appUserID: null, // Let RevenueCat generate a user ID
    observerMode: false,
    userDefaultsSuiteName: null,
  })
}

// Get current user ID
export const getRevenueCatUserId = async (): Promise<string> => {
  try {
    const { customerInfo } = await Purchases.getCustomerInfo()
    return customerInfo.originalAppUserId
  } catch (error) {
    console.error("Error getting RevenueCat user ID:", error)
    throw error
  }
}

// Get available packages
export const getAvailablePackages = async (): Promise<PurchasesPackage[]> => {
  try {
    const offerings = await Purchases.getOfferings()

    if (!offerings.current) {
      throw new Error("No offerings available")
    }

    return offerings.current.availablePackages
  } catch (error) {
    console.error("Error getting available packages:", error)
    throw error
  }
}

// Purchase package
export const purchasePackage = async (pkg: PurchasesPackage): Promise<boolean> => {
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg)

    // Check if user has active subscription
    const entitlements = customerInfo.entitlements.active
    return Object.keys(entitlements).length > 0
  } catch (error) {
    console.error("Error purchasing package:", error)
    throw error
  }
}

// Restore purchases
export const restorePurchases = async (): Promise<boolean> => {
  try {
    const { customerInfo } = await Purchases.restorePurchases()

    // Check if user has active subscription
    const entitlements = customerInfo.entitlements.active
    return Object.keys(entitlements).length > 0
  } catch (error) {
    console.error("Error restoring purchases:", error)
    throw error
  }
}

// Check if user has active subscription
export const checkSubscriptionStatus = async (): Promise<boolean> => {
  try {
    const { customerInfo } = await Purchases.getCustomerInfo()
    const entitlements = customerInfo.entitlements.active
    return Object.keys(entitlements).length > 0
  } catch (error) {
    console.error("Error checking subscription status:", error)
    throw error
  }
}
