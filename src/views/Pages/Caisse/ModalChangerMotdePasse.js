


// import ReactDOM from 'react-dom';
// import { useState }  from 'react';
import React from 'react';
import { Modal } from 'react-responsive-modal'
import './ModalChangerMotDePasse.css'
//import 'react-responsive-modal/styles.css';
import axios from 'axios';
import $ from 'jquery';
import ValidationOk from './ValidationOk'
///import { createUseStyles } from 'react-jss'

class ModalChangerMotDePasse extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,user:{},succesSchow:false,message:"",messageErreur:"",ouvrir:false
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
    const apiUrl = 'https://rawade-api.herokuapp.com/api/utilisateurs/modifier/'+idU ;
   if($('#mdpi').val()==this.state.user.password){
     if($('#mdp1').val()==$('#mdp2').val()){
      axios.put(apiUrl,{nom:this.state.user.nom,prenom:this.state.user.prenom,telephone:this.state.user.telephone,pseudo:this.state.user.pseudo,agence:this.state.user.agence,
      role:this.state.user.role,login:this.state.user.login,password:$('#mdp2').val()})
      this.setState({ open: false });
      this.setState({ ouvrir: true });
      this.setState({message:"Mot de Passe Modifié"})
      this.setState({succesSchow:true})
     }else{
      this.setState({messageErreur:"Veuilez saisir un mot de passse identique"})
      $('#msgerror').css("display","block");
      $('#mdp2').val('')
      setTimeout(
    
        function() 
        {
          $('#msgerror').css("display","none");
        }, 2000);
     }

   }else{
    this.setState({messageErreur:"Mot de Passe Incorrect"})
    $('#msgerror').css("display","block");
    $('#mdp').val('')
    setTimeout(
  
      function() 
      {
        $('#msgerror').css("display","none");
      }, 2000);

   }


  
  } 
    componentDidMount(){
      var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
     
      fetch('https://rawade-api.herokuapp.com/api/utilisateurs/'+idU )
      .then((response) => response.json())
      .then((data) => {console.log('This is your data mdp ', data)
        this.setState({user:data})
       
       console.log('This is your data debute ',)
 }
 );
 $('#msgerror').css("display","none");

    }

    render() {
      const { open } = this.state;
        return (
        <div>
                    {
        (this.state.succesSchow) ?
        (<ValidationOk open={this.state.ouvrir} message={this.state.message} />) : null
       }
          <button id="mdp" type="button" className="btn  btn-outline-light mr-lg-5 mdp" onClick={this.onOpenModal}>Clôturer la journée </button> 
          <Modal open={open} onClose={this.onCloseModal} center className="modale2">
     
          <div class ="row-12">
             <div class="col-12">
                 <div class="card  text-white bg-dark">
                     <div class="card-body align-middle">
                         <h3>Modifier votre mot de passe</h3>
                     </div>
                 </div>
             </div>
          </div>

         <div class ="row-12">
             <div class="col-12">

                 <div class="card  text-white bg-dark">
                     <div class="card-header">
                         Entrez votre nouveau mot de passe
                     </div>

                <div class="card-body align-middle">
                    <form>
                        <div class="form-group">
                          <label for="MDP">Mot de passe</label>
                          <input name="MDP" type="text" class="form-control" id="mdpi" 
                          placeholder="Mot de passe" />
                        </div>

                        <div class="form-group">
                          <label for="NMDP">Nouveau mot de passe</label>
                          <input name="NMDP" type="text" class="form-control" id="mdp1" 
                          placeholder="Nouveau mot de passe" />
                        </div>

                        <div class="form-group">
                          <label for="RNMDP">Répéter nouveau mot de passe</label>
                          <input name="RNMDP" type="text" class="form-control" id="mdp2" 
                          placeholder="Répéter nouveau mot de passe" />
                        </div>
                        
                        <div class="form-check">
                            <button onClick={this.handleCloturer.bind(this)} class="form-check-label btn btn-primary" >Changer mot de passe </button>
                        </div>
                        <div class="form-group">
                          <label id="msgerror">{this.state.messageErreur}</label>
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
   
  export default ModalChangerMotDePasse;