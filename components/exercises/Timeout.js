import React, { useState, useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

import play from '../../public/json/play_1.json'
import read from '../../public/json/read_1.json'

export default function Recognition() {
  const recognition = new SpeechRecognition.getRecognition()
  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  const [message, setMessage] = useState([])
  const [currentSong, setCurrentSong] = useState(0)
  const [verb, setVerb] = useState('')
  const [jsonSong, setJsonSong] = useState()
  const [playingBtnName, setPlayingBtnName] = useState('')

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  function playVerb() {
    setPlayingBtnName('play')
    setJsonSong(play)
    setVerb('play')
    playSong('play')
  }

  function readVerb() {
    setPlayingBtnName('read')
    setJsonSong(read)
    setVerb('read')
    playSong('read')
  }

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

  function playSong(verb) {
    const songs = [
      `https://raw.githubusercontent.com/userNikolai/${verb}_pres_s/main/${verb}_1.mp3`,
      `https://raw.githubusercontent.com/userNikolai/${verb}_pres_s/main/${verb}_2.mp3`,
      `https://raw.githubusercontent.com/userNikolai/${verb}_pres_s/main/${verb}_3.mp3`,
      `https://raw.githubusercontent.com/userNikolai/${verb}_pres_s/main/${verb}_4.mp3`,
      `https://raw.githubusercontent.com/userNikolai/${verb}_pres_s/main/${verb}_5.mp3`,
      `https://raw.githubusercontent.com/userNikolai/${verb}_pres_s/main/${verb}_6.mp3`,
      `https://raw.githubusercontent.com/userNikolai/${verb}_pres_s/main/${verb}_7.mp3`,
      // 'https://raw.githubusercontent.com/NikolaiB/audiot/master/play5.mp3',
    ]
    SpeechRecognition.stopListening()
    song.src = songs[currentSong]
    song.pause()
    setCurrentSong(0)
    setMessage([])

    if (playingBtnName !== 'Stop') {
      song.src = songs[currentSong]
      song.play()
      song.addEventListener('ended', () => {
        SpeechRecognition.startListening()
      })
      recognition.addEventListener('audioend', () => {
        setCurrentSong(currentSong++)
        if (currentSong >= songs.length) return
        song.src = songs[currentSong]
        song.play()
      })
    } else {
      SpeechRecognition.stopListening()
      song.src = songs[currentSong]
      song.pause()
      setMessage([])
      setCurrentSong(0)
      console.log(message)
    }
  }

  useEffect(() => {
    if (
      finalTranscript !== '' &&
      message.findIndex(
        (item) => item.value == jsonSong.verbs[currentSong].text,
      ) == -1
    ) {
      // console.log('------------------useEffect')
      // console.log('FT outside FOR ' + finalTranscript.toLowerCase())
      // console.log(message)

      for (let i = 0; i < jsonSong.verbs[currentSong].valid.length; i++) {
        // console.log('FT inside FOR ' + finalTranscript.toLowerCase())
        if (
          jsonSong.verbs[currentSong].valid[i] === finalTranscript.toLowerCase()
        ) {
          // console.log('right ' + play.verbs[currentSong].text)
          setMessage([
            ...message,
            {
              key: currentSong,
              value: jsonSong.verbs[currentSong].text,
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
              value: jsonSong.verbs[currentSong].text,
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
      <div className="space-x-1.5 flex">
        <button
          id="btnPlay"
          onClick={playVerb}
          type="button"
          className="btn-trainer"
        >
          {playingBtnName === 'play' ? 'Stop' : 'Play'}
        </button>
        <button
          id="btnRead"
          onClick={readVerb}
          type="button"
          className="btn-trainer"
        >
          {playingBtnName === 'read' ? 'Stop' : 'Read'}
        </button>
      </div>
      <div>{items}</div>
    </div>
  )
}
