import React from 'react';
import HomesList from './HomesList.jsx';

let pageNum =

console.log('this is window.location.href in ApP: ', window.location.href)


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHouse: 1 // received from url
    }
    this.changeCurrentHouse = this.changeCurrentHouse.bind(this);
  }
  changeCurrentHouse (newHouse) {
    this.setState({currentHouse: newHouse})
  }

  render() {
    return (

      <div>
        <h1> More Homes You Might Like</h1>
        <HomesList houseId={this.state.currentHouse} changeCurrentHouse={this.changeCurrentHouse}/>
      </div>
    )
  }
}

export default App;