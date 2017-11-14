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

  }
  componentWillReceiveProps(){
    console.log('ChatScreen[willReceive] is mounting');
  }
  handleCloseChat(index){
    this.props.updatechatRoomsReceipient(index,'pop_chat_by_ind');
  }
  highlightChat(index){
    this.props.updatechatRoomsReceipient(index,'highlight_Chat');
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
				{chatRecipient.userName}
			</div>
      <div className="chat_body_user_input">
      <span className='chat_body_user_input_txt'>
      <input type='text' placeHolder='Type here' ref={"send"+chatInd}></input>
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
