import '../chat'

import React from 'react'
import ReactDOM from 'react-dom'

import Cable from 'actioncable'
let ActionCable = Cable.createConsumer()

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = { messages: [] }
  }
  componentDidMount() {
    this.RoomChannel = ActionCable.subscriptions.create("RoomChannel", {
      received: (data) => {
        this.messageReceived(data['message'])
      },
      speak: function(message){
        this.perform('speak', {message: message})
      }
    });

    fetch('/rooms/show.json').then((response)=>{
      response.json().then((data) => {
        this.messageReceived(data)
      })
    })
  }

  speak(e) {
    if(e.keyCode == 13){
      e.preventDefault();
      this.RoomChannel.speak(e.target.value);
      e.target.value = '';
    }
  }

  messageReceived(message) {
    this.setState({
      messages: this.state.messages.concat(Array.isArray(message)? message : [message])
    })
  }

  render() {
    return (
      <div>
        <div className="messages list-group">
          {this.state.messages.map(function (message, i) {
            return (
              <div className="list-group-item" key={i}>
                <small className="pull-right">#{message.id} | {message.created_at}</small>{message.content}
              </div>
            )
          })}
        </div>
        <hr />
        <textarea className="form-control" onKeyDown={(e) => this.speak(e)}></textarea>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Chat />,
    document.getElementById('chat-app'),
  )
})