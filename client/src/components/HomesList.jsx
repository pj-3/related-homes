import React from 'react';
// import CurrentDisplay from '/CurrentDisplay.jsx';

class HomesList extends React.Component {
  constructor(props) {
    super(props);
    console.log('props: ', props)
  }
  render () {
    console.log('this.props.relatedHouses', this.props.relatedHouses)
    let photoSrc = this.props.relatedHouses.photoSrc.toString()
    return (
      <div>
      <img src='https://loremflickr.com/320/240/house' alt="Girl in a jacket"></img>
      <div id="bedsAndHouse">{this.props.relatedHouses.bedsAndHouse}</div>
      <div id="rating">{this.props.relatedHouses.rating}</div>
      <div id="description">{this.props.relatedHouses.description}</div>
      <div id="pricePerNight">{this.props.relatedHouses.pricePerNight}</div>
      </div>
    );
  }
}

export default HomesList;