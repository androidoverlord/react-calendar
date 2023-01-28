import React, { useState, useEffect, useMemo } from 'react';

//

export default function Calendar() {
  const [current, setCurrent] = useState(() => Date.now());
  const [title, setTitle] = useState();
  const [days, setDays] = useState();
  const [lastDays, setLastDays] = useState();
  const [sooner, setSooner] = useState();
  const [later, setLater] = useState();

  //

  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  //

  const [currentDate, setCurrentDate] = useState(() => new Date());

  //

  const daysInWeek = useMemo(() => {
    return [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
  });

  //

  useEffect(() => {
    const date = new Date(current);
    const month = date.getMonth();
    const year = date.getFullYear();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const lastMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDay();

    //

    setCurrentDate(date);

    //

    setTitle(`${monthsInYear[month]} ${year}`);
    setDays(totalDays);
    setLastDays(lastMonth);
    setSooner(firstDay);
    setLater(daysInWeek.length - lastDay - 1);
  }, [current]);

  //

  console.log(start);

  //

  return (
    <div
      style={{
        width: '500px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          onClick={() => {
            setCurrent(
              currentDate.setMonth(currentDate.getMonth() - 1)
            );
          }}
          style={{
            width: '50px',
            height: '50px',
            border: '2px solid red',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            lineHeight: 0,
            cursor: 'pointer',
          }}
        >
          prev
        </div>
        <div
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </div>
        <div
          onClick={() => {
            setCurrent(
              currentDate.setMonth(currentDate.getMonth() + 1)
            );
          }}
          style={{
            width: '50px',
            height: '50px',
            border: '2px solid red',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            lineHeight: 0,
            cursor: 'pointer',
          }}
        >
          next
        </div>
      </div>
      <ul
        style={{
          height: '400px',
          border: '2px solid green',
          display: 'flex',
          flexWrap: 'wrap',
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}
      >
        {Array.from({ length: sooner }, (o, i) => {
          return (
            <Cell
              key={`date-${i}`}
              date={lastDays + 1 - (sooner - i)}
              daysInWeek={daysInWeek}
              active={false}
            />
          );
        })}
        {Array.from({ length: days }, (o, i) => {
          return (
            <Cell
              key={`date-${i}`}
              date={i + 1}
              daysInWeek={daysInWeek}
              current={currentDate}
              activate={(timestamp) => setStart(timestamp)}
            />
          );
        })}
        {Array.from({ length: later }, (o, i) => {
          return (
            <Cell
              key={`date-${i}`}
              date={i + 1}
              daysInWeek={daysInWeek}
              active={false}
            />
          );
        })}
      </ul>
    </div>
  );
}

const Cell = (props) => {
  const active = props.active ?? true;

  return (
    <li
      style={{
        flex: `0 0 ${100 / props.daysInWeek.length}%`,
        outline: '2px solid red',
        background: active ? 'white' : 'lightgray',
      }}
      onClick={() => {
        props.activate(
          new Date(
            Date.UTC(
              props.current.getFullYear(),
              props.current.getMonth(),
              props.date + 1,
              '00',
              '00',
              '00'
            )
          )
        );
      }}
    >
      {props.date}
    </li>
  );
};

//

const monthsInYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
