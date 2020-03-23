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

  _loadData() {
    axios.get('/houses', {
      params: {
        houseId: this.props.houseId
      }
    })
    .then((response) => {
      this.setState({relatedHouses: response.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    this._loadData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.houseId !== this.props.houseId) {
    this._loadData()
    }
  }

  render () {
    return (
      <div id="allHouses">
        <div id="allHousesWrapper">
          {
            this.state.relatedHouses.map(oneHouse => <OneHome home={oneHouse} changeCurrentHouse={this.props.changeCurrentHouse}/>)
          }
        </div>
      </div>
    );
  }
}

export default HomesList;