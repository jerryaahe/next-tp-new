'use client'

import { useEffect, useState } from 'react'
import { createStore } from '@/redux'

type State = { count: number }
type Action = { type: 'increment' } | { type: 'decrement' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
  }
}

const store = createStore(reducer, { count: 0 })

export default function Counter() {
  const [count, setCount] = useState(store.getState().count)

  useEffect(() => {
    return store.subscribe(() => setCount(store.getState().count))
  }, [])

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => store.dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => store.dispatch({ type: 'decrement' })}>-</button>
    </div>
  )
}
