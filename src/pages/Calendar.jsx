import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Calendar = () => {
  const runs = useSelector((state) => state.runs);
  const navigate = useNavigate();

  const onDateClick = (e) => {
    for (const run of runs) {
      if (String(run.date).substring(0, 10) === e.dateStr) {
        navigate(`/runs/${run.id}`);
      }
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={onDateClick}
      initialView="dayGridMonth"
    />
  );
};
