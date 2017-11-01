import React from 'react';
import {connect} from 'react-redux';

class Main extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    console.log('Main[will] hook called');
  }
  componentDidMount(){
    console.log('Main[did] hook called');
    this.props.callMe('just');
  }
  componentWillReceiveProps(){
    console.log('Main[willReceive] hook called');
  }
  render(){
    return(
      <div>
        {this.props.justReducer}
        HELLO
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    justReducer:store.justReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    callMe : (type) => dispatch({
    type
	  })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
