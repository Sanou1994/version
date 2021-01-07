

import React, { Component } from 'react';
//import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import $ from 'jquery';
import axios from 'axios';
import './caisse.css';
import MessageSucces from './MessageSucces'
import MessageSupprimer from './MessageSupprimer'
import ValidationOk from './ValidationOk'
class ModifierDecaissement extends Component {

  constructor(props){
    super(props);
    this.state = {rendor:'',rendor2:'',showSucces:false}
    this.handleupdate.bind(this);
    
    console.log("donne "+this.produit().operation);
  }

  produit=()=>{
    return this.props.caisse
  }
  componentDidMount(operateur='',operation=''){
    $('#operateur').text("Opérateur | "+operateur);
    $('#operation').text("Opération | "+operation);

    document.getElementById("txtoperateur").value = ""+operateur;
    $('#txtoperation').val(this.produit().operation);
    $('#txtoperateur').val(this.produit().operateur);
    $('#montant').val(this.produit().decaissement);
    $('#commission').val(this.produit().commission);
    $('#reference').val(this.produit().reference);

    if(this.produit().operateur=="Deplafonnement"){
      $('#plaf').click();
      this.typeOperation();
      $('#entre').css("display","none");
    }else if(this.produit().operateur=="Sortie"){
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
  handleupdate(e){
  var data={};
    e.preventDefault();
    this.setState({showSucces:false})   ;
    if($('#txtoperation').val()=="deplafonnement"){
      data={operateur:$('#txtoperateur').val(),operation:$('#txtoperation').val(),decaissement:0 ,
      commission:$('#commission').val(),encaissement:0,frais:0,taxe:0,montant: $('#montant').val(),surplux:0,numero:this.produit().numero,
      sens:"decaissement",reference:$('#reference').val(),credit:"caisse",debit:$('#txtoperateur').val(),idU:this.produit().idU,date:this.produit().date,status:1 }
    }else if($('#txtoperation').val()=="sortie"){
      data={operateur:$('#txtoperateur').val(),operation:$('#txtoperation').val(),decaissement:0 ,
      commission:$('#commission').val(),encaissement:0,frais:0,taxe:0,montant: $('#montant').val(),surplux:0,numero:this.produit().numero,
      sens:"decaissement",reference:$('#reference').val(),credit:"caisse",debit:$('#txtoperateur').val(),idU:this.produit().idU,date:this.produit().date,status:1 }
    }else{
      data={operateur:$('#txtoperateur').val(),operation:$('#txtoperation').val(),decaissement:$('#montant').val() ,
      commission:$('#commission').val(),encaissement:0,frais:0,taxe:0,montant: $('#montant').val(),surplux:$('#commission').val(),numero:this.produit().numero,
      sens:"decaissement",reference:$('#reference').val(),credit:"caisse",debit:$('#txtoperateur').val(),idU:this.produit().idU,date:this.produit().date,status:1 }
    }
    axios.put('http://localhost:8080/api/transactions/modifier/'+this.produit().id,data)
    this.setState({showSucces:true})   ;
    $('#txtoperateur').val('');
    $('#txtoperation').val('');
    $('#montant').val('');
    $('#commission').val('');
    $('#reference').val('');
    setTimeout(
    
      function() 
      {
        window.location.reload(false);
      }, 2000);   
  
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
  handleClick(operateur='', e, operation=''){
    //console.log(operateur);
    this.setState({rendor:operateur});
    this.componentDidMount(operateur,operation);
    document.getElementById("txtoperateur").value = ""+operateur;
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
produit(){return this.props.caisse}

  render() {

    
    
    return (
      <>
              {
      (this.state.showSucces) ?
         (<ValidationOk message="Opération effectué avec succès"/>) : null
      }
      <div class ="row-12" className="mdecaissemnt">
        <div class="card  text-white bg-dark">

          {/* <div class="card-header">
            
          </div> */}

          <div class="card-body align-middle">
            <h1>Modifier le décaissement</h1>
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
          <button id="plaf" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Deplafonnement')}>Deplafonnement</button>
          <button id="entre" type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Sortie')}>Sortie</button>
          </div>
          </div>
          </div>
        </div>

                {/* <button type="button" class="btn btn-primary" onClick={this.handleClick.bind(this, 'chockers')}>Chokers</button>
                <button type="button" class="btn btn-primary" onClick={this.handleClick.bind(this, 'bracelets')}>Bracelets</button>
                <button type="button" class="btn btn-primary" onClick={this.handleClick.bind(this, 'rings')}>Rings for Women</button> */}
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
                <label for="commission">Commission</label>
                <input type="number" class="form-control" id="commission" min="0" step="1" 
                placeholder="Commission"/>
              </div>

              <div class="form-group">
                <label  for="reference">Référence</label>
                <input type="text" id="reference" class="form-control"/>
              </div>

              <div class="form-check">
                <a href="#"  onClick={this.handleupdate.bind(this)} class="form-check-label btn btn-primary" >Valider</a>
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
        <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait OM")}>Retrait OM</button>
        <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button>
      </div>
      </>
}

const Wari =  ({handleClickOperation}) => {
      return <>
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Wari")}>Retrait Wari</button>
        <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button>
      </div>
      </>
}
const Free =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Free Cash")}>Retrait Free Cash</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button>
    </div>
    </>
}

const Expresso =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait e-Money")}>Retrait e-Money</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button> 
    </div>
    </>
}

const Proximo =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait OM")}>Retrait OM</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Tigo Cash")}>Retrait Tigo Cash</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait e-Money")}>Retrait e-Money</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Wizal")}>Retrait Wizal</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Joni Joni")}>Retrait Joni Joni</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait ProxiCash")}>Retrait ProxiCash</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Ria")}>Retrait Ria</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait TrasFast")}>Retrait TrasFast</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Lamp Fall")}>Retrait Lamp Fall</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Small World")}>Retrait Small World</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Poste Cash")}>Retrait Poste Cash</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button>
    </div>
    </>
}

const Banque =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Ria")}>Retrait Ria</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Western Union")}>Retrait Western Union</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait MoneyGram")}>Retrait MoneyGram</button>
    </div>
    </>
}

const Xpress =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Ecobank")}>Retrait Ecobank</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button>
    </div>
    </>
}

const Wizall =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Wizall")}>Retrait Wizall</button>
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Annulation")}>Annulation</button>
    </div>
    </>
}
const Yup =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait YUP")}>Retrait YUP</button>
    </div>
    </>
  
}
const Wave =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Retrait Wave")}>Retrait Wave</button>  
    </div>
    </>
}

const Deplafonnement =  ({handleClickOperation}) => {
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
const Sortie =  ({handleClickOperation}) => {
    return<>
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button type="button" class="btn btn-lg btn-outline-primary mb-2" aria-selected="true" onClick={handleClickOperation.bind(this,"Manquant Caisse")}>Manquant Caisse</button>
    </div>
    </>
  
}
export default ModifierDecaissement;