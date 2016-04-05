import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Messagelist from './Messagelist';
import _test from '../../testData/data';
import io from 'socket.io-client';
import SendMessageForm from './SendMessage';

export default class App extends Component {
  constructor(props){
  	super(props);
  	this.state=_test;
  	this.initialize = this.initialize.bind(this);
  	this.messageRecieve = this.messageRecieve.bind(this);
  	this.userJoined = this.userJoined.bind(this);
  	this.userChangedName = this.userChangedName.bind(this);
  	this.handleSendMessage = this.handleSendMessage.bind(this);
  	this.handleChangeName = this.handleChangeName.bind(this);
  	
  	this.socket = io.connect('http://localhost:3000');
  	this.state.socket=this.socket;
	//console.log(this.state);
	}
  userChangedName(data){
  	this.state.profiles[data.id].username=data.newName;
  	this.setState(this.state);
  }

  userJoined(data){
  	console.log(data.profiles);
  	this.state.profiles = data.profiles;
  	this.setState(this.state);

  }

  messageRecieve(data){
  	console.log('new_messages');
  	this.state.messages._new.push(data);
  	this.setState(this.state);
  }

  componentDidMount(){
 	//register listener
  	this.socket.on('init', this.initialize);
	this.socket.on('new:message', this.messageRecieve);
	this.socket.on('user:join', this.userJoined);
	this.socket.on('user:left', this.userLeft);
	this.socket.on('change:name', this.userChangedName);

	//
  	this.socket.emit('Iamin');
	}

  componentWillUpdate(){
  	 var node = ReactDOM.findDOMNode(this);
  	 this.shouldScrollBottom = (node.scrollTop + node.offsetHeight+25) === node.scrollHeight;
  }

  componentDidUpdate(){
  	//ReactDOM.findDOMNode(this).scrollIntoView();
  	if (this.shouldScrollBottom) { 
    //var node = ReactDOM.findDOMNode(this.refs.sendnode);
    //node.scrollTop = node.scrollHeight+40;
    ReactDOM.findDOMNode(this.refs.sendnode).scrollIntoView();
    //console.log(node.scrollHeight);
  	}
  }

  initialize(data){
  	//console.log(data);
  	this.state.messages = data.messages;
  	this.state.profiles = data.profiles;
  	this.state.userid = data.id;
  	this.setState(this.state); 
  }

  handleSendMessage(new_messages){
  	//console.log(new_messages);
  	this.state.messages._new = new_messages;
  	this.setState(this.state);
  }

  handleChangeName(new_profiles){
  	this.state.profiles = new_profiles;
  	this.setState(this.state);
  }

  render() {
  	console.log(this.state);
    return  <div id='App'>
                <Messagelist {...this.state}/>
                <SendMessageForm ref='sendnode' onNewMessage={this.handleSendMessage} onNewName={this.handleChangeName} {...this.state}/>
            </div>
  }
}

