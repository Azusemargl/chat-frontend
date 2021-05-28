import React from "react"
import { Link } from 'react-router-dom'
import className from "classnames"
import { Avatar, Time } from ".."
import { convertCurrentTime } from '../../utils/helpers'
import readed from "../../assets/img/readed.svg"
import noreaded from "../../assets/img/noreaded.svg"
import play from "../../assets/img/play.svg"
import pause from "../../assets/img/pause.svg"
import wave from "../../assets/img/wave.svg"
import "./Message.scss"
import { Messages } from "../../types/message.type"

export const Message: React.FC<Messages> = ({
  user,
  date,
  message,
  audio,
  attachments,
  isReaded,
  isTyping,
  isMe,
}) => {
  const MessageAudio: React.FC<AudioProps> = ({ audioSrc }) => {
    const [isPlay, setPlay] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [currentTime, setCurrentTime] = React.useState(0)

    const audioElem = React.useRef<HTMLAudioElement>(null)

    React.useEffect(() => {
      audioElem.current?.addEventListener('playing', () => {
        setPlay(true)
      }, false)
      audioElem.current?.addEventListener('pause', () => {
        setPlay(false)
      }, false)
      audioElem.current?.addEventListener('ended', () => {
        setPlay(false)
        setProgress(0)
        setCurrentTime(0)
      }, false)
      audioElem.current?.addEventListener('timeupdate', () => {
        const duration = (audioElem.current && audioElem.current.duration) || 0
        const isAudio = audioElem?.current?.currentTime || 0
        setCurrentTime(isAudio)
        setProgress((isAudio / duration) * 100)
      })
    }, [])

    const togglePlay = () => {
      if (!isPlay) {
        audioElem.current?.play()
      } else {
        audioElem.current?.pause()
      }
    }

    return (
      <div className="message__audio">
        <div className="message__player-block">
            <audio ref={audioElem} src={audioSrc} preload="auto" />
            <div className="message__audio-btn">
              <button onClick={togglePlay}>
                  {!isPlay
                    ? <img src={play} alt="play" style={{ marginLeft: 2 }} />
                    : <img src={pause} alt="pause" />
                  }
              </button>
            </div>
            <div className="message__audio-process">
              <img src={wave} alt="process"/>
            </div>
            <div className="message__audio-duration">
              <span>{convertCurrentTime(currentTime)}</span>
            </div>
        </div>
        <div className="message__audio-progress" style={{ width: `${progress}%` }}></div>
      </div>
    )
  }

  return (
    <div
      className={className(
        "message",
        { "message--isme": isMe },
        { "message--istyping": isTyping },
        { "message--audio": audio },
        { "message--image": attachments && attachments.length === 1 }
      )}
    >
      {isMe ? (
        <div className="message__check">
          {isReaded ? (
            <img className="message__readed" src={readed} alt="" />
          ) : (
            <img className="message__readed" src={noreaded} alt="" />
          )}
        </div>
      ) : (
        <div className="message__avatar">
          <Link to={`/im/user/${user._id}`}><Avatar user={user} /></Link>
        </div>
      )}

      <div className="message__content">
        {(message || audio || isTyping) && (
          <div className="message__bubble message__item">
            {message && <p className="message__text">{message}</p>}
            {isTyping && (
              <div className="message__typing">
                <div className="dot-flashing"></div>
              </div>
            )}
            {audio && <MessageAudio audioSrc={audio} />}
          </div>
        )}

        {attachments && (
          <div className="message__attachments message__item">
            {attachments.map((el) => {
              return (
                <div className="message__attachments-item" key={el.url}>
                  <img src={el.url} alt={el.name} />
                </div>
              );
            })}
          </div>
        )}

        {date && <Time date={date} />}
      </div>
    </div>
  )
}

export default Message

// Types
type AudioProps = {
  audioSrc: string 
}