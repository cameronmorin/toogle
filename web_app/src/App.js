import React, { Component } from 'react';
import logo from './twitter-icon.png';
import './App.css';
import { Card, Icon, Input, Image, Checkbox} from 'semantic-ui-react'

class App extends Component {
  state = {
    tweets: [],
    toggle: 0
  }

  brokenProfile = event => event.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjAiIGhlaWdodD0iMjAiCnZpZXdCb3g9IjAgMCAyNiAyNiIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgIiBkPSJNIDI1Ljg1NTQ2OSA1LjU3NDIxOSBDIDI0LjkxNDA2MyA1Ljk5MjE4OCAyMy45MDIzNDQgNi4yNzM0MzggMjIuODM5ODQ0IDYuNDAyMzQ0IEMgMjMuOTIxODc1IDUuNzUgMjQuNzU3ODEzIDQuNzIyNjU2IDI1LjE0ODQzOCAzLjQ5NjA5NCBDIDI0LjEzMjgxMyA0LjA5NzY1NiAyMy4wMDc4MTMgNC41MzUxNTYgMjEuODEyNSA0Ljc2OTUzMSBDIDIwLjg1NTQ2OSAzLjc1IDE5LjQ5MjE4OCAzLjExMzI4MSAxNy45ODA0NjkgMy4xMTMyODEgQyAxNS4wODIwMzEgMy4xMTMyODEgMTIuNzMwNDY5IDUuNDY0ODQ0IDEyLjczMDQ2OSA4LjM2MzI4MSBDIDEyLjczMDQ2OSA4Ljc3MzQzOCAxMi43NzczNDQgOS4xNzU3ODEgMTIuODY3MTg4IDkuNTU4NTk0IEMgOC41MDM5MDYgOS4zMzk4NDQgNC42MzY3MTkgNy4yNDYwOTQgMi4wNDY4NzUgNC4wNzAzMTMgQyAxLjU5Mzc1IDQuODQ3NjU2IDEuMzM1OTM4IDUuNzUgMS4zMzU5MzggNi43MTQ4NDQgQyAxLjMzNTkzOCA4LjUzNTE1NiAyLjI2MTcxOSAxMC4xNDA2MjUgMy42NzE4NzUgMTEuMDgyMDMxIEMgMi44MDg1OTQgMTEuMDU0Njg4IDIgMTAuODIwMzEzIDEuMjkyOTY5IDEwLjQyNTc4MSBDIDEuMjkyOTY5IDEwLjQ0OTIxOSAxLjI5Mjk2OSAxMC40Njg3NSAxLjI5Mjk2OSAxMC40OTIxODggQyAxLjI5Mjk2OSAxMy4wMzUxNTYgMy4xMDE1NjMgMTUuMTU2MjUgNS41MDM5MDYgMTUuNjQwNjI1IEMgNS4wNjI1IDE1Ljc2MTcxOSA0LjYwMTU2MyAxNS44MjQyMTkgNC4xMjEwOTQgMTUuODI0MjE5IEMgMy43ODEyNSAxNS44MjQyMTkgMy40NTMxMjUgMTUuNzkyOTY5IDMuMTMyODEzIDE1LjczMDQ2OSBDIDMuODAwNzgxIDE3LjgxMjUgNS43MzgyODEgMTkuMzM1OTM4IDguMDM1MTU2IDE5LjM3NSBDIDYuMjQyMTg4IDIwLjc4NTE1NiAzLjk3NjU2MyAyMS42MjEwOTQgMS41MTU2MjUgMjEuNjIxMDk0IEMgMS4wODk4NDQgMjEuNjIxMDk0IDAuNjc1NzgxIDIxLjU5NzY1NiAwLjI2NTYyNSAyMS41NTA3ODEgQyAyLjU4NTkzOCAyMy4wMzkwNjMgNS4zNDc2NTYgMjMuOTA2MjUgOC4zMTI1IDIzLjkwNjI1IEMgMTcuOTY4NzUgMjMuOTA2MjUgMjMuMjUgMTUuOTA2MjUgMjMuMjUgOC45NzI2NTYgQyAyMy4yNSA4Ljc0MjE4OCAyMy4yNDYwOTQgOC41MTU2MjUgMjMuMjM0Mzc1IDguMjg5MDYzIEMgMjQuMjYxNzE5IDcuNTU0Njg4IDI1LjE1MjM0NCA2LjYyODkwNiAyNS44NTU0NjkgNS41NzQyMTkgIj48L3BhdGg+PC9nPjwvc3ZnPg==';

  onToggle = event => this.state.toggle = 1 - this.state.toggle;

  onChange = event => {
    if (this.state.toggle) {
      fetch(`http://localhost:8000/?userName=${encodeURIComponent(event.target.value)}`)
        .then(res => res.json())
        .then(tweets => {
          console.log(tweets);
          return tweets.map(tweet => ({...tweet._source, score: tweet._score}))
        }).then(tweets => {
          this.setState({ tweets })
        });
    }
    else {
      fetch(`http://localhost:8000/?text=${encodeURIComponent(event.target.value)}`)
        .then(res => res.json())
        .then(tweets => {
          console.log(tweets);
          return tweets.map(tweet => ({...tweet._source, score: tweet._score}))
        }).then(tweets => {
          this.setState({ tweets })
        });
      }
  }

  render() {
    return (
        <div className="App-header">
          <span className="title">
            <Image floated='left' size='mini' src={logo}/>
            <h1 style={{ display: 'inline' }}>Toogle</h1>
          </span>
          <div className="search-bar">
            <Input icon='search' iconPosition="left" type="text" onChange={this.onChange} /> 
          </div>
          <div className="toggle">
            <Checkbox label={<label>Search by username</label>} toggle onChange={this.onToggle} />
          </div>
          <div className="center-tweets">
            <Card.Group itemsPerRow={2}>
              {/* {items} */}
              {this.state.tweets.map(tweet => (
                // <Card href={tweet.url[0] ? tweet.url[0].url : "#"} target='_blank'>
                <Card >
                  <Card.Content>
                    <Card.Header style={{flex: 0}}>
                    <Image floated='left' size='mini' verticalAlign='middle' circular src={tweet.picture} onError={this.brokenProfile}/>
                      {`@${tweet.userName}`}
                    </Card.Header>
                    <Card.Description>{tweet.text}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name='user' />
                    {tweet.followers}
                  </Card.Content>
                  <Card.Content extra>
                  {`Score: ${tweet.score}`}
                  </Card.Content>
                </Card>  
              ))}
             
            </Card.Group>
          </div>
        </div>
    );
  }
}

export default App;
