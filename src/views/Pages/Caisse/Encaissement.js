

import React, { Component } from 'react';

import $ from 'jquery';
import axios from 'axios';
import { format } from 'date-fns';
import ValidationOk from './ValidationOk'
import ValidationWarning from './ValidationWarning'
import  { Redirect } from 'react-router-dom'
import sleep from 'await-sleep'
import './Encaissement.css'
class Encaissement extends Component {
 
componentDidMount(operateur='',operation=''){
  $('#operateur').html("Opérateur | "+operateur);
  $('#operation').html("Opération | "+operation);

  document.getElementById("operateurval").value = ""+operateur;
  $('.confirmation-e').css("display","none");
  $('.validation-e').css("display","block");

}

constructor(){
  super();
  this.state = {rendor:'',rendor2:'',mgerro:"",mgsucc:"",showSucces:" ",showErrorMsg:" ",open:true,ouvrir:true,ok:''}
  var msg="";
  this.handleEncaiss.bind(this);

  $('.champ-entree').css("display","block");
  $('.champ-transaction').css("margin-left","0px");

  $('.op-entree').css("display","none");
  $('.op-general').css("display","block");
  $('.champ-frais').css("display","block");
}

handleClick(operateur='', e, operation=''){
  if(operateur=="Entree"){
    $('.champ-entree').css("display","none");
    $('.champ-frais').css("display","none");
    $('.op-entree').css("display","block");
    $('.op-general').css("display","none");
    $('.champ-transaction').css("margin-left","100px");
  }else{
    $('.op-entree').css("display","none");
    $('.op-general').css("display","block");
    $('.champ-entree').css("display","block");
    $('.champ-transaction').css("margin-left","0px");
    $('.champ-frais').css("display","block");
  }
    this.clickColor();
    this.setState({rendor:operateur}); 
    this.componentDidMount(operateur,operation);
    $('.'+operateur).css("background-color","#20a8d8");
    $('.'+operateur).css("color","#fff");
}
clickColor=()=>{
  $('.Free').css({ 'color' :'', 'background-color' : '', 'opacity' : '' });
  $('.Wari').css({ 'color' :'', 'background-color' : '', 'opacity' : '' });
  $('.Expresso').css({ 'color' :'', 'background-color' : '', 'opacity' : '' });
  $('.Proximo').css({ 'color' :'', 'background-color' : '', 'opacity' : '' });
  $('.Banque').css({ 'color' :'', 'background-color' : '', 'opacity' : '' });
  $('.Xpress').css({ 'color' :'', 'background-color' : '', 'opacity' : '' });
  $('.Wizall').css({ 'color' :'', 'background-color' : '', 'opacity' : '' });
  $('.Yup').css({ 'color' :'', 'background-color' : '', 'opacity' : '' });
  $('.Wave').css({ 'color' :'', 'background-color' : '', 'opacity' : '' });
  $('.Plafonnement').css({ 'color' :'', 'background-color' : '', 'opacity' : '' });
  $('.Entree').css({ 'color' :'', 'background-color' : '', 'opacity' : '' });
  $('.Orange').css({ 'color' :'', 'background-color' : '', 'opacity' : '' });
}
handleClickOperation(operation){
    $('#operation').html("Opération | "+operation);
    document.getElementById("operationval").value = ""+operation;
    
}


handleEncaiss=(e)=>{
  e.preventDefault();
  $('.confirmation-e').css("display","block");
  $('.validation-e').css("display","none");
  var data={};
  var jr;
  this.setState({open:false}) ;
  this.setState({ouvrir:false}) ;
  var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
  var date=new Date();
  const NewDate= format(date,'dd/MM/yyyy');
  var numero=idU+""+"Enc"+date.getFullYear()+""+date.getHours()+""+date.getMinutes()+""+date.getSeconds();
  try{
  if(localStorage.getItem('etatdelajourne')=="ok"){
    
  if($('#operateurval').val()=="plafonnement"){
    data={operateur:$('#operateurval').val(),operation:$('#operationval').val(),decaissement:0 ,
    commission:0,encaissement:0,frais:$('#frais').val(),taxe:0,montant: $('#montant').val(),surplux:0,numero:numero,
    sens:"encaissement",reference:$('#reference').val(),credit:"caisse",debit:$('#operationval').val(),idU:idU,date:NewDate,status:1 }
  }else if($('#operateurval').val()=="Entree"){
    data={operateur:$('#operateurval').val(),operation:$('#operatione').val(),decaissement:0 ,
    commission:0,encaissement:0,frais:0,taxe:0,montant: $('#montant').val(),surplux:0,numero:numero,
    sens:"encaissement",reference:$('#reference').val(),credit:"0",debit:"caisse",idU:idU,date:NewDate,status:1 }
  }else{
 
  data={operateur:$('#operateurval').val(),operation:$('#operationval').val(),decaissement:0 ,
  commission:0,encaissement:$('#montant').val(),frais:$('#frais').val(),taxe:0,montant: $('#montant').val(),surplux:$('#frais').val(),numero:numero,
  sens:"encaissement",reference:$('#reference').val(),credit:$('#operateurval').val(),debit:"caisse",idU:idU,date:NewDate,status:1 }
}
  axios.post('https://rawade-api.herokuapp.com/api/transactions/ajouter/',data)
  .then((response) => {
    this.actualiseOk();
    $('#operateurval').val('');
    $('#operationval').val('');
    $('#montant').val('');
    $('#frais').val('');
    $('#reference').val('');
 })
 
}else{
  this.actualise();
}
}catch(exception){
 //this.actualise();
}

}

async actualiseOk() {
  $('.confirmation-e').css("display","none");
  $('.validation-e').css("display","block");
  this.setState({ouvrir:true});

  if(this.state.showSucces!=""){
    this.setState({showSucces:""});
    this.setState({mgsucc:<ValidationOk open={this.state.ouvrir} message="Encaissement effectué avec succès"/>})
   
    await sleep(2000);
    this.setState({ok: <Redirect to='/caisse' />});
  }

  if(this.state.mgsucc!=""){
    this.setState({mgsucc:""});
    this.setState({showSucces:<ValidationOk open={this.state.ouvrir} message="Encaissement effectué avec succès"/>})
  }

}

actualise=()=>{
  this.setState({open:true});
  if(this.state.showErrorMsg!=""){
    this.setState({showErrorMsg:""});
    this.setState({mgerro:<ValidationWarning message="Veuillez Débuter votre journée" open={this.state.open}/>})
  }
  if(this.state.mgerro!=""){
    this.setState({mgerro:""});
    this.setState({showErrorMsg:<ValidationWarning message="Veuillez Débuter votre journée" open={this.state.open}/>})
  }

}
_renderSubComp(){
    switch(this.state.rendor){
        case 'Orange': return <Orange handleClickOperation={this.handleClickOperation}/>
        case 'Wari' : return <Wari  handleClickOperation={this.handleClickOperation}/>
        case 'Free': return <Free handleClickOperation={this.handleClickOperation}/>
        case 'Expresso': return <Expresso handleClickOperation={this.handleClickOperation}/>
        case 'Proximo': return <Proximo handleClickOperation={this.handleClickOperation}/>
        case 'Banque': return <Banque handleClickOperation={this.handleClickOperation}/>
        case 'Xpress': return <Xpress handleClickOperation={this.handleClickOperation}/>
        case 'Wizall': return <Wizall handleClickOperation={this.handleClickOperation}/>
        case 'Yup': return <Yup handleClickOperation={this.handleClickOperation}/>
        case 'Wave': return <Wave handleClickOperation={this.handleClickOperation}/>
        case 'Plafonnement': return <Plafonnement handleClickOperation={this.handleClickOperation}/>
        case 'Entree': return <Entree handleClickOperation={this.handleClickOperation}/>
        default:
    }
    
}

  render() {

    return (
      <>
     
     {this.state.showSucces} {this.state.mgsucc}
    
    {this.state.showErrorMsg}  {this.state.mgerro}
    {this.state.ok}
      <div class ="row-12 mt-4">
        <div class="card text-white text-center bg-dark text-success">
          <div class="card-body align-middle">
            <h1>Encaissement</h1>
          </div>
        </div>
      </div>
    
      <div class ="row">

        

        <div class ="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div class="card text-white bg-dark">

            <div class="card-header" id="operateur">
              Opérateurs
            </div>

            <div class="card-body">
              <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button type="button" className="btn btn-lg btn-outline-success mb-2 Orange" aria-selected="true" onClick={this.handleClick.bind(this, 'Orange')}>Orange</button>
                <button type="button" className="btn btn-lg btn-outline-success mb-2 Wari" aria-selected="true" onClick={this.handleClick.bind(this, 'Wari')}>Wari</button>
                <button type="button" className="btn btn-lg btn-outline-success mb-2 Free" aria-selected="true" onClick={this.handleClick.bind(this, 'Free')}>Free</button>
                <button type="button" className="btn btn-lg btn-outline-success mb-2 Expresso" aria-selected="true" onClick={this.handleClick.bind(this, 'Expresso')}>Expresso</button>
                <button type="button" className="btn btn-lg btn-outline-success mb-2 Proximo" aria-selected="true" onClick={this.handleClick.bind(this, 'Proximo')}>Proximo</button>
                <button type="button" className="btn btn-lg btn-outline-success mb-2 Banque" aria-selected="true" onClick={this.handleClick.bind(this, 'Banque')}>Banque</button>
                <button type="button" className="btn btn-lg btn-outline-success mb-2 Xpress" aria-selected="true" onClick={this.handleClick.bind(this, 'Xpress')}>Xpress</button>
                <button type="button" className="btn btn-lg btn-outline-success mb-2 Wizall" aria-selected="true" onClick={this.handleClick.bind(this, 'Wizall')}>Wizall</button>
                <button type="button" className="btn btn-lg btn-outline-success mb-2 Yup" aria-selected="true" onClick={this.handleClick.bind(this, 'Yup')}>Yup</button>
                <button type="button" className="btn btn-lg btn-outline-success mb-2 Wave" aria-selected="true" onClick={this.handleClick.bind(this, 'Wave')}>Wave</button>
                <button type="button" className="btn btn-lg btn-outline-success mb-2 Plafonnement" aria-selected="true" onClick={this.handleClick.bind(this, 'Plafonnement')}>Plafonnement</button>
                <button type="button" className="btn btn-lg btn-outline-success mb-2 Entree" aria-selected="true" onClick={this.handleClick.bind(this, 'Entree')}>Entree</button>
                
              </div>
            </div>
          </div>
        </div>

               
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 champ-entree">
          <div class="card text-white bg-dark">

            <div class="card-header" id="operation">
              Opérations
            </div>

            <div class="card-body">
              {this._renderSubComp()}
            </div>

          </div>
        </div>


        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 champ-transaction">
        <div class="card text-white bg-dark">
          <div class="card-header" id="affichage">
            Transaction 
          </div>
          <div class="card-body">
            <form>

              <div class="form-group">
                <label for="operateur">Opérateur</label>
                <input type="text" class="form-control" id="operateurval" 
                name="operateur" placeholder="Opérateur" readOnly/>
              </div>

              <div class="form-group op-general">
                <label for="operation">Opération</label>
                <input type="text" class="form-control" id="operationval"
                name="operation" placeholder="Opération" readOnly/>
              </div>
              <div class="form-group op-entree">
                <label for="operation">Opération</label>
                <input type="text" class="form-control" id="operatione"
                name="operation" placeholder="Opération" />
              </div>

              <div class="form-group">
                <label for="montant">Montant</label>
                <input type="number" class="form-control" id="montant" min="0" step="1" 
                name="montant" placeholder="Montant" />
              </div>

              <div class="form-group champ-frais">
                <label for="frais">Frais</label>
                <input name="frais" type="number" class="form-control" id="frais" min="0" step="1" 
                placeholder="Frais"/>
              </div>

              <div class="form-group">
                <label  for="reference">Référence</label>
                <input name="reference" type="text" id="reference" class="form-control"/>
              </div>

              <div class="form-group ">
                <span onClick={this.handleEncaiss.bind(this)}  class="form-check-label btn btn-lg btn-success enc validation-e ">Valider</span>
                <button class="btn btn-success  confirmation-e" type="button" disabled>
                    <span class="spinner-border spinner-border-sm  " role="status" aria-hidden="true"></span> En cours...
                 </button>
              </div>

            </form>
          </div>
        </div>
        </div>
      </div>
      </>
    )
  }
  
}
const Orange =  ({handleClickOperation}) => {
  // render(){

      return <>
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true " onClick={handleClickOperation.bind(this,"Sedo")} >Sedo</button>
        <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Orange money")} >Dépot Orange money</button>
      </div>
      </>
  //}
}
const Wari =  ({handleClickOperation}) => {
      return <>
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie Wari")}>Envoie Wari</button>
        <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SDE")}>SDE</button>
        <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SENELEC")}>SENELEC</button>
        <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"WOYOFAL")}>WOYOFAL</button>
        <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"CANAL +")}>CANAL +</button>
      </div>
      </>
  
}
const Free =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Free cash")}>Dépot Free cash</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Izi")}>Izi</button>
      
    </div>
    </>
  
}

const Expresso =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot e-money")}>Dépot e-money</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Yakalma")}>Yakalma</button>
      
    </div>
    </>
  
}

const Proximo =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SDE")}>SDE</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SENELEC")}>SENELEC</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"WOYOFAL")}>WOYOFAL</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"CAMPUSEN")}>CAMPUSEN</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"RAPIDO")}>RAPIDO</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot OM")}>Dépot OM</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Free Cash")}>Dépot Free Cash</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot e-Money")}>Dépot e-Money</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Wizall")}>Dépot Wizall</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Poste cash")}>Dépot Poste cash</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie Joni-Joni")}>Envoie Joni-Joni</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie ProxiCash")}>Envoie ProxiCash</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie Lamp Fall")}>Envoie Lamp Fall</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Carte Jula")}>Carte Jula</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Paiement LONASE")}>Paiement LONASE</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SEDO")}>SEDO</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"YAKALMA")}>YAKALMA</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"IZI")}>IZI</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Autre")}>Autre</button>

      
    </div>
    </>
  
}

const Banque =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie  Western-Union")}>Envoie  Western-Union</button>
    </div>
    </>
  
}

const Xpress =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Versement Ecobank")}>Versement Ecobank</button>
    </div>
    </>
  
}
const Wizall =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SDE")}>SDE</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SENELEC")}>SENELEC</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"WOYOFAL")}>WOYOFAL</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"CAMPUSEN")}>CAMPUSEN</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"RAPIDO")}>RAPIDO</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot OM")}>Dépot OM</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Free Cash")}>Dépot Free Cash</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot e-Money")}>Dépot e-Money</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Wizall")}>Dépot Wizall</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Poste cash")}>Dépot Poste cash</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie Joni-Joni")}>Envoie Joni-Joni</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie ProxiCash")}>Envoie ProxiCash</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie Lamp Fall")}>Envoie Lamp Fall</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Carte Jula")}>Carte Jula</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Paiement LONASE")}>Paiement LONASE</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SEDO")}>SEDO</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"YAKALMA")}>YAKALMA</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"IZI")}>IZI</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Autre")}>Autre</button> 
    </div>
    </>
  
}
const Yup =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot YUP")}>Dépot YUP</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SDE")}>SDE</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SENELEC")}>SENELEC</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"WOYOFAL")}>WOYOFAL</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"RAPIDO")}>RAPIDO</button>
      
    </div>
    </>
  
}
const Wave =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Wave")}>Dépot Wave</button>
    </div>
    </>
  
}
const Plafonnement =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Orange")}>Orange</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Wari")}>Wari</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Free")}>Free</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Expresso")}>Expresso</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Proximo")}>Proximo</button>

      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Banque")}>Banque</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Xpress")}>Xpress</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Wizall")}>Wizall</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Yup")}>Yup</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Wave")}>Wave</button>
      
    </div>
    </>
  
}
const Entree =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Surplus caisse")}>Surplus caisse</button>
      <button type="button" class="btn btn-lg btn-outline-success mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Commission")}>Commission</button>
      
    </div>
    </>
  
}

export default Encaissement;
