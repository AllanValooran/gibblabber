import React from 'react';
import {connect} from 'react-redux';

class ChatScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      msgToSend:['','','',''],
      msg:['','','','']
    }
  }
  componentWillMount(){
    console.log('ChatScreen[will] is mounting');
  }
  componentDidMount(){
    console.log('ChatScreen[did] is mounting');
    this.props.socket.on('sendingChat',(data)=>{
      let msg=this.state.msg;
      for(var i=0;i<this.props.chatRoomsReceipient.length;i++){
        if(data.roomName==this.props.chatRoomsReceipient[i].roomName){
          msg[i]=data.msg;
          this.setState({
            msg:msg
          })
        }
      }
    })
  }
  componentWillReceiveProps(nextProps){
    console.log('ChatScreen[willReceive] is mounting');

  }
  handleCloseChat(index){
    this.props.updatechatRoomsReceipient(index,'pop_chat_by_ind');
  }
  highlightChat(index){
    this.props.updatechatRoomsReceipient(index,'highlight_Chat');
  }
  sendChat(index,e){
    if(e.keyCode==13){
      var msgToSend=this.state.msgToSend;
      var toBeSend=msgToSend[index];
      let data={};
      data.roomName=this.props.chatRoomsReceipient[index].roomName;
      data.msg=toBeSend;
      this.props.socket.emit('sendChat',data);
      msgToSend[index]='';
      this.setState({
        msgToSend:msgToSend
      });
    }
    else{
      console.log('toBeSend typing');
    }
  }
  handleMsgToSend(index){
    var msgToSend=this.state.msgToSend;
    msgToSend[index]=this.refs['send'+index].value;
    this.setState({
      msgToSend:msgToSend
    });
  }
  render(){
	console.log('this.props.chatRoomsReceipient',this.props.chatRoomsReceipient);
	return(
	<div class="col-md-12 chat_main">
    {this.props.chatRoomsReceipient.map((chatRecipient,chatInd)=>{
		return(
			<div className="chat_box">
			<div className={chatRecipient.highlight?"chat_header highlight":"chat_header"}>
			 <span className="chat_header_userName" onClick={this.highlightChat.bind(this,chatInd)}>
				{chatRecipient.userName}
			 </span>
			 <span className="chat_header_status">
				{chatRecipient.status}
			 </span>
			 <span className="chat_header_img">
				<img src='images/closeButton.png' className="closeButton" alt="close chat" onClick={this.handleCloseChat.bind(this,chatInd)}/>
			 </span>
			</div>
			<div className="chat_body">
				{this.state.msg[chatInd]}
			</div>
      <div className="chat_body_user_input">
      <span className='chat_body_user_input_txt'>
      <input type='text' placeHolder='Type here' ref={"send"+chatInd} value={this.state.msgToSend[chatInd]} onChange={this.handleMsgToSend.bind(this,chatInd)} onKeyDown={this.sendChat.bind(this,chatInd)}></input>
      </span>
      </div>
			</div>
		)
	})
	}
	</div>
	)
  }
}
const mapStateToProps = function(store) {
  return {
    chatRoomsReceipient:store.chatRoomsReceipient
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatechatRoomsReceipient:(val,type)=>dispatch({
      val,
      type
    })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatScreen);
