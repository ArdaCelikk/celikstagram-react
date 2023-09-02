import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, deneme } from '../redux/counterSlice'

export default function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment 1"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement 1"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button> <br /> <br />
        <span>test: <button onClick={() => dispatch(deneme("test"))} className='bg-blue-400'>Test</button></span>
      </div>
    </div>
  )
}