import React from 'react';
const axios = require('axios');
import OneHome from './OneHome.jsx';

class HomesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedHouses: [
        {
          _id: '',
          photoSrc: '',
          bedsAndHouse: 'empty string',
          rating: '',
          description: '',
          pricePerNight: '',
        }
      ]
    }
  }

  componentDidMount() {
    axios.get('/houses')
    .then((response) => {
      this.setState({relatedHouses: response.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render () {
    return (
      <div id="allHouses">
        <div id="allHousesWrapper">
          {
            this.state.relatedHouses.map(oneHouse => <OneHome home={oneHouse} />)
          }
        </div>
      </div>
    );
  }
}

export default HomesList;