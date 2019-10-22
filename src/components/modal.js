import React from "react"
import Modal from "react-modal"
import styled from "styled-components"

const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  background: transparent;
  color: red;
  border: none;
`
const ModalLink = styled.div`
  font-size: 17px;
  color: #ACF0B5;
  font-weight: 500;
  padding: 0;
  text-decoration: underline;
  cursor:pointer;
  margin-left:auto;
`

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement(`#___gatsby`)

class SommioModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <ModalLink>
        <p onClick={this.openModal} >{this.props.text} </p>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}

          contentLabel="Example Modal"
          className="Modal"
          closeTimeoutMS={300}
        >

          <CloseButton onClick={this.closeModal}>close</CloseButton>
          {this.props.children}
        </Modal>
      </ModalLink>
    );
  }
}

export default SommioModal
