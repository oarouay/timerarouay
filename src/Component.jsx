import React, { useState, useEffect } from "react";

function Component() {
    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);
    const [hrs, setHrs] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let intervalId;

        if (running) {
            intervalId = setInterval(() => {
                addSec(sec, min, hrs);
            }, 1000);
        }
        document.title=hrs+":"+min+":"+sec;

        return () => clearInterval(intervalId);
    }, [sec, min, hrs, running]);

    function addSec(sec, min, hrs) {
        if (sec < 59) {
            setSec(sec + 1);
        } else {
            setSec(0);
            if (min < 59) {
                setMin(min + 1);
            } else {
                setMin(0);
                setHrs(hrs + 1);
            }
        }
    }

    function pad(number) {
        return (number < 10) ? '0' + number.toString() : number.toString();
    }

    const startTimer = () => {
        setRunning(true);
    };

    const pauseTimer = () => {
        setRunning(false);
    };

    const resetTimer = () => {
        setSec(0);
        setMin(0);
        setHrs(0);
        setRunning(false);
    };

    return (
        <div className="card">
            <div className="timer">{pad(hrs)}:{pad(min)}:{pad(sec)}</div>
            <div className="mini">
                <div className="bot">
                    <div className="kol">
                    <button onClick={startTimer}>Start</button>
                    <button onClick={pauseTimer}>Pause</button>
                    <button>Pin</button>
                    <button onClick={resetTimer}>Reset</button>
                    </div>
                </div>
                <div className="pins"></div>
            </div>
        </div>
    );
}

export default Component;