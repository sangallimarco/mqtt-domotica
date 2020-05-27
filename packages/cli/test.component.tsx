import React, { useState, useEffect } from "react"

interface Payload {
  label: string
  counter: number
}

interface TestComponentProps {
  label: string
}

export const TestComponent: React.FC<TestComponentProps> = props => {
  const [current, setCurrent] = useState<Payload>({
    label: props.label,
    counter: 0
  })

  useEffect(() => {
    console.log(current)
  })

  function add() {
    const { counter } = current
    setCurrent({ ...current, counter: counter + 1, label: "ok" })
  }

  return (
    <div onClick={add}>
      {current.counter} {current.label}
    </div>
  )
}
