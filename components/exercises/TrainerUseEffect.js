import React, { useState, useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import play from '../../public/json/play_1.json'

export default function TrainerUseEffect() {
  const recognition = new SpeechRecognition.getRecognition()
  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  const songs = [
    'https://raw.githubusercontent.com/userNikolai/audio/main/play_1.mp3',
    'https://raw.githubusercontent.com/userNikolai/audio/main/play_2.mp3',
    'https://raw.githubusercontent.com/userNikolai/audio/main/play_3.mp3',
    'https://raw.githubusercontent.com/userNikolai/audio/main/play_4.mp3',
    'https://raw.githubusercontent.com/userNikolai/audio/main/play_5.mp3',
    'https://raw.githubusercontent.com/userNikolai/audio/main/play_6.mp3',
    'https://raw.githubusercontent.com/userNikolai/audio/main/play_7.mp3',
    // 'https://raw.githubusercontent.com/NikolaiB/audiot/master/play5.mp3',
  ]
  const [message, setMessage] = useState([])
  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const items = (
    <ul>
      {message?.map((n) =>
        n.flag == true ? (
          <li key={n.currentSong}>{n.value} right</li>
        ) : (
          <li key={n.currentSong}>{n.value} wrong</li>
        ),
      )}
    </ul>
  )

  const [song] = useState(typeof Audio !== 'undefined' && new Audio())

  useEffect(() => {
    if (!isPlaying) {
      console.log('Starting to play')
      // add your event listener here to wait for song to end and start speech recognition
    } else {
      console.log('When stop is clicked: ' + isPlaying)
      // stop your speech recognition here
    }

    return () => {
      // this is a cleanup function - you can use it to remove event listeners so you don't add them twice
    }
  }, [isPlaying])

  useEffect(() => {
    console.log('------------------Play Song')

    // setIsPlaying(isPlaying)
    // if (listening) {
    //   SpeechRecognition.stopListening()
    //   console.log('isPlaying: ' + isPlaying)
    //   // setIsPlaying(true)
    // }
    if (isPlaying) {
      console.log('enter if')
      song.src = songs[currentSong]
      song.play()

      song.addEventListener('ended', () => {
        SpeechRecognition.startListening()
        console.log('start listening')
      })
      if (isPlaying === false) {
        recognition.addEventListener('audioend', () => {
          console.log('isPlaying: ' + isPlaying)
          console.log('Set next song')
          setCurrentSong(currentSong++)
          if (currentSong >= songs.length) return
          song.src = songs[currentSong]
          song.play()
        })
      }
    } else {
      console.log('When stop is clicked: ' + isPlaying)
      SpeechRecognition.stopListening()
    }
    return () => {
      // this is a cleanup function - you can use it to remove event listeners so you don't add them twice
      recognition.removeEventListener('audioend', () => {
        console.log('Remove Event')
        setCurrentSong(currentSong++)
        if (currentSong >= songs.length) return
        song.src = songs[currentSong]
        song.play()
      })
    }
  }, [isPlaying])
  // } else {
  //   song.src = songs[currentSong]
  //   song.pause()
  //   setCurrentSong(0)
  //   setMessage(() => [])

  //   console.log(message)
  // }

  // function playNextSong() {
  //   setCurrentSong(currentSong++)
  //   console.log('Set next song')
  //   if (currentSong >= songs.length) return
  //   song.src = songs[currentSong]
  //   song.play()
  // }

  useEffect(() => {
    // console.log('------------------useEffect')
    if (
      finalTranscript !== '' &&
      message.findIndex((item) => item.value == play.verbs[currentSong].text) ==
        -1
    ) {
      // console.log('FT outside FOR ' + finalTranscript.toLowerCase())
      // console.log(message)

      for (let i = 0; i < play.verbs[currentSong].valid.length; i++) {
        // console.log('FT inside FOR ' + finalTranscript.toLowerCase())
        if (
          play.verbs[currentSong].valid[i] === finalTranscript.toLowerCase()
        ) {
          // console.log('right ' + play.verbs[currentSong].text)
          setMessage([
            ...message,
            {
              key: currentSong,
              value: play.verbs[currentSong].text,
              flag: true,
            },
          ])
          break
        } else {
          // console.log('wrong ' + play.verbs[currentSong].text)
          setMessage([
            ...message,
            {
              key: currentSong,
              value: play.verbs[currentSong].text,
              flag: false,
            },
          ])
        }
      }
    }
  }, [finalTranscript, currentSong])

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      {/* <button id="btnPlay" onClick={playSong}>
        Play
      </button> */}
      <button
        id="btnPlay"
        onClick={() => setIsPlaying(!isPlaying)}
        type="button"
        className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs 
        leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg
         focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      {/* <button
        id="btnPlay"
        onClick={playSong}
        type="button"
        className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs 
        leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg
         focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button> */}
      <div>{items}</div>
    </div>
  )
}
