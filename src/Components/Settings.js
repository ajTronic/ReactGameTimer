import React from 'react';
import TextField from '@mui/material/TextField';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.props = props
        this.state = {
            text: ""
        }
    }
    render() {
        return (
            <div className="Settings">
                <TextField onKeyPress={(ev) => {
                    this.setState({
                        text: this.state.text + ev.key
                    })
                    if (ev.key === 'Enter') {
                        ev.preventDefault();
                        let lost = Number(this.state.text)
                        if (lost == 0) {
                            this.props.start({minutes: 70}) // Bounus time
                        } else {
                            this.props.start({minutes: 60 - Number(this.state.text)})
                        }
                    }
                }} id="standard-basic" label="Game Time Lost" variant="standard" />
            </div>
        );
    }
}

export default Settings;