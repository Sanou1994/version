

import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import $ from 'jquery';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'
import sleep from 'await-sleep'
import ValidationOk from '../Caisse/ValidationOk'
import './CreerCompte.css';
class CreationCompte extends Component {


  constructor(props){
    super(props);
    this.state={users:[],message:"",open:true,ouvrir:true,ok:'',showSucces:" ",mgsucc:""}
    this.handleAdd.bind(this);
}


  handleAdd=()=>{
    var data={};
    this.setState({open:false}) ;
    this.setState({ouvrir:false}) ;

    data={nom:$('#nom').val(),prenom:$('#prenom').val(),pseudo:$('#pseudo').val() ,agence:$('#agence').val(),role:$('#role').val()
    ,telephone:$('#tel').val(),login:$('#login').val(),password:$('#password').val()}

    axios.post('https://rawade-api.herokuapp.com/api/utilisateurs/ajouter/',data)
    .then((response) => {
      this.actualiseOk();
    
   })
   
    
}

async actualiseOk() {

  this.setState({ouvrir:true});

  if(this.state.showSucces!=""){
    this.setState({showSucces:""});
    this.setState({mgsucc:<ValidationOk open={this.state.ouvrir} message="Utilisateur enregistre avec succès"/>})
   
    await sleep(2000);
    this.setState({ok: <Redirect to='/listecompte' />});
  }


}



  render() {

    return (
      <>
        <div class ="row-12">
          <div class="card  text-white bg-dark">
            <div class="card-body align-middle">
              <h1>Création des comptes</h1>
            </div>
          </div>
        </div>
        {this.state.ok} {this.state.showSucces} {this.state.mgsucc}
        <div class="card">
        <div class="card-body">
        <form novalidate>

            <div class="form-row">
                <div class="col-md-3 mb-3">
                    <label for="validationCustom01">Nom</label>
                    <input type="text" class="form-control" id="nom" placeholder="Nom"  required/>
                    
                </div>

                <div class="col-md-3 mb-3">
                    <label for="validationCustom02">Prénom</label>
                    <input type="text" class="form-control" id="prenom" placeholder="Prénom" required/>
                    
                </div>

                <div class="col-md-3 mb-3">
                    <label for="validationCustom02">Numéro de téléphone</label>
                    <input type="text" class="form-control" id="tel" placeholder="Numéro de téléphone" required/>
                    
                </div>

                <div class="col-md-3 mb-3">
                    <label for="validationCustom02">Agence</label>
                    <input type="text" class="form-control" id="agence" placeholder="Agence" required/>
                    
                </div> 
            </div>


            <div class="form-row">

                <div class="col-md-3 mb-3">
                    <label for="validationCustomUsername">Pseudonyme</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend"><i class="fa fa-at"></i></span>
                        </div>
                            <input type="text" class="form-control" id="pseudo" placeholder="Username" aria-describedby="inputGroupPrepend" required/>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="validationCustomUsername">Role</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend"><i class="fa fa-at"></i></span>
                        </div>
                          <select class="form-control" id="role">
                           
                            <option>caissier</option> 
                            <option>superviseur</option>
                         </select>
                    </div>
                </div>
                <div class="col-md-3 ">
                    <label for="inputPassword6">Identifiant</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend"> <i class="fa fa-user"></i></span>
                        </div>
                            <input type="text" id="login" class="form-control" placeholder="Login" aria-describedby="passwordHelpInline"/>
                    </div>
                </div>
                <div class="col-md-3 ">
                    <label for="inputPassword6">Mot de passe</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend"> <i class="fa fa-lock"></i></span>
                        </div>
                            <input type="password" id="password" class="form-control" placeholder="Mot de passe" aria-describedby="passwordHelpInline"/>
                    </div>
                </div>

            </div>

            <span class="btn btn-primary valider"  onClick={this.handleAdd.bind(this)} >Créer le compte</span>
            </form>
        </div>
        </div>

            



      </>
    )
  }
}

export default CreationCompte;