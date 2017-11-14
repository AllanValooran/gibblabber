import React from 'react';
import {connect} from 'react-redux';

class Header extends React.Component{
  constructor(props){
    super(props);

  }
  componentWillMount(){
    console.log('Header[will] is mounting');
  }
  componentDidMount(){
    console.log('Header[did] is mounting');
    this.props.socket.on('statusChanged',(status)=>{
		this.props.handleLoginStatus(status,'updateLoginStatus')
    })
    this.props.socket.on('searchResults',(data)=>{
      this.props.updateSearchResults(JSON.parse(data),'updateSearchResults');
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
	this.props.socket.emit('initiateSingleChatSession',obj.userName);
  }
  enableGroupChat(obj){
	this.props.handleSearchKey('','update');
	this.props.updateSearchResults([],'updateSearchResults');   
  }
  handleLogout(){
    window.location.href='http://localhost:8080/login';
  }
  render(){
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
			  <span className="searchResultSingleChat" onClick={this.enableSingleChat.bind(this,obj)}><img src='images/single_chat.png' className="singleChatImg" alt="single chat"/></span>
			  <span className="searchResultMultiChat"onClick={this.enableGroupChat.bind(this,obj)}><img src='images/group_chat.png' className="groupChatImg" alt="group chat" /></span>
            </div>
          )
        })}
        </div>
        </div>
        <div className="col-md-3 status">{this.props.loginStatus}</div>
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
    loginStatus:store.loginStatus,
    searchResults:store.searchResults
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearchKey : (val,type) => dispatch({
    val,
    type
  }),
    handleLoginStatus:(val,type)=>dispatch({
      val,
      type
    }),
    updateSearchResults:(val,type)=>dispatch({
      val,
      type
    })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
