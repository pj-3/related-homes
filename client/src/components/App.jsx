import React from 'react';
import HomesList from './HomesList.jsx';





class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHouse: 1 //
    }
    this.changeCurrentHouse = this.changeCurrentHouse.bind(this);
  }

changeCurrentHouse (newHouse) {

  console.log('do you even click bro?')
  console.log('this is newHouse: ', newHouse)
  this.setState({currentHouse: newHouse})


}

  render() {
    console.log('this is currentHouse state: ', this.state.currentHouse)
    return (

      <div>
        <h1> More Homes You Might Like</h1>
        <HomesList houseId={this.state.currentHouse} changeCurrentHouse={this.changeCurrentHouse}/>
      </div>
    )
  }
}

export default App;