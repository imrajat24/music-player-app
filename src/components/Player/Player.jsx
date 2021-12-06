import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
const Player = ({ currentSong }) => {
  // !Refs
  const audioRef = useRef(null);

  // ! States
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  // !EventHandlers
  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const updateTimeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    console.log(audioRef);
  };

  // ! Functionalaity Defined

  const timeConversion = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{timeConversion(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          type="range"
          onChange={dragHandler}
        />
        <p>{timeConversion(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon size="2x" icon={faAngleRight} />
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
