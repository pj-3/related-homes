import React from 'react';
const axios = require('axios');
import OneHome from './OneHome.jsx';
import Styles from './Styles.js';

class HomesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedHouses: [
        {
          houseId: '',
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
    axios.get(`/houses/1`, {
      params: {
        houseId: this.props.houseId
      }
    })
    .then((response) => {
      console.log(response)
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
      <Styles.AllHouses>
        <Styles.AllHousesWrapper>
          {
            this.state.relatedHouses.map((oneHouse) => <OneHome key={oneHouse.houseId} home={oneHouse} changeCurrentHouse={this.props.changeCurrentHouse}/>)
          }
        </Styles.AllHousesWrapper>
      </Styles.AllHouses>
    );
  }
}

export default HomesList;