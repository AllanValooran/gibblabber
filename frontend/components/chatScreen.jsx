import React from 'react';

class ChatScreen extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    console.log('ChatScreen[will] is mounting');
  }
  componentDidMount(){
    console.log('ChatScreen[did] is mounting');
  }
  componentWillReceiveProps(){
    console.log('ChatScreen[willReceive] is mounting');
  }
  render(){
    return(
      <div>
      </div>
    )
  }
}
module.exports=ChatScreen;
