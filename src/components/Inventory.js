import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    super();

    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    //take copy of fish and update it with new data

    const updatedFish = {
        ...fish,
        [e.target.name]: e.target.value
    }

    this.props.updateFish(key, updatedFish);
  }

  handleRemove(key) {
    this.props.removeFish(key);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key]
    return (
        <div className="fish-edit" key={key}>
            <input type='text' name='name' onChange={e => this.handleChange(e, key)} value={fish.name} placeholder="Fish name" />
            <input type='text' name='price' onChange={e => this.handleChange(e, key)} value={fish.price} placeholder="Fish price" />

            <select type='text' name='status' onChange={e => this.handleChange(e, key)} value={fish.status} placeholder="Fish status" >
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold out!</option>
            </select>

            <textarea type='text' name='desc' onChange={e => this.handleChange(e, key)} value={fish.desc} placeholder="Fish desc">
            </textarea>

            <input type='text' name='image' onChange={e => this.handleChange(e, key)} value={fish.image} placeholder="Fish image" />
            <button onClick={() => this.handleRemove(key)}>Remove fish</button>
        </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Inventory1</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;