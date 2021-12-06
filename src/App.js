import { useState } from 'react';
import Song from './components/Song/Song';
import Player from './components/Player/Player';
import data from './util';
function App() {
  // !States
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  return (
    <div>
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} />
    </div>
  );
}

export default App;
