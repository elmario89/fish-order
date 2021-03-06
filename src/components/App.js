import React from 'react';
import Header from './Header';
import Order from './Order';

import sampleFishes from '../sample-fishes';
import base from '../base';

import Inventory from './Inventory';
import Fish from './Fish';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  componentWillMount() {
    this.ref = base.syncState(
      `${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes'
      }
    );

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      // update our app component
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addFish = (fish) => {
    // update our state
    const fishes = {...this.state.fishes};

    // add out new fish
    const timeStamp = Date.now();
    fishes[`fish-${timeStamp}`] = fish;

    // set state
    this.setState({fishes});
  };

  updateFish = (key, fish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = fish;

    this.setState({fishes})
  };

  removeFish = (key) => {
    console.log(key);
    const fishes = {...this.state.fishes};
    fishes[key] = null;

    this.setState({fishes});
  };

  addToOrder = (key) => {
    // take a copy of state
    const order = {...this.state.order};

    // update/add new number of fish ordered
    order[key] = order[key] + 1 || 1;

    this.setState({order});
  };

  removeFromOrder = (key) => {
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
  };

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    })
  };

  render() {
      return (
        <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="Fresh Seafood Market" />
                <ul className="list-of-fishes">
                  {
                    Object.keys(this.state.fishes)
                      .map(key => <Fish
                                    key={key}
                                    index={key}
                                    details={this.state.fishes[key]}
                                    addToOrder={this.addToOrder}
                                  />)
                  }
                </ul>
            </div>
            <Order
              fishes={this.state.fishes}
              order={this.state.order}
              params={this.props.params}
              removeFromOrder={this.removeFromOrder} />
            <Inventory
              addFish={this.addFish}
              loadSamples={this.loadSamples}
              fishes={this.state.fishes}
              updateFish={this.updateFish}
              removeFish={this.removeFish}
              storeId={this.props.params.storeId} />
        </div>
      )
  }

  static propTypes = {
    params: React.PropTypes.object.isRequired
  }
}

export default App;
