"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function NotFoundImproved() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Positions for the circular cutouts
  const holePositions = [
    { top: "10%", left: "15%", size: "25px" },
    { top: "20%", left: "80%", size: "20px" },
    { top: "30%", left: "40%", size: "18px" },
    { top: "50%", left: "10%", size: "22px" },
    { top: "60%", left: "85%", size: "24px" },
    { top: "75%", left: "30%", size: "16px" },
    { top: "85%", left: "60%", size: "20px" },
    { top: "15%", left: "60%", size: "15px" },
    { top: "40%", left: "70%", size: "18px" },
    { top: "65%", left: "50%", size: "22px" },
    { top: "25%", left: "25%", size: "20px" },
    { top: "45%", left: "90%", size: "16px" },
    { top: "70%", left: "15%", size: "18px" },
    { top: "80%", left: "40%", size: "15px" },
    { top: "5%", left: "45%", size: "20px" },
  ]

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #3df5e4 0%, #5ac8fa 50%, #d472ff 100%)",
      }}
    >
      <div className="relative bg-gray-100 rounded-xl shadow-xl p-8 w-full max-w-5xl mx-auto overflow-hidden">
        {/* Create circular cutouts */}
        {holePositions.map((hole, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: hole.size,
              height: hole.size,
              top: hole.top,
              left: hole.left,
              background: "rgba(220, 220, 220, 0.9)",
              boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          />
        ))}

        <div className="text-center z-10 relative py-8">
          <h1 className="text-2xl font-bold mb-2">Whoa, you&apos;ve traveled too far...</h1>
          <p className="text-gray-600 mb-10">The page is lost, sorry.</p>

          {/* 3D 404 text */}
          <div className="flex justify-center items-center my-12">
            <div className="relative h-[150px] w-[320px]">
              {/* First 4 */}
              <div
                className="absolute left-0 top-0 w-[130px] h-[190px] flex items-center justify-center"
                style={{
                  transform: "perspective(500px) rotateY(-15deg) translateZ(20px)",
                  background: "linear-gradient(135deg, #ff56f6 0%, #b936ee 100%)",
                  borderRadius: "10px",
                  boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
                  fontSize: "130px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                4
              </div>

              {/* 0 */}
              <div
                className="absolute left-[110px] top-0 w-[130px] h-[190px] flex items-center justify-center"
                style={{
                  transform: "perspective(800px) translateZ(40px)",
                  background: "linear-gradient(135deg, #3df5e4 0%, #3498db 100%)",
                  borderRadius: "10px",
                  boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
                  fontSize: "130px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                0
              </div>

              {/* Second 4 */}
              <div
                className="absolute left-[220px] top-0 w-[130px] h-[190px] flex items-center justify-center"
                style={{
                  transform: "perspective(500px) rotateY(15deg) translateZ(20px)",
                  background: "linear-gradient(135deg, #ff56f6 0%, #b936ee 100%)",
                  borderRadius: "10px",
                  boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
                  fontSize: "130px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                4
              </div>
            </div>
          </div>

          <div className="text-center mt-16 border-t border-gray-300 pt-6">
            <Link href="/" className="inline-block border-b border-black pb-1 hover:opacity-70 transition-opacity">
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}