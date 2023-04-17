import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function Calendar() {
  /**
   * Returns the calendar with interactive capabilities
   */
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
      initialView="timeGridWeek"
      selectable={true}
      timeZoneParam="UTC"
      selectMirror={true}
      events={[]}
      nowIndicator
      selectOverlap={false}
      headerToolbar={{
        left: "dayGridMonth,timeGridWeek,timeGridDay",
        center: "title",
      }}
    />
  );
}
