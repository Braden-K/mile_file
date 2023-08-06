import { Button } from "@material-ui/core";
import React from "react";

export const MultiButtonComponent = (props: {
  quantity: number;
  buttonTextList: Array<string>;
  clickHanlderList: Array<() => void>;
}) => {
  return (
    <div style={{ margin: 50 }}>
      {Array.from(Array(props.quantity).keys()).map((i) => {
        return (
          <Button key={i} onClick={props.clickHanlderList[i]}>
            {props.buttonTextList[i]}
          </Button>
        );
      })}
    </div>
  );
};
