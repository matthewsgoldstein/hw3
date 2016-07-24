import React, { Component } from 'react';
import Immutable from 'immutable';
// import Welcome from './welcome';
import TitleBar from './title-bar';
import Note from './note';

// example class based component (smart component)
class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
    };

    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }


  addNote(id, title) {
    if (id === 0) {
      this.setState({
        notes: this.state.notes.set(id, { title, x: (id + 1), y: ((id + 1) * 10) }),
      });
    } else {
      this.setState({
        notes: this.state.notes.set(id, { title, x: ((id + 1) * 20), y: ((id + 1) * 20) }),
      });
    }
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  updateNote(id, fields) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
  }

  render() {
    return (
      <div>
        <TitleBar onSubmit={this.addNote} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return <Note id={id} key={id} title={note.title} text={note.text} x={note.x} y={note.y} z={note.z} onDelete={this.deleteNote} onSave={this.updateNote} onDrag={this.updateNote} />;
        })}
      </div>
    );
  }
}

export default App;
