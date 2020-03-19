import React from 'react';
import HomesList from './HomesList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  //componentDidMount()

  render() {
    return (
    <div>
      <h3>Moar Homes</h3>
      <HomesList />
    </div>
    );
    }
}

export default App;