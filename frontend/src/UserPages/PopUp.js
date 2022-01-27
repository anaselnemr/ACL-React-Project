import { Modal, Button } from 'antd';
import React, { Component } from "react";
import ReactDOM from "react-dom";
class PopUp extends React.Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,
  }
  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }
  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.setModal1Visible(true)}>Display a modal dialog at 20px to Top</Button>
        <Modal
          style={{ top: 20, height:400 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
          footer={[null]}
           
         
          >
              
        



  
  







          
        </Modal>
        <br /><br />
        <Button type="primary" onClick={() => this.setModal2Visible(true)}>Vertically centered modal dialog</Button>
        <Modal
          title="Vertically centered modal dialog"
          wrapClassName="vertical-center-modal"
          visible={this.state.modal2Visible}
          width={1000}
        
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>
    );
  }
}

// ReactDOM.render(<App />, mountNode);
const rootElement = document.getElementById("root");
ReactDOM.render(<PopUp />, rootElement);

export default PopUp;