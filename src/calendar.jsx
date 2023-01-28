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

        //

        setTitle(`${monthsInYear[month]} ${year}`);
        setDays(totalDays);
        setLastDays(lastMonth);
        setSooner(firstDay);
        setLater(daysInWeek.length - lastDay - 1);
    }, [current]);

    //

    return (
        <div
            style={{
                width: "500px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div
                    onClick={() => {
                        var newDate = new Date(current);
                        setCurrent(newDate.setMonth(newDate.getMonth() - 1));
                    }}
                >
                    prev
                </div>
                <div>{title}</div>
                <div
                    onClick={() => {
                        var newDate = new Date(current);
                        setCurrent(newDate.setMonth(newDate.getMonth() + 1));
                    }}
                >
                    next
                </div>
            </div>
            <ul
                style={{
                    height: "400px",
                    border: "2px solid green",
                    display: "flex",
                    flexWrap: "wrap",
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
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
                outline: "2px solid red",
                background: active ? "white" : "lightgray",
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
