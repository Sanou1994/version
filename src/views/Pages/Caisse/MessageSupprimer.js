


// import ReactDOM from 'react-dom';
// import { useState }  from 'react';
import React from 'react';
import { Modal } from 'react-responsive-modal'
import './MessageSupprimer.css'

import $ from 'jquery';


class MessageSupprimer extends React.Component {
   
    constructor(props){
      super(props);
      this.state = {
        open: true,
      };
   
    }
    handlesupprimer=()=>{
      this.setState({ open: false });
    }
    onOpenModal = () => {
      this.setState({ open: true });
    };
    onCloseModal = () => {
      this.setState({ open: false });
    };
    render() {
      const { open } = this.state;
        return (
            <>
        <div>
          {/* <button type="button" class="btn  btn-outline-light mr-lg-5" onClick={this.onOpenModal}>Modal test suppression </button> */}
          
          <Modal open={open} onClose={this.onCloseModal} center className="modale2">
     
          {/* <div class="text-center">
	
            <a href="#myModal" class="trigger-btn" data-toggle="modal">Click to Open Confirm Modal</a>
            </div> */}


          
                            <div class="icon-box2">
                                <i class="material-icons">&#xE5CD;</i>
                            </div>						
                            <h4 class="modal-title w-100 h">Etes-vous sûr ?</h4>	
                           
                       
                        <div class="modal2">
                            <p>Voulez-vous vraiment supprimer ces enregistrements ?</p>
                        </div>
                        <div class="foot row">
                          <div className="col-md-6">
                            <button type="button" className="btn btn-secondary btn2 btn-secondary2 fermer" data-dismiss="modal" onClick={this.onCloseModal}>Annuler</button>
                          </div>
                          <div className="col-md-6 ">
                            <button onClick={this.props.handlesupprimer} type="button" class="btn btn-danger btn-danger2 sup">Supprimer</button>
                           </div>
                        </div>
                


  {/* <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button
          type="button"
          class="btn-close"
          data-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">...</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div> */}
 
            

          </Modal>
        </div>

        </>
      );
    }
  }
   
  export default MessageSupprimer;