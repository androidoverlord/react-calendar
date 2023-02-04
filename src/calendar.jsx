import React, { useState, useEffect, useMemo } from "react";

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

    //

    const [currentDate, setCurrentDate] = useState(() => new Date());

    //

    const daysInWeek = useMemo(() => {
        return [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
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

    return (
        <div className="calendar">
            <div className="header">
                <div className="title">{title}</div>
                <div
                    className="button previous"
                    onClick={() => {
                        setCurrent(
                            currentDate.setMonth(currentDate.getMonth() - 1)
                        );
                    }}
                />
                <div
                    className="button next"
                    onClick={() => {
                        setCurrent(
                            currentDate.setMonth(currentDate.getMonth() + 1)
                        );
                    }}
                />
            </div>
            <ul className="list">
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
                            activate={(timestamp) => console.log(timestamp)}
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
            className={`item ${active ? "active" : ""}`}
            style={{
                flexBasis: `${100 / props.daysInWeek.length}%`,
            }}
            onClick={() => {
                props.activate(
                    new Date(
                        Date.UTC(
                            props.current.getFullYear(),
                            props.current.getMonth(),
                            props.date + 1,
                            "00",
                            "00",
                            "00"
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
