import React from 'react';
import Header from './Header';
import Order from './Order';

import sampleFishes from '../sample-fishes';

import Inventory from './Inventory';
import Fish from './Fish';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish) {
    // update our state
    const fishes = {...this.state.fishes};

    // add out new fish
    const timeStamp = Date.now();
    fishes[`fish-${timeStamp}`] = fish;

    // set state
    this.setState({fishes});
  }

  addToOrder(key) {
    // take a copy of state
    const order = {...this.state.order};

    // update/add new number of fish ordered
    order[key] = order[key] + 1 || 1;

    this.setState({order});
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  render() {
      return (
        <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="Fresh Seafood Market"/>
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
            <Order />
            <Inventory 
              addFish={this.addFish} 
              loadSamples={this.loadSamples}
              />
        </div>
      )
  }
}

export default App;