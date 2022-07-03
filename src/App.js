import './App.css';
import React from 'react';
import Timer from './Components/Timer.js'
import Settings from './Components/Settings.js'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      settings: undefined,
      isSetup: false
    };
  }

  start = (settings) => {
    console.log('Settings: ' + JSON.stringify(settings));
    this.setState({
      settings: settings,
      isSetup: true
    });
  }

  render() {
    return (
      <div>
        {this.getView()}
      </div>
    );
  }

  getView = () => {
    if (this.state.isSetup)
      return (
        <div className='Timers'>
          {/* Main timer */}
          <Timer settings={this.state.settings} />
          {/* Break timer */}
          <Timer settings={{seconds: 2}} /> 
        </div>
      )
    else
      return <Settings start={(s) => this.start(s)} />
  }
}

export default App;