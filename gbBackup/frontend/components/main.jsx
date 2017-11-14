import React from 'react';
import {connect} from 'react-redux';
import Header from './header.jsx';
import ChatScreen from './chatScreen.jsx';
import Modal from './modal.jsx';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

class Main extends React.Component{
  constructor(props){
    super(props);
      socket.emit('status','active');
      socket.on('errorOccured',function(data){
        
      });
  }
  componentWillMount(){
    console.log('Main[will] hook called');
  }
  componentDidMount(){
    console.log('Main[did] hook called');
  }
  componentWillReceiveProps(){
    console.log('Main[willReceive] hook called');
  }
  render(){
	
    return(
      <div>
        <Header socket={socket}/>
        <ChatScreen socket={socket}/>
		<Modal updateModalObj={this.props.updateModalObj}/>
	  </div>
    )
  }
}


export default Main;
