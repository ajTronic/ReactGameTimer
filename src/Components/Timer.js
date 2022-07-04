import React from 'react'
import Button from '@mui/material/Button'
import PlayArrowSharpIcon from '@mui/icons-material/PlayArrowSharp'
import TimerManager from "easytimer.js"
import PauseSharpIcon from '@mui/icons-material/PauseSharp'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

class Timer extends React.Component {
    constructor(props)  {
        super(props)
        this.props = props
        this.timer = new TimerManager()
        this.timer.start({ countdown: true, startValues: this.props.settings })
        this.timer.pause()
        this.DOMElement = null
        this.state = {
            timeElapesd: this.getTimeElapsed().toString(),
            on: false,
            btnState: "Start",
            finished: false
        }
    }

    setRef = element => {
        this.DOMElement = element;
    }

    componentDidMount = () => {
        this.timer.addEventListener('secondsUpdated', () => {
            this.setState({ timeElapesd: this.getTimeElapsed().toString() })
        })

        this.timer.addEventListener('targetAchieved', () => {
            this.finish()
        })
    }

    finish = () => {
        this.setState({ finished: true })
        var audio = new Audio('./finished.ogg')
        audio.play()
        this.DOMElement.classList.add("Finished")
        console.log(this.DOMElement);

        this.timer.stop()
        this.timer.start({ countdown: false })
    }

    reset = () => {
        this.timer.stop()
        this.timer.start({ countdown: true, startValues: this.props.settings })
        this.timer.pause()
        this.setState({ on: false, timeElapesd: this.getTimeElapsed().toString() })
        this.forceUpdate()
    }

    getTimeElapsed = () => {
        return this.timer.getTimeValues()
    }

    render = () => {
        return (
            <div className='Timer' ref={this.setRef}>
                <div className='Time'>
                    {this.state.finished ? <span className='Minus'>-</span> : null}
                    {this.state.timeElapesd}
                </div>
                <div>
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
                    {
                        this.props.resetBtn ? (
                            <Button className="ResetBtn Btn" variant="outlined" onClick={
                                () => this.reset()
                            }>
                                <RestartAltIcon />
                                Reset
                            </Button>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

export default Timer