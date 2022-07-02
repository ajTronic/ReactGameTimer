import React from 'react';
import Button from '@mui/material/Button';
import PlayArrowSharpIcon from '@mui/icons-material/PlayArrowSharp';
import TimerManager from "easytimer.js";
import PauseSharpIcon from '@mui/icons-material/PauseSharp';

class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.timer = new TimerManager()
        this.timer.start({ countdown: true, startValues: { seconds: 2 } });
        this.timer.pause()
        this.state = {
            timeElapesd: this.timer.getTimeValues().toString(),
            on: false,
            btnState: "Start"
        }
    }

    componentDidMount() {
        this.timer.addEventListener('secondsUpdated', () => {
            this.setState({ timeElapesd: this.timer.getTimeValues().toString() })
        })

        this.timer.addEventListener('targetAchieved', () => {
            this.finish()
        })
    }

    finish() {
        var audio = new Audio('./finished.ogg');
        audio.play();
        document.querySelector(".Time").classList.add("Finished")
    }
    
    render = () => {
        return (
            <div className='Timer'>
                <div className='Time'>{this.state.timeElapesd}</div>
                <Button variant="outlined" className='Btn' onClick={
                    () => this.setState({ on: !this.state.on }, () => {
                        if (this.state.on) {
                            console.log("Starting timer");
                            this.timer.start();  
                        } else {
                            console.log("Pauseing timer");
                            this.timer.pause()
                        }
                    })
                }>
                    {this.state.on ? <PauseSharpIcon/> : <PlayArrowSharpIcon/>}
                    {this.state.on ? "Stop" : "Start"}
                </Button>
            </div>
        );
    }
}

export default Timer