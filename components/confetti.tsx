"use client"

import { useEffect, useState, useCallback } from "react"

interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
  size: number
  duration: number
}

const COLORS = ["#F97316", "#EAB308", "#38BDF8", "#F97316", "#FFFFFF", "#CD7F32"]

export function Confetti({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  const createPieces = useCallback(() => {
    const newPieces: ConfettiPiece[] = Array.from({ length: 40 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.5,
      size: Math.random() * 6 + 4,
      duration: Math.random() * 1.5 + 1.5,
    }))
    setPieces(newPieces)
    setTimeout(() => setPieces([]), 3500)
  }, [])

  useEffect(() => {
    if (trigger) {
      createPieces()
    }
  }, [trigger, createPieces])

  if (pieces.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: "-10px",
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  )
}
