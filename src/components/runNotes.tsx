import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { MultiButtonComponent } from "./MultiButtonComponent";
import { getApiRunsByUserId, putApiRunNotes } from "../api/runs";
import "../css/runs.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loadRuns } from "../redux/runsSlice";
import { useDispatch } from "react-redux";

export const RunNotes = (props: {
  id: number | undefined;
  description: string;
}) => {
  const [text, setText] = useState(props.description);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const onSave = async () => {
    if (props.id) {
      await putApiRunNotes(props.id, { description: text });
      const runs = await getApiRunsByUserId(user.id);
      dispatch(loadRuns(runs));
    }
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
      </div>
    </div>
  );
};
