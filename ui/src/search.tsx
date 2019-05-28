import React, {Component} from 'react';
import M from 'materialize-css';

interface searchProps {
  handleSearch: {(x: string): void};
}

class SearchBox extends Component<searchProps> {
  inputElement: HTMLInputElement | null = null;

  // http://fullstackhybrid.com/using-materializecss-with-reactjs/
  //--   handleInput = (e: React.KeyboardEvent) => {
  //--     e.preventDefault();
  //--     if (e.key !== 'Enter') {
  //--       return;
  //--     }
  //--     this.props.handleSearch(this.inputElement!.value);
  //--   };

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.handleSearch(this.inputElement!.value);
  };
  setRef = (userInput: HTMLInputElement | null) => {
    this.inputElement = userInput;
  };

  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper blue accent-2">
          <form
            onSubmit={this.onSubmit}>
            <div className="input-field">
              <input id="search" type="search" required ref={this.setRef} />
              <label className="label-icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

export default SearchBox;
