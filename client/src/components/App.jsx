import React from 'react';
import HomesList from './HomesList.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  //componentDidMount()

  // axios.get('/user?ID=12345')
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

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