import { CalendarOptions } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";

// Just create a shim for FullCalendar that is preconfigured for recurring events
const RecurrenceCalendar: React.FC<CalendarOptions> = ({
  events,
  select,
  eventClick,
  ...props
}) => {
  return (
    <FullCalendar
      // Make Sure RRule Plugin is loaded
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
      initialView="timeGridWeek"
      selectable={true}
      // UTC is needed to convert db time to correct time
      timeZoneParam="UTC"
      selectMirror={true}
      events={events}
      nowIndicator
      selectOverlap={false}
      headerToolbar={{
        left: "dayGridMonth,timeGridWeek,timeGridDay",
        center: "title",
      }}
      select={select}
      eventClick={eventClick}
      {...props}
    />
  );
};

export default RecurrenceCalendar;
