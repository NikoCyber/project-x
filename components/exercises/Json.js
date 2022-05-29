import { useState } from 'react'

export default function Timeout() {
  const [message, setMessage] = useState([1])
  const Markup = (
    <ul>
      {message?.map((n) => (
        <li>{n}</li>
      ))}
    </ul>
  )
  // const onStart = () => {
  setTimeout(() => {
    if (message.length <= 9) {
      setMessage([...message, message[message.length - 1] + 1])
    }
  }, 1000)
  // }

  return (
    <div>
      <button onClick={() => setMessage([])}>Clean</button>
      <div>{Markup}</div>
    </div>
  )
}
