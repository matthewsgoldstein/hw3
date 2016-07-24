import React from 'react';

let id = 0;

const TitleBar = (props) => {
  function submit(event) {
    event.preventDefault();
    props.onSubmit(id, document.getElementById('text').value);
    id++;
    document.getElementById('titlebar').reset();
  }

  return (
    <div>
      <form id="titlebar" onSubmit={submit}>
        <input type="text" id="text" placeholder="Give your note a cool name!" />
        <input type="submit" value="Create Note" id="submit" />
      </form>
    </div>
    );
};

export default TitleBar;
