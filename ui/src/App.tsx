import React, {Component} from 'react';
import Search from './search';
import Results, {data} from './results';
import axios from 'axios';

class App extends Component<{}, {data: data | null}> {
  state = {
    data: null,
  };

  handleSearch = (x: string) => {
    var new_state = {data: {Name: x, 'favorite-number': '' + x.length}};
    this.setState(new_state);
    // axios.post('/v/', {name: x}).then(response => { this.setState({data: response.data}); });
  };
  render() {
    return (
      <div className="App">
        <Search handleSearch={this.handleSearch} />
        {this.state.data ? <Results data={this.state.data!} /> : null}
      </div>
    );
  }
}

export default App;
