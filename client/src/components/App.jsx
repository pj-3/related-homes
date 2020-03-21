import React from 'react';
import HomesList from './HomesList.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedHouses: {
        photoSrc: '',
        bedsAndHouse: 'empty string',
        rating: '',
        description: '',
        pricePerNight: '',
      },
    }
  }


  componentDidMount() {
  axios.get('/houses')
  .then((response) => {
    this.setState({relatedHouses: response.data, hasLoaded: true})
    // console.log('this is relatedHouses State, :', this.state.relatedHouses)
  })
  .catch((error) => {
    console.log(error);
  });
}


  render() {
    console.log('this.state.relatedHouses: ', this.state.relatedHouses)
    return (
    <div>
      <h3>Moar Homes</h3>
      <HomesList relatedHouses={this.state.relatedHouses}/>
    </div>
    );
  }
}

export default App;