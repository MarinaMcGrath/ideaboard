import React, { Component } from 'react';

class Idea extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    this.props.enableEditing(this.props.idea.id);
  }
  handleDelete() {
    this.props.deleteIdea(this.props.idea.id);
  }

  render(){
    return (
      <div className="tile">
        <span className="Delete" onClick={this.handleDelete}>X</span>
        <h4 onClick={this.handleClick}>{this.props.idea.title}</h4>
        <p onClick={this.handleClick}>{this.props.idea.body}</p>
      </div>
    )
  }
}
export default Idea;