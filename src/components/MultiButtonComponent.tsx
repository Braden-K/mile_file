import { Button, Chip } from "@material-ui/core";
import React from "react";
import { useLinkClickHandler } from "react-router-dom";

export const MultiButtonComponent = (props: {
  quantity: number;
  buttonTextList: Array<string>;
  clickHanlderList: Array<() => void>;
}) => {
  return (
    <div style={{ margin: 50 }}>
      {Array.from(Array(props.quantity).keys()).map((i) => {
        return (
          <>
            <Chip
              key={i}
              label={props.buttonTextList[i]}
              onClick={props.clickHanlderList[i]}
              style={{ marginLeft: 10, marginRight: 10 }}
            />
          </>
        );
      })}
    </div>
  );
};
