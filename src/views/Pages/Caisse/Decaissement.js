

import React, { Component } from 'react';
//import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import $ from 'jquery';
import axios from 'axios'
import Notification from './MessageSucces'
import { format } from 'date-fns';
import ValidationOk from './ValidationOk'
import ValidationWarning from './ValidationWarning'
import './Decaissement.css'
import  { Redirect } from 'react-router-dom'
import sleep from 'await-sleep'
class Decaissement extends Component {
  constructor(){
    super();
    this.state = {rendor:'',rendor2:'',mgerro:"",mgsucc:"",showSucces:" ",showErrorMsg:" ",open:true,ouvrir:true,
  ok:''}
    this.handleDecaiss.bind(this)
    $('.champ-sortie').css("display","block");
    $('.champ-transaction').css("margin-left","0px");

    $('.op-sortie').css("display","none");
    $('.op-general').css("display","block");
    $('.champ-commission').css("display","block");


  }

  componentDidMount(operateur='',operation=''){
    $('#operateur').text("Opérateur | "+operateur);
    $('#operation').text("Opération | "+operation);

    document.getElementById("txtoperateur").value = ""+operateur;
    $('.confirmation-d').css("display","none");
    $('.validation-d').css("display","block");
    
  }

handleDecaiss=(e)=>{

  e.preventDefault();
  $('.confirmation-d').css("display","block");
  $('.validation-d').css("display","none");
  var data={}
  var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
  var date=new Date();
 
  this.setState({open:false}) ;
  this.setState({ouvrir:false}) ;
  const NewDate= format(date,'dd/MM/yyyy');
  var numero=idU+""+"Dec"+date.getFullYear()+""+date.getHours()+""+date.getMinutes()+""+date.getSeconds();
  try{
    if(localStorage.getItem('etatdelajourne')==="ok"){
  if($('#txtoperateur').val()=="deplafonnement"){
    data={operateur:$('#txtoperateur').val(),operation:$('#txtoperation').val(),decaissement:0 ,
    commission:$('#commission').val(),encaissement:0,frais:0,taxe:0,montant: $('#montant').val(),surplux:0,numero:numero,
    sens:"decaissement",reference:$('#reference').val(),credit:"caisse",debit:$('#txtoperateur').val(),idU:idU,date:NewDate,status:1 }
  }else if($('#txtoperateur').val()=="sortie"){
    
    data={operateur:$('#txtoperateur').val(),operation:$('#soperation').val(),decaissement:0 ,
    commission:0,encaissement:0,frais:0,taxe:0,montant: $('#montant').val(),surplux:0,numero:numero,
    sens:"decaissement",reference:$('#reference').val(),credit:"caisse",debit:$('#txtoperateur').val(),idU:idU,date:NewDate,status:1 }
  }else{
    data={operateur:$('#txtoperateur').val(),operation:$('#txtoperation').val(),decaissement:$('#montant').val() ,
    commission:$('#commission').val(),encaissement:0,frais:0,taxe:0,montant: $('#montant').val(),surplux:$('#commission').val(),numero:numero,
    sens:"decaissement",reference:$('#reference').val(),credit:"caisse",debit:$('#txtoperateur').val(),idU:idU,date:NewDate,status:1 }
  }
   axios.post('https://rawade-api.herokuapp.com/api/transactions/ajouter/',data)
   .then((response) => {
    this.actualiseOk();
    $('#txtoperateur').val('');
    $('#txtoperation').val('');
    $('#montant').val('');
    $('#commission').val('');
    $('#reference').val('');
     
   })
 

    }else{
      $('.confirmation-d').css("display","none");
      $('.validation-d').css("display","block");
      this.actualise();
    }
  }catch(exception){
    // this.setState({showError:false});
    // this.setState({showError:true});
  }
  
 
  
}

async actualiseOk() {
  var donne=''
  $('.confirmation-d').css("display","none");
    $('.validation-d').css("display","block");
  this.setState({ouvrir:true}) ;
  if(this.state.showSucces!=""){
    this.setState({showSucces:""});
    this.setState({mgsucc:<ValidationOk open={this.state.ouvrir} message="Décaissement effectué avec succès"/>})
    await sleep(2000);
    this.setState({ok: <Redirect to='/caisse'  />});
 
  }
  if(this.state.mgsucc!=""){
    this.setState({mgsucc:""});
    this.setState({showSucces:<ValidationOk open={this.state.ouvrir} message="Décaissement effectué avec succès"/>})
  }

}

actualise=()=>{
  this.setState({open:true}) ;
  if(this.state.showErrorMsg!=""){
    this.setState({showErrorMsg:""});
    this.setState({mgerro:<ValidationWarning message="Veuillez Débuter votre journée" open={this.state.open}/>})
  }
  if(this.state.mgerro!=""){
    this.setState({mgerro:""});
    this.setState({showErrorMsg:<ValidationWarning message="Veuillez Débuter votre journée" open={this.state.open}/>})
  }

}

  handleClick(operateur='', e, operation=''){
    //console.log(operateur);
    if(operateur=="Sortie"){
      $('.champ-sortie').css("display","none");
      $('.op-sortie').css("display","block");
      $('.op-general').css("display","none");
      $('.champ-transaction').css("margin-left","100px");
      $('.champ-commission').css("display","none");
    }else{
      $('.op-sortie').css("display","none");
      $('.op-general').css("display","block");
      $('.champ-sortie').css("display","block");
      $('.champ-transaction').css("margin-left","0px");
      $('.champ-commission').css("display","block");
    }
    this.setState({rendor:operateur});
    this.componentDidMount(operateur,operation);
  }
handleClickOperation(operation){
    //console.log(operateur);
    //this.setState({rendor2:operation}); 
    $('#operation').text("Opération | "+operation);
    document.getElementById("txtoperation").value = ""+operation;
  
}
_renderSubComp(){
  switch(this.state.rendor){
      case 'Orange': return <Orange handleClickOperation={this.handleClickOperation}/>
      case 'Wari' : return <Wari handleClickOperation={this.handleClickOperation}/>
      case 'Free': return <Free handleClickOperation={this.handleClickOperation}/>
      case 'Expresso': return <Expresso handleClickOperation={this.handleClickOperation}/>
      case 'Proximo': return <Proximo handleClickOperation={this.handleClickOperation}/>
      case 'Banque': return <Banque handleClickOperation={this.handleClickOperation}/>
      case 'Xpress': return <Xpress handleClickOperation={this.handleClickOperation}/>
      case 'Wizall': return <Wizall handleClickOperation={this.handleClickOperation}/>
      case 'Yup': return <Yup handleClickOperation={this.handleClickOperation}/>
      case 'Wave': return <Wave handleClickOperation={this.handleClickOperation}/>
      case 'Deplafonnement': return <Deplafonnement handleClickOperation={this.handleClickOperation}/>
      case 'Sortie': return <Sortie handleClickOperation={this.handleClickOperation}/>
  }
}

  render() {
    return (
      <>
    
    {this.state.showSucces} {this.state.mgsucc}
    
    {this.state.showErrorMsg}   {this.state.mgerro}
     {this.state.ok}
      <div class ="row-12 mt-4">
        <div class="card text-white text-center bg-dark text-danger">
          <div class="card-body align-middle">
            <h1>Décaissement</h1>
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
            <button type="button" class="btn btn-lg btn-outline-danger mb-2" id="Orange" aria-selected="true" onClick={this.handleClick.bind(this, 'Orange')}>Orange</button>
            <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Wari')}>Wari</button>
            <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Free')}>Free</button>
            <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Expresso')}>Expresso</button>
            <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" aria-selected="true" onClick={this.handleClick.bind(this, 'Proximo')}>Proximo</button>
            <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" aria-selected="true" onClick={this.handleClick.bind(this, 'Banque')}>Banque</button>
            <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" aria-selected="true" onClick={this.handleClick.bind(this, 'Xpress')}>Xpress</button>
            <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" aria-selected="true" onClick={this.handleClick.bind(this, 'Wizall')}>Wizall</button>
            <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" aria-selected="true" onClick={this.handleClick.bind(this, 'Yup')}>Yup</button>
            <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" aria-selected="true" onClick={this.handleClick.bind(this, 'Wave')}>Wave</button>
            <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" aria-selected="true" onClick={this.handleClick.bind(this, 'Deplafonnement')}>Deplafonnement</button>
            <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" aria-selected="true" onClick={this.handleClick.bind(this, 'Sortie')}>Sortie</button>

          </div>
          </div>
          </div>
        </div>

                {/* <button type="button" class="btn btn-danger" onClick={this.handleClick.bind(this, 'chockers')}>Chokers</button>
                <button type="button" class="btn btn-danger" onClick={this.handleClick.bind(this, 'bracelets')}>Bracelets</button>
                <button type="button" class="btn btn-danger" onClick={this.handleClick.bind(this, 'rings')}>Rings for Women</button> */}
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 champ-sortie">
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

          <div class="card-header">
            Transaction
          </div>

          <div class="card-body">
            <form>

              <div class="form-group">
                <label for="operateur">Opérateur</label>
                <input type="text" class="form-control" id="txtoperateur" 
                name="operateur" placeholder="Opérateur" readOnly/>
              </div>

              <div class="form-group op-general">
                <label for="operation">Opération</label>
                <input type="text" class="form-control" id="txtoperation"
                name="operation" placeholder="Opération" readOnly/>
              </div>
              <div class="form-group op-sortie">
                <label for="operation">Opération</label>
                <input type="text" class="form-control" id="soperation"
                name="operation" placeholder="Opération" />
              </div>
              <div class="form-group">
                <label for="montant">Montant</label>
                <input type="number" class="form-control" id="montant" min="0" step="1" 
                name="Montant" placeholder="Montant" />
              </div>

              <div class="form-group champ-commission">
                <label for="commission">Commission</label>
                <input type="number" class="form-control" id="commission" min="0" step="1" 
                placeholder="Commission"/>
              </div>

              <div class="form-group">
                <label  for="reference">Référence</label>
                <input type="text" id="reference" class="form-control"/>
              </div>

              <div class="form-group">
                <button onClick={this.handleDecaiss.bind(this)}  class="form-check-label btn btn-lg btn-danger dec  validation-d">Décaisser</button>
                <button class="btn btn-danger confirmation-d" type="button" disabled>
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
      return <>
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait OM")}>Retrait OM</button>
        <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button>
      </div>
      </>
}

const Wari =  ({handleClickOperation}) => {
      return <>
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Wari")}>Retrait Wari</button>
        <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button>
      </div>
      </>
}
const Free =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Free Money")}>Retrait Free Money</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button>
    </div>
    </>
}

const Expresso =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait e-Money")}>Retrait e-Money</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button> 
    </div>
    </>
}

const Proximo =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait OM")}>Retrait OM</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Free money")}>Retrait Free money</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait e-Money")}>Retrait e-Money</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Wizall")}>Retrait Wizall</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Joni Joni")}>Retrait Joni Joni</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait ProxiCash")}>Retrait ProxiCash</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Ria")}>Retrait Ria</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait TrasFast")}>Retrait TrasFast</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Lamp Fall")}>Retrait Lamp Fall</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Small World")}>Retrait Small World</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Poste Cash")}>Retrait Poste Cash</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button>
    </div>
    </>
}

const Banque =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Ria")}>Retrait Ria</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Western Union")}>Retrait Western Union</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait MoneyGram")}>Retrait MoneyGram</button>
    </div>
    </>
}

const Xpress =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Ecobank")}>Retrait Ecobank</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button>
    </div>
    </>
}

const Wizall =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Wizall")}>Retrait Wizall</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button>
    </div>
    </>
}
const Yup =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait YUP")}>Retrait YUP</button>
    </div>
    </>
  
}
const Wave =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Wave")}>Retrait Wave</button>  
    </div>
    </>
}

const Deplafonnement =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Orange")}>Orange</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Wari")}>Wari</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Free")}>Free</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Expresso")}>Expresso</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Proximo")}>Proximo</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Banque")}>Banque</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Xpress")}>Xpress</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Wizall")}>Wizall</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Yup")}>Yup</button>
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Wave")}>Wave</button>
    </div>
    </>
}
const Sortie =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-danger mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Manquant Caisse")}>Manquant Caisse</button>
    </div>
    </>
  
}
export default Decaissement;