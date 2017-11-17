import React from 'react';
import {connect} from 'react-redux';

class Header extends React.Component{
  constructor(props){
    super(props);
	this.state={
		chatRecipientObj:{}
	}
	this.props.socket.emit('typeHere','HEADER');
  }
  componentWillMount(){
    console.log('Header[will] is mounting');
  }
  componentDidMount(){
    console.log('Header[did] is mounting');
    this.props.socket.on('stateAndLoginUserName',(data)=>{
		this.props.handleLoginDetails(data,'updateLoginStatusUserName');
	})
    this.props.socket.on('searchResults',(data)=>{
      this.props.updateSearchResults(JSON.parse(data),'updateSearchResults');
    });
	this.props.socket.on('roomChatRecordSingle',(data)=>{
    console.log('rooMEND',data);
    let count=0;
    let dataObj=JSON.parse(data);
    for(var ind=0;ind<this.props.chatRoomsReceipient.length;ind++){
      if(dataObj.roomName==this.props.chatRoomsReceipient[ind].roomName){
        count++;
        let json={};
        json.ind=ind;
        json.msg=dataObj.pastChat;
        console.log('updateMSG CALLING');
        this.props.updatechatRoomsReceipient(json,'updateMsgOnly');
        break;
      }
    }
    if(count==0){

	   let json={};
	   json.receiver=[];
	   json.receiver.push(dataObj.receipientObj);
	   json.type='Single';
	   json.msg=dataObj.pastChat;
	   json.roomName=dataObj.roomName;
	   this.props.updatechatRoomsReceipient(json,'update_chatRoomsReceipientReducer');
   }
    })

  }
  componentWillReceiveProps(nextProps){
    console.log('Header[willReceive] is mounting');
  }
  handleSearchKey(){
    this.props.handleSearchKey(this.refs.searchKey.value,'update');
    this.props.updateSearchResults([],'updateSearchResults');
  }
  searchGibberMates(){
    this.props.socket.emit('searchGibberMates',this.refs.searchKey.value);
  }
  onEnterSearch(e){
    if(e.keyCode==13){
      this.searchGibberMates();
    }
  }
  enableSingleChat(obj){
		  this.props.handleSearchKey(obj.userName,'update');
    	this.props.updateSearchResults([],'updateSearchResults');
    	this.props.socket.emit('initiateSingleChatSession',obj);
  }
  enableGroupChat(obj){
	this.props.handleSearchKey('','update');
	this.props.updateSearchResults([],'updateSearchResults');
  }
  handleLogout(){
    window.location.href='http://localhost:8080/login';
  }
  render(){
    console.log('userLogged',this.props.loginDetails.userName);
    return(
      <div className='col-md-12 header'>
        <div className="col-md-1"></div>
        <div className="col-md-1 logo">Gb</div>
        <div className="col-md-6">
        <input type='text' className="search_People" ref='searchKey' value={this.props.searchKey} onChange={this.handleSearchKey.bind(this)} placeHolder="Search Gb for mates to Chat" onKeyDown={this.onEnterSearch.bind(this)}>
        </input>
        <span>
        <img src='images/search.png' className="searchImg" alt="search" onClick={this.searchGibberMates.bind(this)}/>
        </span>
        <div className="searchResults" ref="searchResults">
        {this.props.searchResults.map((obj,ind)=>{
          return(
            <div>
              <span className="searchUsername">{obj.userName}</span>
			  <span className="searchStatus">{obj.status}</span>
			  <span className="searchResultSingleChat" onClick={this.enableSingleChat.bind(this,obj)}><img src='images/single_chat.png' className="singleChatImg" alt="single chat"/></span>
			  <span className="searchResultMultiChat"onClick={this.enableGroupChat.bind(this,obj)}><img src='images/group_chat.png' className="groupChatImg" alt="group chat" /></span>
            </div>
          )
        })}
        </div>
        </div>
        <div className="col-md-3 status">{this.props.loginDetails.status}</div>
        <div className="col-md-1 ">
        <span className="logout">
        <img src='images/logout.jpg' className="logoutImg" alt="logout" onClick={this.handleLogout.bind(this)}/>
        </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    searchKey:store.searchKey,
    loginDetails:store.loginDetails,
    searchResults:store.searchResults,
	chatRoomsReceipient:store.chatRoomsReceipient
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearchKey : (val,type) => dispatch({
    val,
    type
  }),
    handleLoginDetails:(val,type)=>dispatch({
      val,
      type
    }),
    updateSearchResults:(val,type)=>dispatch({
      val,
      type
    }),
	updatechatRoomsReceipient:(val,type)=>dispatch({
      val,
      type
    })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
