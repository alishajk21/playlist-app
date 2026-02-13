import { useEffect, useRef, useState } from "react";
import "./App.css";
import cassette from "./assets/cassette.png";
import { Tooltip } from "react-tooltip";
import song1 from "./assets/song1.mp3";
import song2 from "./assets/song2.mp3";
import song3 from "./assets/song3.mp3";
import song4 from "./assets/song4.mp3";
import song5 from "./assets/song5.mp3";
import song6 from "./assets/song6.mp3";

import NoteDialog from "./components/NoteDialog";

const songs = [
  {
    file: song1,
    message: "This one takes me back to our little moments 💙",
  },
  {
    file: song2,
    message: "This one makes me feel like I'm your Devi ✨",
  },
  {
    file: song3,
    message:
      "This one is special because you once said it reminds you of me 😌",
  },
  {
    file: song4,
    message: "This one is special, we began 2026 with this playing 🌧",
  },
  {
    file: song5,
    message: "This one just makes me smile thinking about us 🌠",
  },
  {
    file: song6,
    message: "This one feels like the future we keep dreaming about 💫",
  },
];
export default function App() {
  const audioRef = useRef(null);
  const [showNote, setShowNote] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(
    songs[Math.floor(Math.random() * songs.length)],
  );
  const playPause = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const rewind = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };
  const resetSong = () => {
    setFade(true);

    setTimeout(() => {
      const random = songs[Math.floor(Math.random() * songs.length)];
      setCurrentSong(random);
      setFade(false);
    }, 300);

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };
  useEffect(() => {
    const audio = audioRef.current;
    audio.onended = () => setIsPlaying(false);
  }, []);

  return (
    <>
      {showNote && (
        <NoteDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setShowNote={setShowNote}
        />
      )}
      <div className="container">
        <h1 className="title">midnight tape 💙</h1>
        <p className={`song-message ${fade ? "fade-out" : ""}`}>
          {currentSong.message}
        </p>{" "}
        <div className={`cassette ${isPlaying ? "playing" : ""}`}>
          <img src={cassette} alt="cassette" onClick={playPause} />
        </div>
        <div className="controls">
          <button
            onClick={rewind}
            data-tooltip-id="music-tooltip"
            data-tooltip-content="Rewind"
          >
            ⏪
          </button>
          <button
            onClick={playPause}
            data-tooltip-id="music-tooltip"
            data-tooltip-content={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            onClick={resetSong}
            data-tooltip-id="music-tooltip"
            data-tooltip-content="New Song"
          >
            🔄
          </button>
          <Tooltip id="music-tooltip" />
        </div>
        <audio ref={audioRef} src={currentSong.file} />{" "}
      </div>
    </>
  );
}
