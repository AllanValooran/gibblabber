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
  }
  componentWillReceiveProps(nextProps){
    console.log('Header[willReceive] is mounting');

    this.props.socket.emit('updateSearch',nextProps.searchKey);
  }
  handleSearchKey(){
    this.props.handleSearchKey(this.refs.searchKey.value,'update');
  }
  render(){
    return(
      <div className='col-md-12 header'>
        <input type='text' className="search_People" ref='searchKey' value={this.props.searchKey} onChange={this.handleSearchKey.bind(this)} placeHolder="Search Gibber Mates">
        </input>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    searchKey:store.searchKey,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearchKey : (val,type) => dispatch({
    val,
    type
	  })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
