import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { MultiButtonComponent } from "./MultiButtonComponent";
import { putApiRunNotes } from "../api/runs";

export const RunNotes = (props: {
  id: number | undefined;
  description: string;
}) => {
  const [text, setText] = useState(props.description);

  const onSave = async () => {
    if (props.id) {
      console.log("about to save the text: ", text);
      await putApiRunNotes(props.id, { description: text });
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
          buttonTextList={["SAVE"]}
          clickHanlderList={[onSave]}
          margin={1}
        />
      </div>
    </div>
  );
};
