import React, { FC, useEffect, useState } from "react";
import "./App.css";
import { formatTime, generateId, padNum } from "./lib/helpers";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type ReplayData = {
  display: string | number;
  value: string;
  id: number;
};

function App() {
  const [replayData, setReplayData] = useState<ReplayData[]>([]);
  const [replayFinal, setReplayFinal] = useState<ReplayData>({
    id: generateId(),
    display: "",
    value: "",
  });

  const generateRow = (rows: number) => {
    const newRow = new Array(rows)
      .fill(1)
      .map(() => ({ id: generateId(), display: "", value: "" }));
    setReplayData([...replayData, ...newRow] as ReplayData[]);
  };

  useEffect(() => {
    generateRow(2);
  }, []);

  const handleAddNewRow = () => {
    generateRow(2);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const newValue = event.target.value;

    const updated = replayData.reduce((arr, row) => {
      if (row.id === id) {
        arr.push({
          id: id,
          value: padNum(newValue),
          display: formatTime(padNum(newValue)),
        });
      } else {
        arr.push(row);
      }
      return arr;
    }, [] as ReplayData[]);
    setReplayData(updated);
  };

  const handleChangeFinal = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const newValue = event.target.value;
    const updated = {
      ...replayFinal,
      value: padNum(newValue),
      display: formatTime(padNum(newValue)),
    };
    setReplayFinal(updated);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: 20,
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <TextField fullWidth name="replay_name" placeholder="Replay name" />
        <Button
          onClick={handleAddNewRow}
          variant="contained"
          color="secondary"
          style={{ whiteSpace: "nowrap" }}
        >
          Add row
        </Button>
      </div>
      <ReplayField row={replayFinal} handleChange={handleChangeFinal} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {replayData.map((row) => (
          <ReplayField row={row} handleChange={handleChange} />
        ))}
      </div>
    </div>
  );
}

type ReplayFieldProps = {
  row: ReplayData;
  handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ): void;
};

const ReplayField: FC<ReplayFieldProps> = ({ row, handleChange }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 70px",
        gap: "10px",
      }}
    >
      <TextField
        type="number"
        placeholder="Replay"
        name={`replay_${row.id}`}
        defaultValue={row.value}
        onBlur={(event) => handleChange(event, row.id)}
      />
      <TextField disabled value={`=${row.display}`} />
    </div>
  );
};

export default App;
