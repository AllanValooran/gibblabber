import React from 'react';
import ReactDOM from 'react-dom';
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
    this.props.socket.on('receiver_action',(data)=>{
      let dataObj=data;
      for(var ind=0;ind<this.props.chatRoomsReceipient.length;ind++){
        if(dataObj.roomName==this.props.chatRoomsReceipient[ind].roomName){
            let json={};
            json.ind=ind;
            json.typingMsg=dataObj.typingMsg;
            this.props.updatechatRoomsReceipient(json,'updateReceiverAction');
          break;
        }
      }
    })
    this.props.socket.on('sendingChat',(data)=>{
		    this.props.updatechatRoomsReceipient(data,'update_MsgReceipientReducer');
    });


  }
  componentWillReceiveProps(nextProps){
    console.log('ChatScreen[willReceive] is mounting');

  }
  componentDidUpdate(prevProps,prevState){
    if(this.props.chatRoomsReceipient.length!=0){
      for(let i=0;i<this.props.chatRoomsReceipient.length;i++){
        if(this.props.chatRoomsReceipient[i].highlight && this.props.chatRoomsReceipient[i].currentAction!=='updateChat'){
          let objDiv=ReactDOM.findDOMNode(this.refs['chat_body'+i]);
          objDiv.scrollTop = objDiv.scrollHeight;
          break;
        }
      }

    }
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
   let jsonData={};
   jsonData.msg=this.refs['send'+index].value;
   jsonData.roomName=this.props.chatRoomsReceipient[index].receiver[0].roomName;
   jsonData.userName=this.props.loginDetails.userName;
   this.props.socket.emit('typing',jsonData);
  }
  monitorScroll(index){
    let objDiv=ReactDOM.findDOMNode(this.refs['chat_body'+index]);
    if(objDiv.scrollTop==objDiv.scrollHeight){
        console.log('intimate the server that all messages are read by this guy');
    }
  }
  handleGameChatToggle(index){
    this.props.updatechatRoomsReceipient(index,'gameChatToggle');
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
       <span className='chat_game'>
       {chatRecipient.gameChat=='chat'?
        <img src='images/chat.png' className="chatIcon" alt="chat_switch" onClick={this.handleGameChatToggle.bind(this,chatInd)}/>
       :
        <img src='images/game.png' className="gameIcon" alt="game_switch" onClick={this.handleGameChatToggle.bind(this,chatInd)}/>
      }
       </span>
			 <span className="chat_header_status">
				{chatRecipient.receiver[0].status}
			 </span>

			 <span className="chat_header_img">
				<img src='images/closeButton.png' className="closeButton" alt="close chat" onClick={this.handleCloseChat.bind(this,chatInd)}/>
			 </span>
			</div>
			<div  ref={"chat_body"+chatInd} className={chatRecipient.highlight?"chat_body":"chat_body disable_scroll"} onScroll={this.monitorScroll.bind(this,chatInd)}>
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
        {chatRecipient.highlight?
          <div className='receiver_action'>
            {chatRecipient.typingMsg}
          </div>
        :
         null
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
