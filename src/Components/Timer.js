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
        this.timer.start({countdown: true, startValues: this.props.settings});
        this.timer.pause()
        this.state = {
            timeElapesd: this.timer.getTimeValues().toString(),
            on: false
        }
    }

    componentDidMount() {
        this.timer.addEventListener('secondsUpdated', () => {
            this.setState({ timeElapesd: this.timer.getTimeValues().toString() })
        })
    }

    componentDidUpdate() {
        if (this.state.on) this.timer.start();
        else this.timer.pause()
    }

    render = () => {
        return (
            <div className='Timer'>
                <div className='Time'>{this.state.timeElapesd}</div>
                <Button variant="outlined" className='Btn' onClick={
                    () => this.setState({on: !this.state.on})
                }>
                    {this.state.on ? <PauseSharpIcon/> : <PlayArrowSharpIcon/>}
                    {this.state.on ? "Stop" : "Start"}
                </Button>
            </div>
        );
    }
}

export default Timer