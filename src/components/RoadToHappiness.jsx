'use client'

export default function RoadToHappiness() {
  const steps = [
    { text: 'Take the questionnaire', top: 150, left: 20 },
    { text: 'Talk to chatbot', top: 330, right: 20 },
    { text: 'Talk to volunteer', top: 500, left: 20 },
    { text: 'Take the professional helper', top: 670, right: 20 },
    { text: 'I am happy', top: 520, left: 20 },
  ]

  return (
    <div className="relative px-4 py-10 min-h-screen bg-white flex flex-col items-center">
      <h1 className="text-2xl font-bold">road to happiness starts here</h1>

      <div className="relative w-full max-w-4xl h-[700px]">

        {/* Zigzag Line */}
        <svg
          className="realtive top-0 left-1/2 -translate-x-1/2 h-full w-full"
          viewBox="0 0 400 700"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="black"
            strokeWidth="1"
            strokeDasharray="1,1"
            points="
                200,50
                50,100
                350,150
                50,200
                350,250
                200,300
            "
          />
        </svg>

        {/* Boxes with Manual Positions */}
        {steps.map((step, index) => (
          <div
            key={index}
            className="absolute z-10 bg-[#fdf6ec] border border-gray-300 px-6 py-4 rounded-md shadow-md w-64 text-center"
            style={{
              top: step.top,
              left: step.left !== undefined ? `${step.left}px` : undefined,
              right: step.right !== undefined ? `${step.right}px` : undefined,
            }}
          >
            {step.text}
          </div>
        ))}
      </div>
    </div>
  )
}
