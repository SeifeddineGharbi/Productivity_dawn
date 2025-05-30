import type { Answer, TimeValue } from "./types"

// Time validation function
export const validateTimes = (wakeTime: TimeValue, workStartTime: TimeValue): boolean => {
  const wakeMinutes = wakeTime.hour * 60 + wakeTime.minute
  const workMinutes = workStartTime.hour * 60 + workStartTime.minute

  if (workMinutes <= wakeMinutes) {
    throw new Error("Your work/study time cannot be earlier than your wake up time. Please select a later time.")
  }
  return true
}

// General validation function
export const validateAnswer = (
  type: string,
  value: Answer,
  required: boolean,
  validationRules?: any[],
  dependentValues?: Record<string, Answer>,
): string | null => {
  // Check if required
  if (required && (value === null || value === undefined || value === "")) {
    return "This field is required"
  }

  // Skip other validations if not required and empty
  if (!required && (value === null || value === undefined || value === "")) {
    return null
  }

  // If no validation rules, return null (valid)
  if (!validationRules || validationRules.length === 0) {
    return null
  }

  // Check each validation rule
  for (const rule of validationRules) {
    switch (rule.type) {
      case "min-length":
        if (typeof value === "string" && value.length < rule.value) {
          return rule.message
        }
        break

      case "time-after":
        if (
          rule.dependsOn &&
          dependentValues &&
          dependentValues[rule.dependsOn] &&
          typeof value === "object" &&
          value !== null &&
          "hour" in value &&
          "minute" in value
        ) {
          try {
            const dependentValue = dependentValues[rule.dependsOn] as TimeValue
            validateTimes(dependentValue, value as TimeValue)
          } catch (error) {
            return (error as Error).message
          }
        }
        break

      default:
        break
    }
  }

  return null
}
