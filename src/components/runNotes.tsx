import { Chip, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { MultiButtonComponent } from "./MultiButtonComponent";
import { getApiRunsByUserId, putApiRun, putApiRunNotes } from "../api/runs";
import "../css/runs.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loadRuns } from "../redux/runsSlice";
import { useDispatch } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers";
import { ChooseDateComponent } from "./ChooseDateComponent";
import { Run } from "../models/Run";

export const RunNotes = (props: {
  id: number | undefined;
  description: string;
}) => {
  const [text, setText] = useState(props.description);
  const user = useSelector((state: RootState) => state.user);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();
  const runs: Run[] = useSelector((state: RootState) => state.runs);
  const run: Run | undefined = runs.find((run) => run.id === props.id);
  const [newDate, setNewDate] = useState<null | Date>(null);

  const onSave = async () => {
    if (props.id) {
      await putApiRunNotes(props.id, { description: text });
      const runs = await getApiRunsByUserId(user.id);
      dispatch(loadRuns(runs));
    }
  };

  const onEditDate = async () => {
    setNewDate(null);
    if (showDatePicker && newDate && props.id) {
      await putApiRun(props.id, { ...run, date: newDate });
      const runs = await getApiRunsByUserId(user.id);
      dispatch(loadRuns(runs));
    }
    setShowDatePicker(!showDatePicker);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <div>
        <Typography variant="h4"> Run Notes </Typography>
        <textarea rows={20} cols={70} value={text} onChange={handleChange} />
      </div>
      <div>
        <MultiButtonComponent
          quantity={1}
          buttonTextList={["SAVE NOTES"]}
          clickHanlderList={[onSave]}
          margin={1}
        />
        {showDatePicker ? (
          <Chip
            label={newDate ? "SAVE DATE" : "CANCEL"}
            onClick={onEditDate}
            style={{ marginLeft: 10, marginRight: 10 }}
          />
        ) : (
          <Chip
            label={"EDIT DATE"}
            onClick={onEditDate}
            style={{ marginLeft: 10, marginRight: 10 }}
          />
        )}

        {showDatePicker && <ChooseDateComponent setNewDate={setNewDate} />}
      </div>
    </div>
  );
};
