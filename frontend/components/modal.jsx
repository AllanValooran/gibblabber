import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {connect} from 'react-redux';

class ModalGb extends Component{
    constructor(props){
      super(props);
    }
    close(){
      let modalObjVal={};
      modalObjVal.flagType='';
      modalObjVal.show=false;
      modalObjVal.msg='';
      modalObjVal.msgTitle='';
      this.props.updateModalObj(modalObjVal,'updateModalObj')
    }
    render(){
      let modalObjVal=this.props.modalObj;
      return(
        <div className={modalObjVal.show?"modal-container disp_none":"disp_none"} >
          <Modal
            show={modalObjVal.show}
            onHide={this.close.bind(this)}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>

      )
    }
}
const mapStateToProps = function(store) {
  return {
    modalObj:store.modalObj,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateModalObj : (val,type) => dispatch({
    val,
    type
  }),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ModalGb);
