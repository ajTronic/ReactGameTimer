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
            btnState: "Start",
            finished: false
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
        this.setState({ finished: true })
        var audio = new Audio('./finished.ogg')
        audio.play()
        document.querySelector(".Time").classList.add("Finished")

        this.timer.stop()
        this.timer.start({ countdown: false })
    }

    render = () => {
        return (
            <div className='Timer'>
                <div className='Time'>
                    {this.state.finished ? '-' : null}
                    {this.state.timeElapesd}
                </div>
                <Button variant="outlined" className='Btn' onClick={
                    () => this.setState({ on: !this.state.on }, () => {
                        if (this.state.on) {
                            this.timer.start();
                        } else {
                            this.timer.pause()
                        }
                    })
                }>
                    {this.state.on ? <PauseSharpIcon /> : <PlayArrowSharpIcon />}
                    {this.state.on ? "Stop" : "Start"}
                </Button>
            </div>
        );
    }
}

export default Timer