// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: this.props.name }
  }

  updateName(name) {
    this.setState({ name });
  }

  render() {
    return (
      <div>
        <h3>Hello, {this.state.name}!</h3>
        <hr />
        <label htmlFor="name">Say hello to: </label>
        <input
          id="name"
          type="text"
          value={this.state.name}
          onChange={(e) => this.updateName(e.target.value)}
        />
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
