

import React, { Component } from 'react';
// import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
// import {render} from "react-dom"
import $ from 'jquery';
import axios from 'axios';
import ValidationOk from './ValidationOk'

class ModifierEncaissement extends Component {
 
componentDidMount(operateur='',operation=''){
  $('#operateur').html("Opérateur | "+operateur);
  $('#operation').html("Opération | "+operation);

  document.getElementById("txtoperateur").value = ""+operateur;
  $('#txtoperation').val(this.produit().operation);
  $('#txtoperateur').val(this.produit().operateur);
  $('#montant').val(this.produit().encaissement);
  $('#frais').val(this.produit().frais);
  $('#reference').val(this.produit().reference);
  if(this.produit().operateur=="Plafonnement"){
    $('#plaf').click();
    this.typeOperation();
    $('#entre').css("display","none");
  }else if(this.produit().operateur=="Entree"){
    $('#entre').click();
    this.typeOperation();
    $('#plaf').css("display","none");
  }else{
    $('#plaf').css("display","none");
    $('#entre').css("display","none");
  }
  $("#operateur").val(this.produit().operateur);
  $("#operation").val(this.produit().operation);
  
}

constructor(props){
  super(props);
  this.state = {rendor:'',rendor2:'',id:this.produit().id,showSucces:false}
  this.handleupdate.bind(this);
}
typeOperation=()=>{
  $('#or').css("display","none");
  $('#war').css("display","none");
  $('#exp').css("display","none");
  $('#pr').css("display","none");
  $('#prox').css("display","none");
  $('#banq').css("display","none");
  $('#xp').css("display","none");
  $('#wiz').css("display","none");
  $('#yu').css("display","none");
  $('#wav').css("display","none");
 
}
produit=()=>{
  return this.props.caisse
}
handleClick(operateur='', e, operation=''){
    //console.log(operateur);
    this.setState({rendor:operateur}); 
    this.componentDidMount(operateur,operation);
    document.getElementById("txtoperateur").value = ""+operateur;
}
handleupdate(e){
var data={};
  e.preventDefault();
  this.setState({showSucces:false})   ;
  if($('#txtoperation').val()=="plafonnement"){
    data={operateur:$('#txtoperateur').val(),operation:$('#txtoperation').val(),decaissement:0 ,
    commission:0,encaissement:0,frais:$('#frais').val(),taxe:0,montant: $('#montant').val(),surplux:0,numero:this.produit().numero,
    sens:"encaissement",reference:$('#reference').val(),credit:"caisse",debit:$('#txtoperation').val(),idU:this.produit().idU,date:this.produit().date,status:1 }
  }else if($('#txtoperation').val()=="Entrée"){
    data={operateur:$('#txtoperateur').val(),operation:$('#txtoperation').val(),decaissement:0 ,
    commission:0,encaissement:0,frais:$('#frais').val(),taxe:0,montant: $('#montant').val(),surplux:0,numero:this.produit().numero,
    sens:"encaissement",reference:$('#reference').val(),credit:"0",debit:"caisse",idU:this.produit().idU,date:this.produit().date,status:1 }
  }else{
 
  data={operateur:$('#txtoperateur').val(),operation:$('#txtoperation').val(),decaissement:0 ,
  commission:0,encaissement:$('#montant').val(),frais:$('#frais').val(),taxe:0,montant: $('#montant').val(),surplux:$('#frais').val(),numero:this.produit().numero,
  sens:"encaissement",reference:$('#reference').val(),credit:$('#txtoperateur').val(),debit:"caisse",idU:this.produit().idU,date:this.produit().date,status:1 }
  }
  axios.put('https://rawade-api.herokuapp.com/api/transactions/modifier/'+this.state.id,data)
  this.setState({showSucces:true})   ;
  $('#txtoperateur').val('');
  $('#txtoperation').val('');
  $('#montant').val('');
  $('#frais').val('');
  $('#reference').val('');
  setTimeout(
    
    function() 
    {
      window.location.reload(false);
    }, 2000);   
  

}
handleClickOperation(operation){
    //console.log(operateur);
    //this.setState({rendor2:operation}); 
    $('#operation').html("Opération | "+operation);
    document.getElementById("txtoperation").value = ""+operation;
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
    }
    
}
produit(){return this.props.caisse}
  render() {

    return (
      <>
      {
       (this.state.showSucces) ?
         (<ValidationOk message="Opération effectué avec succès"/>) : null
      }
      <div class ="row-12">
        <div class="card  text-white bg-dark">

          {/* <div class="card-header">
            
          </div> */}

          <div class="card-body align-middle">
            <h1>Modifier encaissement</h1>
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
                <button id="or" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Orange')}>Orange</button>
                <button id="war" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Wari')}>Wari</button>
                <button id="exp" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Free')}>Free</button>
                <button id="pr" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Expresso')}>Expresso</button>
                <button id="prox" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Proximo')}>Proximo</button>
                <button id="banq" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Banque')}>Banque</button>
                <button id="xp" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Xpress')}>Xpress</button>
                <button id="wiz" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Wizall')}>Wizall</button>
                <button id="yu" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Yup')}>Yup</button>
                <button id="wav" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Wave')}>Wave</button>
                <button id="plaf" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Plafonnement')}>Plafonnement</button>
                <button id="entre" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Entree')}>Entree</button>

              </div>
            </div>
          </div>
        </div>

               
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div class="card text-white bg-dark">

            <div class="card-header" id="operation">
              Opérations
            </div>

            <div class="card-body">
              {this._renderSubComp()}
            </div>

          </div>
        </div>


        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <div class="card text-white bg-dark">
          <div class="card-header" id="affichage">
            Transaction 
          </div>
          <div class="card-body">
            <form>

              <div class="form-group">
                <label for="operateur">Opérateur</label>
                <input type="text" class="form-control" id="txtoperateur" 
                name="operateur" placeholder="Opérateur" readOnly/>
              </div>

              <div class="form-group">
                <label for="operation">Opération</label>
                <input type="text" class="form-control" id="txtoperation"
                name="operation" placeholder="Opération" readOnly/>
              </div>

              <div class="form-group">
                <label for="montant">Montant</label>
                <input type="number" class="form-control" id="montant" min="0" step="1" 
                name="Montant" placeholder="Montant" />
              </div>

              <div class="form-group">
                <label for="frais">Frais</label>
                <input type="number" class="form-control" id="frais" min="0" step="1" 
                placeholder="Frais"/>
              </div>

              <div class="form-group">
                <label  for="reference">Référence</label>
                <input type="text" id="reference" class="form-control"/>
              </div>

              <div class="form-check">
                <button onClick={this.handleupdate.bind(this)} class="form-check-label" class="btn btn-primary">Valider</button>
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
        <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true " onClick={handleClickOperation.bind(this,"Sedo")} >Sedo</button>
        <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Orange money")} >Dépot Orange money</button>
      </div>
      </>
  //}
}
const Wari =  ({handleClickOperation}) => {
      return <>
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie Wari")}>Envoie Wari</button>
        <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SDE")}>SDE</button>
        <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SENELEC")}>SENELEC</button>
        <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"WOYOFAL")}>WOYOFAL</button>
        <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"CANAL +")}>CANAL +</button>
      </div>
      </>
  
}
const Free =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Free cash")}>Dépot Free cash</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Izi")}>Izi</button>
      
    </div>
    </>
  
}

const Expresso =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot e-money")}>Dépot e-money</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Yakalma")}>Yakalma</button>
      
    </div>
    </>
  
}

const Proximo =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SDE")}>SDE</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SENELEC")}>SENELEC</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"WOYOFAL")}>WOYOFAL</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"CAMPUSEN")}>CAMPUSEN</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"RAPIDO")}>RAPIDO</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot OM")}>Dépot OM</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Tigo Cash")}>Dépot Tigo Cash</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot e-Money")}>Dépot e-Money</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Wizal")}>Dépot Wizal</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Poste cash")}>Dépot Poste cash</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie Joni-Joni")}>Envoie Joni-Joni</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie ProxiCash")}>Envoie ProxiCash</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie Lamp Fall")}>Envoie Lamp Fall</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Carte Jula")}>Carte Jula</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Paiement LONASE")}>Paiement LONASE</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SEDO")}>SEDO</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"YAKALMA")}>YAKALMA</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"IZI")}>IZI</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Autre")}>Autre</button>

      
    </div>
    </>
  
}

const Banque =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie  Western-Union")}>Envoie  Western-Union</button>
    </div>
    </>
  
}

const Xpress =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Versement Ecobank")}>Versement Ecobank</button>
    </div>
    </>
  
}
const Wizall =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SDE")}>SDE</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SENELEC")}>SENELEC</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"WOYOFAL")}>WOYOFAL</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"CAMPUSEN")}>CAMPUSEN</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"RAPIDO")}>RAPIDO</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot OM")}>Dépot OM</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Tigo Cash")}>Dépot Tigo Cash</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot e-Money")}>Dépot e-Money</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Wizal")}>Dépot Wizal</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Poste cash")}>Dépot Poste cash</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie Joni-Joni")}>Envoie Joni-Joni</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie ProxiCash")}>Envoie ProxiCash</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Envoie Lamp Fall")}>Envoie Lamp Fall</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Carte Jula")}>Carte Jula</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Paiement LONASE")}>Paiement LONASE</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SEDO")}>SEDO</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"YAKALMA")}>YAKALMA</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"IZI")}>IZI</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Autre")}>Autre</button> 
    </div>
    </>
  
}
const Yup =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot YUP")}>Dépot YUP</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SDE")}>SDE</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"SENELEC")}>SENELEC</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"WOYOFAL")}>WOYOFAL</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"RAPIDO")}>RAPIDO</button>
      
    </div>
    </>
  
}
const Wave =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Dépot Wave")}>Dépot Wave</button>
    </div>
    </>
  
}
const Plafonnement =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Orange")}>Orange</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Wari")}>Wari</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Free")}>Free</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Expresso")}>Expresso</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Proximo")}>Proximo</button>

      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Banque")}>Banque</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Xpress")}>Xpress</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Wizall")}>Wizall</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Yup")}>Yup</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Wave")}>Wave</button>
      
    </div>
    </>
  
}
const Entree =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Surplus caisse")}>Surplus caisse</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Commission")}>Commission</button>
      
    </div>
    </>
  
}

export default ModifierEncaissement;
