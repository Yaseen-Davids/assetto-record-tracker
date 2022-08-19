import { useState } from 'react';
import './App.css';

type Track = {
  [trackId: string]: {
    [colId: string]: { trackId: string; time: string; formatted: number; };
  };
};

function App() {
  const [tracks, setTracks] = useState<Track>({
    "12345": {
      "45678": { trackId: "45678", time: "00:00", formatted: 0 },
      "21332": { trackId: "21332", time: "00:00", formatted: 0 },
      "51232": { trackId: "51232", time: "00:00", formatted: 0 },
    },
  });
  const [subTracks, setSubTracks] = useState<Track>({
    "91012": {
      "12312": { trackId: "12312", time: "00:00", formatted: 0 },
      "75423": { trackId: "75423", time: "00:00", formatted: 0 },
    },
  });

  const generateId = () => {
    // not really random but good enough
    return (Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000).toString();
  };

  const handleAddTrack = () => {
    const newTracks = tracks;

    const newCols = new Array(3).fill(1).reduce((obj, _) => {
      const colId = generateId();
      obj[colId] = { trackId: colId, time: "00:00", formatted: 0 };
      return obj;
    }, {});

    newTracks[generateId()] = newCols;
    setTracks({ ...newTracks });
  };

  const handleChangeTrack = (trackId: string) => (colId: string, timeStr: string) => {
    const [minutes, seconds] = timeStr.split(":");
    const formatted = Number(minutes) * 60 + Number(seconds);

    const newTracks = tracks;
    newTracks[trackId] = {
      ...newTracks[trackId],
      [colId]: { ...newTracks[trackId][colId], time: timeStr, formatted: formatted },
    };
    setTracks({ ...newTracks });
  }

  const handleRemoveTrack = (trackId: string) => {
    const newTracks = tracks;
    delete newTracks[trackId];
    setTracks({ ...newTracks });
  }

  const handleAddSubTrack = () => {
    const newTracks = subTracks;

    const newCols = new Array(2).fill(1).reduce((obj, _) => {
      const colId = generateId();
      obj[colId] = { trackId: colId, time: "00:00", formatted: 0 };
      return obj;
    }, {});

    newTracks[generateId()] = newCols;
    setSubTracks({ ...newTracks });
  };

  const handleChangeSubTrack = (trackId: string) => (colId: string, timeStr: string) => {
    const [minutes, seconds] = timeStr.split(":");
    const formatted = Number(minutes) * 60 + Number(seconds);

    const newTracks = subTracks;
    newTracks[trackId] = {
      ...newTracks[trackId],
      [colId]: { ...newTracks[trackId][colId], time: timeStr, formatted: formatted },
    };
    setSubTracks({ ...newTracks });
  }

  const handleRemoveSubTrack = (trackId: string) => {
    const newTracks = subTracks;
    delete newTracks[trackId];
    setSubTracks({ ...newTracks });
  }

  return (
    <div className="App">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "50px" }}>
        <div>
          <h2>Final</h2>
          {/* <RowComp /> */}
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Tracks</h2>
            <div>
              <button onClick={handleAddTrack}>Add track</button>
            </div>
          </div>
          <div>
            {Object.keys(tracks).map((trackId: string) => (
              <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }} key={`track-${trackId}`}>
                {Object.keys(tracks[trackId]).map((colId: string) => (
                  <RowComp key={colId} handleChangeTrack={handleChangeTrack(trackId)} track={tracks[trackId][colId]} />
                ))}
                <div>
                  <button onClick={() => handleRemoveTrack(trackId)}>delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Sub Tracks</h2>
            <div>
              <button onClick={handleAddSubTrack}>Add sub track</button>
            </div>
          </div>
          <div>
            {Object.keys(subTracks).map((subTrackId: string) => (
              <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }} key={`track-${subTrackId}`}>
                {Object.keys(subTracks[subTrackId]).map((colId: string) => (
                  <RowComp key={colId} handleChangeTrack={handleChangeSubTrack(subTrackId)} track={subTracks[subTrackId][colId]} />
                ))}
                <div>
                  <button onClick={() => handleRemoveSubTrack(subTrackId)}>delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

type RowCompProps = {
  handleChangeTrack(colId: string, timeStr: string): void;
  name?: string | undefined;
  track: { trackId: string; time: string; formatted: number; };
};

const RowComp: React.FC<RowCompProps> = ({ name = undefined, handleChangeTrack, track }) => {
  return (
    <div>
      {name && <h4>{name}</h4>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 30px", alignItems: "center", gap: "20px" }}>
        <div>
          <input name="timeInput" defaultValue={track.time} onChange={(event) => handleChangeTrack(track.trackId, event.target.value)} type="time" style={{ width: "100px" }} />
        </div>
        <p style={{ lineHeight: "5px" }}>{track.formatted}</p>
      </div>
    </div>
  )
}

export default App
