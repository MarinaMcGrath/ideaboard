import React, { Component } from 'react';
import Idea from './Idea';
import IdeaForm from './IdeaForm';

import axios from 'axios';
import update from 'immutability-helper';

class IdeasContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ideas: [],
      editingIdeaId: null
    }
    this.addIdea = this.addIdea.bind(this);
    this.updateIdea = this.updateIdea.bind(this);
    this.resetNotification = this.resetNotification.bind(this);
    this.enableEditing = this.enableEditing.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/v1/ideas')
      .then(res => {
        this.setState({
          ideas: res.data
        })
      })
      .catch(err => console.error(err));
  }

  addIdea() {
    axios.post('http://localhost:5000/api/v1/ideas', {idea: {title:'Idea', body: 'Details'}})
    .then(res => {
      const updated = update(this.state.ideas, { $splice: [ [0, 0, res.data] ] })
      this.setState({
        ideas: updated,
        editingIdeaId: res.data.id,
        notification: ''
      })
    })
    .catch(err => console.error(err));
  }

  updateIdea(idea) {
    const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id);
    const updated = update(this.state.ideas, {[ideaIndex]: { $set: idea }})
    this.setState({
      ideas: updated,
      notification: 'All changes saved'
    })
  }

  resetNotification() {
    this.setState({
      notification: ''
    })
  }

  enableEditing(id) {
    this.setState({
      editingIdeaId: id
    })
  }

  deleteIdea(id) {
    axios.delete(`http://localhost:5000/api/v1/ideas/${id}`)
    .then(res => {
      console.log('RESPONSE', res);
      console.log('STATE', this.state.ideas);
      const ideaIndex = this.state.ideas.findIndex(x => x.id ===id);
      const updated = update(this.state.ideas, { $splice: [ [ideaIndex, 1] ] })
      this.setState({
        ideas: updated
      })
      console.log('STATE', this.state.ideas);
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="Ideas">
        <div className="New">
          <button id="NewIdeaButton" onClick={this.addIdea}>
            New Idea
          </button>
          <span id="Notification">
            {this.state.notification}
          </span>
        </div>
        {this.state.ideas.map((idea) => {
          if(this.state.editingIdeaId === idea.id) {
            return (
              <IdeaForm
                idea={idea}
                key={idea.id}
                updateIdea={this.updateIdea}
                resetNotification={this.resetNotification}
              />
            )
          } else {
            return (
              <Idea
                idea={idea}
                key={idea.id}
                enableEditing={this.enableEditing}
                deleteIdea={this.deleteIdea}
              />
            )
          }
        })}
      </div>
    );
  }
}
export default IdeasContainer;
