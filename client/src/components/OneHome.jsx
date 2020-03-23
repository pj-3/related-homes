import React from 'react';


class OneHome extends React.Component {
  constructor(props) {
    super(props);
    // console.log('props in OneHome: ', props)
  }
  render () {
    return (
      <div className="singleHome" onClick={() => {this.props.changeCurrentHouse(this.props.home.houseId)}} id={this.props.home._id}>
      <div>
        <img src={this.props.home.photoSrc} width="320" height="240" alt="Picture of a House"></img>
      </div>
      <div>
        <span className="bedsAndHouse">{this.props.home.bedsAndHouse}</span>
        <span className="rating">&#11088;{this.props.home.rating}</span>
      </div>
      <div style={{"clear": "both"}}></div>
      <div className="description">{this.props.home.description}</div>
      <div className="pricePerNight">{this.props.home.pricePerNight} / night</div>

      </div>
    );
  }
}

export default OneHome;