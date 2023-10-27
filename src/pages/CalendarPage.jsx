import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { colorMap } from "../utils/colorMap";
import { Container } from "@material-ui/core";

export const CalendarPage = () => {
  return (
    <Container maxWidth="xl">
      <h1></h1>
      <Calendar />
      Below the calendar
    </Container>
  );
};

const Calendar = () => {
  const runs = useSelector((state) => state.runs);
  const navigate = useNavigate();

  const onDateClick = (e) => {
    for (const run of runs) {
      if (String(run.date).substring(0, 10) === e.dateStr) {
        navigate(`/runs/${run.id}`);
      }
    }
  };

  const events = runs.map((run) => {
    return {
      id: run.id,
      title: run.distance + " miles",
      start: String(run.date).substring(0, 10),
      backgroundColor: colorMap[run.type],
      borderColor: colorMap[run.type],
      textColor: "black",
    };
  });

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={onDateClick}
      initialView="dayGridMonth"
      events={events}
    />
  );
};

const displayRunData = (run) => {
  return (
    <>
      <b>{run.timeText}</b>
      <p>{run.title}</p>
    </>
  );
};
