import React from 'react';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault();

    // grab text from input
    const storeId = this.storeInput.value;

    // transition to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
      return (
        <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
            <h2>Please enter a Store</h2>
            <input
              ref={(input) => {this.storeInput = input}}
              type="text"
              required
              placeholder="Store Name"
              defaultValue={getFunName()}>
            </input>
            <button type="submit">Visit Store</button>
        </form>
      )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
