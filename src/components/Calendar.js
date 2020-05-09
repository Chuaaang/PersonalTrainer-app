import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "./main.scss";

export default function Calendar() {
  const [trainings, setTrainings] = React.useState([]);

  const [calendarWeekends, setCalendarWeekends] = React.useState(true);
  const [calendarEvents, setCalendarEvents] = React.useState([
    {
      title: "jee jee",
      start: "2020-05-04T16:20:15",
      end: "2020-05-04T21:20:15",
    },
    {
      title: "Testi",
      start: "2020-05-04T20:20:15",
      end: "2020-05-04T22:22:15",
    },
  ]);

  React.useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => {
        let datat = data;
        luoEventit(datat);
      })
      .catch((err) => console.error(err));
  };

  function luoEventit(data) {
    let eventit = Array();
    data.map((daa, index) => {
      let uusiDate = new Date(daa.date);
      uusiDate.setMinutes(uusiDate.getMinutes() + daa.duration);
      if (daa.customer)
        eventit.push({
          title:
            daa.activity +
            " / " +
            daa.customer.firstname +
            " " +
            daa.customer.lastname,
          start: daa.date,
          end: uusiDate,
        });
    });
    setCalendarEvents(eventit);
  }

  let calendarComponentRef = React.createRef();

  const handleDateClick = (arg) => {};

  return (
    <div className="demo-app">
      <div className="demo-app-calendar">
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendarComponentRef}
          events={calendarEvents}
        />
      </div>
    </div>
  );
}
