import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import Textarea from 'react-textarea-autosize';

let zIndex = 0;

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: true,
    };

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }

  onEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  onDelete() {
    this.props.onDelete(this.props.id);
  }

  onSave() {
    this.setState({ isEditing: !this.state.isEditing });
    this.props.onSave(this.props.id, { text: document.getElementById(`textarea${this.props.id}`).value, zIndex });
    zIndex++;
  }

  onChange() {
    this.props.onSave(this.props.id, { text: document.getElementById(`textarea${this.props.id}`).value });
  }

  onDrag(e, ui) {
    this.props.onDrag(this.props.id, { x: ui.x, y: ui.y });
  }

  renderSomeSection() {
    // talked with Henry Wilson about the following line and its
    // use in onSave() and onChange()
    const textareaId = `textarea${this.props.id}`;

    const position = {
      x: this.props.x,
      y: this.props.y,
    };

    if (this.state.isEditing) {
      return (
        <Draggable
          handle=".drag"
          grid={[1, 1]}
          defaultPosition={{ x: 20, y: 20 }}
          position={position}
          zIndex={this.props.zIndex}
          onStart={this.onStartDrag}
          onDrag={this.onDrag}
          onStop={this.onStopDrag}
        >
          <div id="note">
            <span className="drag" id="topbar">
              <div className="trash" onClick={this.onDelete}></div>
            </span>
            <span id="infobar">
              <a>{this.props.title}</a>
              <i className="fa fa-check" aria-hidden="true" onClick={this.onEdit}></i>
            </span>
            <div><Textarea id={textareaId} defaultValue={this.props.text} onChange={this.onChange} placeholder="write your note here!" /></div>
          </div>
        </Draggable>
      );
    } else {
      return (
        <Draggable
          handle=".drag"
          grid={[1, 1]}
          defaultPosition={{ x: 20, y: 20 }}
          position={position}
          zIndex={this.props.zIndex}
          onStart={this.onStartDrag}
          onDrag={this.onDrag}
          onStop={this.onStopDrag}
        >
          <div id="note">
            <span className="drag" id="topbar">
              <div className="trash" onClick={this.onDelete}></div>
            </span>
            <span id="infobar">
              <a>{this.props.title}</a>
              <i className="fa fa-pencil" aria-hidden="true" onClick={this.onEdit}></i>
            </span>
            <div id="content" className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.text || '') }} />
          </div>
        </Draggable>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderSomeSection()}
      </div>
    );
  }
}

export default Note;
