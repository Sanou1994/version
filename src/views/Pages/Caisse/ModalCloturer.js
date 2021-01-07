


// import ReactDOM from 'react-dom';
// import { useState }  from 'react';
import React from 'react';
import { Modal } from 'react-responsive-modal'
import './ModalCloturer.css'
import axios from 'axios';
import $ from 'jquery';
import ValidationOk from './ValidationOk'


class ModalCloturer extends React.Component {
  constructor(){
    super();
    this.state = {
      open: false,sommeFinal:0,succesSchow:false,message:""
    };
    this.handleCloturer.bind(this);
}
    
    onOpenModal = () => {
      this.setState({ open: true });
    };
    onCloseModal = () => {
      this.setState({ open: false });
    };
    handleCloturer=(e)=>{
      e.preventDefault();
      var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
     
   axios.post('https://rawade-api.herokuapp.com/api/cloturer/'+idU+'/'+$('#Caisse').val())
   localStorage.removeItem('etatdelajourne');
   this.setState({succesSchow:true})
   setTimeout(
    
    function() 
    {
      window.location.reload(false);
    }, 2000);  
  
  } 
    componentDidMount(){
      var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
      const apiUrl = 'https://rawade-api.herokuapp.com/api';
      fetch(apiUrl+"/sommeFinale/"+idU)
      .then((response) => response.json())
      .then((data) => {
        
         this.setState({sommeFinal:data});
       this.setState({message:"Journée cloturé:"+this.state.sommeFinal+" FCFA"});
        
        
    }
      );
    }

    render() {
      const { open } = this.state;
        return (
        <div>
                    {
        (this.state.succesSchow) ?
        (<ValidationOk message={this.state.message} />) : null
       }
          <button type="button" className="btn btn-lg btn-danger m-2 cloturejourne" aria-selected="true" onClick={this.onOpenModal}>Clôturer la journée </button>
          <Modal open={open} onClose={this.onCloseModal} center className="modale2">
     
        <div class ="row-12">
             <div class="col-12">
                 <div class="card  text-white bg-dark">

                 {/* <div class="card-header">
                    
                 </div> */}

                     <div class="card-body align-middle">
                         <h3>Clôturer la journée</h3>
                     </div>
                 </div>
             </div>

             <div class="col-12">
                
             </div>
         </div>
         <div class ="row-12">
             <div class="col-12">

                 <div class="card  text-white bg-dark">
                     <div class="card-header">
                         Combien avez-vous dans votre caisse ?
                     </div>

                <div class="card-body align-middle">
                    <form>
                        <div class="form-group">
                                <label for="Caisse">Montant caisse</label>
                                <input name="montant" type="number" class="form-control" id="Caisse" min="0" step="1" 
                            name="Caisse" placeholder="Montant caisse" />
                        </div>
                        <div class="form-check">
                            <button onClick={this.handleCloturer.bind(this)} class="form-check-label btn btn-primary" >Clôturer la journée </button>
                        </div>
                        
                    </form>
                </div>
                </div>
            </div>

            <div class="col-12">

            </div>
        </div>
          </Modal>
        </div>
      );
    }
  }
   
  export default ModalCloturer;
  