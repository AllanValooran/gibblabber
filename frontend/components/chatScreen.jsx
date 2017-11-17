import React from 'react';
import {connect} from 'react-redux';

class ChatScreen extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    console.log('ChatScreen[will] is mounting');
  }
  componentDidMount(){
    console.log('ChatScreen[did] is mounting');
    this.props.socket.on('sendingChat',(data)=>{

		this.props.updatechatRoomsReceipient(data,'update_MsgReceipientReducer');
    })
  }
  componentWillReceiveProps(nextProps){
    console.log('ChatScreen[willReceive] is mounting');

  }
  handleCloseChat(index){
    this.props.socket.emit('closeChat',this.props.chatRoomsReceipient[index]);
    this.props.updatechatRoomsReceipient(index,'pop_chat_by_ind');
  }
  highlightChat(index){
    let json={};
    json.userName=this.props.chatRoomsReceipient[index].receiver[0].userName;
    json.roomName=this.props.chatRoomsReceipient[index].roomName;
    this.props.socket.emit('initiateSingleChatSession',json);
  }
  sendChat(index,e){
    if(e.keyCode==13){
      /* var msgToSend=this.state.msgToSend;
      var toBeSend=msgToSend[index];
      let data={};
      data.roomName=this.props.chatRoomsReceipient[index].roomName;
      data.msg=toBeSend;
      this.props.socket.emit('sendChat',data);
      msgToSend[index]='';
      this.setState({
        msgToSend:msgToSend
      }); */
	  var msg={};
	  msg.sender=this.props.loginDetails.userName;
	  msg.receiver=[];
	  if(this.props.chatRoomsReceipient[index].type=='Single'){
		  msg.receiver.push(this.props.chatRoomsReceipient[index].receiver[0].userName);
	  }
	  else{

	  }
	  msg.msgType='text';
	  msg.time=new Date()+'';
	  msg.text=this.props.chatRoomsReceipient[index].msgToSend;
	  let jsonData={};
	  jsonData.msg=msg;
	  jsonData.roomName=this.props.chatRoomsReceipient[index].receiver[0].roomName;
	  this.props.socket.emit('sendChat',jsonData);



    }
    else{
      console.log('toBeSend typing');
    }
  }
  handleMsgToSend(index){
	 let val={};
	 val.msgToSend=this.refs['send'+index].value;
	 val.index=index;
	 this.props.updatechatRoomsReceipient(val,'change_msgToSend');
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
				{chatRecipient.receiver[0].userName}
			 </span>
			 <span className="chat_header_status">
				{chatRecipient.receiver[0].status}
			 </span>

			 <span className="chat_header_img">
				<img src='images/closeButton.png' className="closeButton" alt="close chat" onClick={this.handleCloseChat.bind(this,chatInd)}/>
			 </span>
			</div>
			<div className="chat_body">
				{chatRecipient.msg.map((chat,chatInd)=>{
					if(chat.sender==this.props.loginDetails.userName){
						return(
							<div className="login_chat">
								{chat.text}
							</div>
						)
					}
					else{
						return(
							<div className="other_chat">
								{chat.text}
							</div>
						)
					}
				})
				}
			</div>
      <div className="chat_body_user_input">
      <span className='chat_body_user_input_txt'>
      <input type='text' placeHolder='Type here' ref={"send"+chatInd} value={chatRecipient.msgToSend} onChange={this.handleMsgToSend.bind(this,chatInd)} onKeyDown={this.sendChat.bind(this,chatInd)}></input>
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
    chatRoomsReceipient:store.chatRoomsReceipient,
	loginDetails:store.loginDetails
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
