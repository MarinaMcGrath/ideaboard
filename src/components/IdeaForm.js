import React, { Component } from 'react';
import axios from 'axios';

class IdeaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.idea.title,
      body: this.props.idea.body
    }
    this.updateValue = this.updateValue.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  updateValue(e) {
    this.props.resetNotification();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitUpdate() {
    axios.put(`http://localhost:5000/api/v1/ideas/${this.props.idea.id}`, {
      idea: {
        title: this.state.title,
        body: this.state.body
      }
    })
    .then(res => {
      console.log(res);
      this.props.updateIdea(res.data);
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="tile" id="Editing">
        <form onBlur={this.submitUpdate}>
          <input
            className='input'
            type='text'
            name='title'
            placeholder='Idea?'
            value={this.state.title}
            onChange={this.updateValue}
          />
          <textarea
            className='input'
            name='body'
            placeholder='Details?'
            value={this.state.body}
            onChange={this.updateValue}
          ></textarea>
        </form>
      </div>
    )
  }
}
export default IdeaForm;