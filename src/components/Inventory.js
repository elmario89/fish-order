import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();

    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logOut = this.logOut.bind(this);

    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth(user => {
      if (user) {
        this.authHandler(null, {user});
      }
    });
  }

  renderLogin() {
    return(
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log in with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log in with Facebook</button>
      </nav>
    )
  }

  authenticate(provider) {
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logOut() {
    base.unauth();
    this.setState({
      uid: null
    })
  }

  authHandler(err, authData) {
    if (err) {
      return;
    }

    //grap the store info
    const storeRef = base.database().ref(this.props.storeId);

    //query the firebase once for the store data
    storeRef.once('value', snapshot => {
      const data = snapshot.val() || {};

      //claim it as our own if there is no owner already
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        })
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    });
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];

    //take copy of fish and update it with new data
    const updatedFish = {
        ...fish,
        [e.target.name]: e.target.value
    };

    this.props.updateFish(key, updatedFish);
  }

  handleRemove(key) {
    this.props.removeFish(key);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];

    return (
        <div className="fish-edit" key={key}>
            <input className='name' type='text' name='name' onChange={e => this.handleChange(e, key)} value={fish.name} placeholder="Fish name" />
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
    const logout = <button onClick={this.logOut}>log out</button>;

    // check log in
    if (!this.state.uid) {
      return (<div>{this.renderLogin()}</div>)
    }

    // check if they are owners
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of the store</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }

  static propTypes = {
      fishes: React.PropTypes.object.isRequired,
      updateFish: React.PropTypes.func.isRequired,
      removeFish: React.PropTypes.func.isRequired,
      addFish: React.PropTypes.func.isRequired,
      loadSamples: React.PropTypes.func.isRequired,
      storeId: React.PropTypes.string.isRequired
  }
}

export default Inventory;
