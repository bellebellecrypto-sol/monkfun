"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

interface ReduceMotionContextValue {
  reduceMotion: boolean
  setReduceMotion: (v: boolean) => void
}

const ReduceMotionContext = createContext<ReduceMotionContextValue>({
  reduceMotion: false,
  setReduceMotion: () => {},
})

export function useReduceMotion() {
  return useContext(ReduceMotionContext)
}

export function ReduceMotionProvider({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotionState] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("reduce-motion")
    if (stored === "true") {
      setReduceMotionState(true)
      document.documentElement.classList.add("reduce-motion")
    }
  }, [])

  const setReduceMotion = (v: boolean) => {
    setReduceMotionState(v)
    localStorage.setItem("reduce-motion", String(v))
    if (v) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ReduceMotionContext.Provider value={{ reduceMotion, setReduceMotion }}>
      {children}
    </ReduceMotionContext.Provider>
  )
}
