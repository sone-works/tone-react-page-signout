'use client'

import { useState } from 'react'

interface IClientComponentProps {
  defaultText?: string
}

export default function ClientComponent({
  defaultText = 'Sup, universe?',
}: IClientComponentProps) {
  const [text, setText] = useState<string>(defaultText)

  return (
    <div>
      <p onClick={() => setText('Nothing much.')}>{text}</p>
    </div>
  )
}
