import React from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { useState, useEffect } from 'react'

const Dictaphone = () => {
  const recognition = new SpeechRecognition.getRecognition()
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  const [song] = useState(typeof Audio !== 'undefined' && new Audio())
  const [isPlaying, setIsPlaying] = useState(false)
  const songUrl =
    'https://raw.githubusercontent.com/userNikolai/audio/main/play_1.mp3'

  useEffect(() => {
    if (isPlaying) {
      // console.log('Starting to play useEffect')
      // add your event listener here to wait for song to end and start speech recognition
      song.src = songUrl
      song.play()
      console.log('Song is playing: ' + isPlaying)
      song.addEventListener('ended', () => {
        console.log('Recognition is started: ' + isPlaying)
        SpeechRecognition.startListening()
      })
      if (isPlaying === false) {
        recognition.addEventListener('audioend', () => {
          console.log('Recognition is finished: ' + isPlaying)
        })
      }
    } else {
      console.log('When stop is clicked useEffect: ' + isPlaying)
      // stop your speech recognition here
      SpeechRecognition.stopListening()
    }

    return () => {
      // this is a cleanup function - you can use it to remove event listeners so you don't add them twice
      recognition.removeEventListener('audioend', () => {
        console.log('Remove eventlistener ' + isPlaying)
      })
    }
  }, [isPlaying])

  // function playSong(playingStatus) {
  //   setIsPlaying(playingStatus)
  //   if (listening) {
  //     SpeechRecognition.stopListening()
  //   }
  //   if (isPlaying === false) {
  //     song.src = songUrl
  //     song.play()
  //     console.log('Song is playing: ' + playingStatus)
  //     song.addEventListener('ended', () => {
  //       console.log('Recognition is started: ' + playingStatus)
  //       SpeechRecognition.startListening()
  //     })
  //     recognition.addEventListener('audioend', () => {
  //       console.log('Recognition is finished: ' + playingStatus)
  //     })
  //   } else {
  //     console.log('When stop is clicked: ' + playingStatus)
  //   }
  // }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      {/* <button onClick={resetTranscript}>Reset</button> */}
      <p>{transcript}</p>
    </div>
  )
}
export default Dictaphone
