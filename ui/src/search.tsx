import React from 'react';

interface searchProps {
  handleSearch: {(x: string): void};
}

const SearchBox = (props: searchProps) => {
  var inputElement: HTMLInputElement | null;

  function handleInput(e: React.KeyboardEvent) {
    e.preventDefault();
    if (e.key !== 'Enter') {
      return;
    }
    props.handleSearch(inputElement!.value);
  }

  function setRef(userInput: HTMLInputElement | null) {
    inputElement = userInput;
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              required
              ref={setRef}
              onKeyUp={handleInput}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default SearchBox;
