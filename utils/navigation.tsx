"use client"

import React, { createContext, useContext } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

// Navigation context
type NavigationContextType = {
  navigate: (name: string, params?: Record<string, any>) => void
  goBack: () => void
  replace: (name: string, params?: Record<string, any>) => void
  reset: (state: { routes: { name: string; params?: Record<string, any> }[] }) => void
  setParams: (params: Record<string, any>) => void
  addListener: (event: string, callback: () => void) => () => void
  getState: () => any
  getParam: (paramName: string, defaultValue?: any) => any
  isFocused: () => boolean
  dispatch: (action: any) => void
  dangerouslyGetParent: () => any
  dangerouslyGetState: () => any
  setOptions: (options: any) => void
}

const NavigationContext = createContext<NavigationContextType | null>(null)

// Route params context
type RouteContextType = {
  params: Record<string, any>
  name: string
  key: string
}

const RouteContext = createContext<RouteContextType>({
  params: {},
  name: "",
  key: "",
})

// Navigation container
export function NavigationContainer({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Parse search params into route params
  const params = Object.fromEntries(searchParams?.entries() || [])

  // Extract screen name from pathname
  const name = pathname?.split("/").filter(Boolean).pop() || "Home"

  // Create a unique key for the route
  const key = `${name}-${Date.now()}`

  const navigationValue: NavigationContextType = {
    navigate: (name, params = {}) => {
      const queryString = new URLSearchParams(params as Record<string, string>).toString()
      router.push(`/${name}${queryString ? `?${queryString}` : ""}`)
    },
    goBack: () => {
      router.back()
    },
    replace: (name, params = {}) => {
      const queryString = new URLSearchParams(params as Record<string, string>).toString()
      router.replace(`/${name}${queryString ? `?${queryString}` : ""}`)
    },
    reset: (state) => {
      if (state.routes.length > 0) {
        const { name, params = {} } = state.routes[0]
        const queryString = new URLSearchParams(params as Record<string, string>).toString()
        router.replace(`/${name}${queryString ? `?${queryString}` : ""}`)
      }
    },
    setParams: (newParams) => {
      const mergedParams = { ...params, ...newParams }
      const queryString = new URLSearchParams(mergedParams as Record<string, string>).toString()
      router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`)
    },
    addListener: (event, callback) => {
      // Simple implementation that doesn't actually listen to events
      return () => {}
    },
    getState: () => ({
      routes: [{ name, params, key }],
      index: 0,
    }),
    getParam: (paramName, defaultValue) => {
      return params[paramName] !== undefined ? params[paramName] : defaultValue
    },
    isFocused: () => true,
    dispatch: () => {},
    dangerouslyGetParent: () => null,
    dangerouslyGetState: () => ({
      routes: [{ name, params, key }],
      index: 0,
    }),
    setOptions: () => {},
  }

  const routeValue: RouteContextType = {
    params,
    name,
    key,
  }

  return (
    <NavigationContext.Provider value={navigationValue}>
      <RouteContext.Provider value={routeValue}>{children}</RouteContext.Provider>
    </NavigationContext.Provider>
  )
}

// Navigation hooks
export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationContainer")
  }
  return context
}

export function useRoute() {
  const context = useContext(RouteContext)
  if (!context) {
    throw new Error("useRoute must be used within a NavigationContainer")
  }
  return context
}

// Screen component
export function Screen({
  name,
  component: Component,
  options = {},
}: {
  name: string
  component: React.ComponentType<any>
  options?: any
}) {
  const pathname = usePathname()
  const currentScreen = pathname?.split("/").filter(Boolean).pop() || "Home"

  if (currentScreen !== name) {
    return null
  }

  return <Component />
}

// Stack navigator
export function createStackNavigator() {
  return {
    Navigator: ({ initialRouteName, children }: { initialRouteName: string; children: React.ReactNode }) => {
      return <>{children}</>
    },
    Screen,
  }
}

// Tab navigator
export function createBottomTabNavigator() {
  return {
    Navigator: ({
      initialRouteName,
      children,
      screenOptions,
    }: {
      initialRouteName: string
      children: React.ReactNode
      screenOptions?: any
    }) => {
      const pathname = usePathname()
      const currentScreen = pathname?.split("/").filter(Boolean).pop() || "Home"

      // Extract screens from children
      const screens = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === Screen,
      ) as React.ReactElement[]

      return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-white border-t border-gray-200 h-16 z-10">
          {screens.map((screen) => {
            const name = screen.props.name
            const options = screen.props.options || {}
            const Icon = options.tabBarIcon ? options.tabBarIcon({ focused: currentScreen === name }) : null
            const label = options.tabBarLabel || name

            return <TabButton key={name} name={name} label={label} icon={Icon} active={currentScreen === name} />
          })}
        </div>
      )
    },
    Screen,
  }
}

// Tab button component
function TabButton({
  name,
  label,
  icon,
  active,
}: {
  name: string
  label: string
  icon: React.ReactNode
  active: boolean
}) {
  const { navigate } = useNavigation()

  return (
    <button
      className={`flex flex-col items-center justify-center flex-1 py-1 ${active ? "text-primary" : "text-gray-500"}`}
      onClick={() => navigate(name)}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  )
}
