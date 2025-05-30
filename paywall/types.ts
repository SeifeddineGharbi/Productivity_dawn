export interface PaywallProps {
  onPurchaseSuccess: (subscription: SubscriptionDetails) => void
  onClose?: () => void
  source?: string // For analytics tracking
}

export interface SubscriptionDetails {
  productId: string
  plan: "weekly" | "annual"
  isTrialPeriod: boolean
  expirationDate: Date
  originalTransactionDate: Date
  purchaseDate: Date
}

export interface RevenueCatPackage {
  identifier: string
  packageType: string
  product: {
    identifier: string
    description: string
    title: string
    price: number
    priceString: string
    currencyCode: string
    introPrice?: {
      price: number
      priceString: string
      period: string
      cycles: number
      periodUnit: string
    }
  }
  offeringIdentifier: string
}

export interface PurchaseState {
  isLoading: boolean
  error: string | null
  isRestoring: boolean
  purchasingPackage: string | null
}

export interface PaywallFeature {
  id: string
  text: string
  icon: string
}

export interface PricingPlan {
  id: string
  title: string
  price: string
  period: string
  savings?: string
  trial?: string
  isPopular: boolean
  packageIdentifier: string
  ctaText: string
}
