import React from 'react'
import BaseTimer from './BaseTimer';
import SecondaryTimer from './SecondaryTimer';

class Timer extends React.Component {
    constructor(props) {
        super()
        this.props = props
    }
    
    render() { 
        return (
            <div className='Timer'>
                <BaseTimer settings={this.props.settings}/>
                <SecondaryTimer/>
            </div>
        );
    }
}
 
export default Timer;