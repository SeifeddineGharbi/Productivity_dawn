import { initializeApp } from "firebase/app"
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"
import { getAnalytics, logEvent } from "firebase/analytics"
import type { OnboardingData, Answer } from "./types"

// Initialize Firebase (you'll need to replace with your config)
const firebaseConfig = {
  // Your Firebase config here
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const analytics = getAnalytics(app)

export const firebaseService = {
  // Create a new onboarding session
  createOnboardingSession: async (userId: string): Promise<string> => {
    try {
      const onboardingRef = doc(collection(db, "onboarding"))
      const onboardingData: OnboardingData = {
        id: onboardingRef.id,
        userId,
        completed: false,
        currentStep: 0,
        startedAt: new Date(),
        answers: {},
      }

      await setDoc(onboardingRef, {
        ...onboardingData,
        startedAt: serverTimestamp(),
      })

      // Log analytics event
      logEvent(analytics, "onboarding_started", {
        user_id: userId,
      })

      return onboardingRef.id
    } catch (error) {
      console.error("Error creating onboarding session:", error)
      throw error
    }
  },

  // Get existing onboarding session or create new one
  getOrCreateOnboardingSession: async (userId: string): Promise<OnboardingData> => {
    try {
      // Check if user has an incomplete session
      const onboardingQuery = query(
        collection(db, "onboarding"),
        where("userId", "==", userId),
        where("completed", "==", false),
      )

      const querySnapshot = await getDocs(onboardingQuery)

      if (!querySnapshot.empty) {
        // Return the first incomplete session
        const doc = querySnapshot.docs[0]
        return { id: doc.id, ...doc.data() } as OnboardingData
      }

      // Create new session if none exists
      const sessionId = await firebaseService.createOnboardingSession(userId)
      const sessionDoc = await getDoc(doc(db, "onboarding", sessionId))

      return { id: sessionId, ...sessionDoc.data() } as OnboardingData
    } catch (error) {
      console.error("Error getting/creating onboarding session:", error)
      throw error
    }
  },

  // Update answer for a specific question
  saveAnswer: async (sessionId: string, questionId: string, answer: Answer): Promise<void> => {
    try {
      const onboardingRef = doc(db, "onboarding", sessionId)

      await updateDoc(onboardingRef, {
        [`answers.${questionId}`]: answer,
      })

      // Log analytics event
      logEvent(analytics, "question_answered", {
        question_id: questionId,
        answer_type: typeof answer,
      })
    } catch (error) {
      console.error("Error saving answer:", error)
      throw error
    }
  },

  // Update current step
  updateCurrentStep: async (sessionId: string, step: number): Promise<void> => {
    try {
      const onboardingRef = doc(db, "onboarding", sessionId)

      await updateDoc(onboardingRef, {
        currentStep: step,
      })
    } catch (error) {
      console.error("Error updating current step:", error)
      throw error
    }
  },

  // Complete onboarding
  completeOnboarding: async (sessionId: string): Promise<void> => {
    try {
      const onboardingRef = doc(db, "onboarding", sessionId)

      await updateDoc(onboardingRef, {
        completed: true,
        completedAt: serverTimestamp(),
      })

      // Log analytics event
      logEvent(analytics, "onboarding_completed", {
        session_id: sessionId,
      })
    } catch (error) {
      console.error("Error completing onboarding:", error)
      throw error
    }
  },

  // Log analytics event
  logAnalyticsEvent: (eventName: string, params?: Record<string, any>): void => {
    logEvent(analytics, eventName, params)
  },
}
