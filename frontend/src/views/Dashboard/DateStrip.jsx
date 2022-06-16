/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import {
    addDays,
    addMonths,
    differenceInMonths,
    format,
    isSameDay,
    lastDayOfMonth,
    startOfMonth
} from "date-fns";
import enUsLocale from "date-fns/locale/en-US";
import { Box, Grid, Container, Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        width: '100%',
        background: 'inherit',
        justifyContent: 'center'
    },
    buttonwrapper: {
        display: 'flex',
        alignItems: 'flex-end',
        zIndex: 2,
        background: 'inherit',
    },
    button: {
        border: 'none',
        textDecoration: 'none',
        cursor: 'pointer',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        fontSize: '20px',
        fontWeight: 'bold',
        flexShrink: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        marginBottom: '5px'
    },
    datelist: {
        display: 'flex',
        width: '100%',
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        margin: '2px 0 2px -40px',
        '-webkit-overflow-scrolling': 'touch',
        '&::-webkit-scrollbar': {
            '-webkit-appearance': 'none',
            display: 'none',
        }
    },
    monthcontainer: {
        width: '100%',
        '& span': {
            'display': 'flex',
            'flexDirection': 'column',
        }
    },
    monthyearlabel: {
        alignSelf: 'flex-start',
        zIndex: '3',
        fontSize: '15px',
        fontWeight: 'bold',
        position: 'sticky',
        top: '0',
        left: '0',
        width: 'max-content',
        margin: '0 14px 10px 0',
    },
    datedayitem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        margin: '0 0 0 5px',
        width: '45px',
        height: '49px',
        flexShrink: '0',
    },
    dayscontainer: {
        display: 'flex',
        justifyContent: 'space-around',
        zIndex: '1'
    },
    daylabel: {
        fontSize: '3px',
        margin: '4px 0 0 0',
    },
    datelabel: {
        fontSize: '18px',
    },
    activeDateLabel: {
        fontSize: '3px',
        margin: '4px 0 0 0',
        '&::before': {
            content: '.',
            display: 'inline-block',
            position: 'absolute',
            bottom: '-0.5em',
            left: '0',
            textAlign: 'center',
            width: '100%'
        }
    }
}));

// const Button = styled.button`
//     border: none;
//     text-decoration: none;
//     cursor: pointer;
//     border-radius: 50%;
//     width: 40px;
//     height: 40px;
//     color: white;
//     font-size: 20px;
//     font-weight: bold;
//     flex-shrink: 0;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 0;
//     margin-bottom: 5px;
// `


export default function DatePicker({ endDate, selectDate, getSelectedDay, color, labelFormat, language }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const firstSection = { marginLeft: '40px' };
    const startDate = new Date();
    const lastDate = addDays(startDate, endDate || 90);
    const primaryColor = color || 'rgb(54, 105, 238)';
    const selectedStyle = { borderWidth: `0px 0px 2px 0px`, borderStyle: `solid`, borderColor: `${primaryColor}`, color: primaryColor };
    const buttonColor = { color: primaryColor };
    const labelColor = { color: primaryColor };

    const classes = useStyles();

    const getStyles = (day) => {
        if (isSameDay(day, selectedDate)) {
            return (selectedStyle);
        }
        return null
    };

    const getId = (day) => {
        if (isSameDay(day, selectedDate)) {
            return ('selected')
        } else {
            return ("")
        }
    };

    function renderDays(lang) {
        const dayFormat = "E";
        const dateFormat = "d";
        const months = [];
        let days = [];
        for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
            let start, end;
            const month = startOfMonth(addMonths(startDate, i));
            start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
            end = i === differenceInMonths(lastDate, startDate) ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));
            for (let j = start; j < end; j++) {
                days.push(
                    <div className={classes.datedayitem} id={`${getId(addDays(startDate, j))}`}
                        style={getStyles(addDays(month, j))}
                        key={addDays(month, j)}
                        onClick={() => onDateClick(addDays(month, j))}
                    >
                        <div className={classes.daylabel}>
                            {format(addDays(month, j), dayFormat)}
                        </div>
                        <div className={classes.datelabel}>
                            {format(addDays(month, j), dateFormat)}
                        </div>
                    </div>
                );
            }
            months.push(
                <div className={classes.monthcontainer} key={month}>
                    <div className={classes.monthyearlabel} style={labelColor}>
                        {format(month, labelFormat || "MMMM yyyy", { locale: lang })}
                    </div>
                    <div className={classes.dayscontainer} style={i === 0 ? firstSection : null}>
                        {days}
                    </div>
                </div>
            );
            days = [];
        }
        return <div id={"container"} className={classes.datelist}>{months}</div>;
    }

    const onDateClick = day => {
        setSelectedDate(day);
        if (getSelectedDay) {
            getSelectedDay(day);
        }
    };

    useEffect(() => {
        if (getSelectedDay) {
            if (selectDate) {
                getSelectedDay(selectDate);
            } else {
                getSelectedDay(startDate);
            }
        }
    }, []);

    useEffect(() => {
        if (selectDate) {
            if (!isSameDay(selectedDate, selectDate)) {
                setSelectedDate(selectDate);
                setTimeout(() => {
                    let view = document.getElementById('selected');
                    if (view) {
                        view.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                    }
                }, 20);
            }
        }
    }, [selectDate]);

    const nextWeek = () => {
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scrollLeft += width - 60;
    };

    const prevWeek = () => {
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scrollLeft -= width - 60;
    };

    let langCode
    switch (language) {
        default:
            langCode = enUsLocale
            break;
    }

    return (
        <div className={classes.container} direction="row" alignItem="center" justifyContent="space-evenly">
            <div className={classes.buttonwrapper}>
                <div className={classes.button} style={buttonColor} onClick={prevWeek}>←</div>
            </div>
            {renderDays(langCode)}
            <div item className={classes.buttonwrapper}>
                <div className={classes.button} style={buttonColor} onClick={nextWeek}>→</div>
            </div>
        </div>
    )
}
