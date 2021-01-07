

import React from 'react';
import { Modal } from 'react-responsive-modal'
import './ModalDebuter.css'
import axios from 'axios';
import $ from 'jquery';
import ValidationOk from './ValidationOk'
import { format } from 'date-fns';
class ModalDebuter extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        open: false,sommeFinale:0,toto:'toto',ok:this.props.debute
    };

    //this.handleStart = this.handleStart.bind(this);
     }
   
    onOpenModal = () => {
      this.setState({ open: true });
    };
    onCloseModal = () => {
      this.setState({ open: false });
    };
  
  
    handleStart=(e)=>{
        e.preventDefault();
        var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
        var date=new Date();
        var somme=parseInt($('#caisse').val())+parseInt($('#orange').val())+parseInt($('#expresso').val())+parseInt($('#tigo').val())+parseInt($('#wari').val())+parseInt($('#wizall').val())+parseInt($('#proximo').val())+parseInt($('#xpress').val())+parseInt($('#yup').val())+parseInt($('#wave').val())
        const NewDate= format(date,'dd/MM/yyyy');
        axios.post('https://rawade-api.herokuapp.com/api/soldeDebuterJournees/ajouter/',{caisse:$('#caisse').val(),orange:$('#orange').val(),expresso:$('#expresso').val(),freeMoney:$('#tigo').val(),wari:$('#wari').val(),wizall:$('#wizall').val(),proximo:$('#proximo').val(),xpress:$('#xpress').val(),yup:$('#yup').val(),wave:$('#wave').val(),cloturer:0,sommeInitiale:somme,date:NewDate,idU:idU})
        .then((response) => {
        localStorage.setItem('etatdelajourne',"ok");
        $('#caisse').val('');
        $('#orange').val('');
        $('#expresso').val('');
        $('#tigo').val('');
        $('#wari').val('');
        $('#wizall').val('');
        $('#proximo').val('');
        $('#xpress').val('');
        $('#yup').val('');
        $('#wave').val('');
        this.setState({ open: false });
        setTimeout(
    
            function() 
            {
              window.location.reload(false);
            }, 2000);  
        })
    }


    _handleChange1=event=>{this.setState({caisse:event.target.caisse})
     console.log(this.state.caisse)}
    _handleChange2=event=>this.setState({orange:event.target.orange})
    _handleChange3=event=>this.setState({expresso:event.target.expresso})
    _handleChange4=event=>this.setState({tigo:event.target.tigo})
    _handleChange5=event=>this.setState({wari:event.target.wari})
    _handleChange6=event=>this.setState({wizal:event.target.wizal})
    _handleChange7=event=>this.setState({proximo:event.target.proximo})
    _handleChange8=event=>this.setState({xpress:event.target.xpress})
    _handleChange9=event=>this.setState({yup:event.target.yup})
    _handleChange10=event=>this.setState({wave:event.target.wave})
    render() {
      const { open } = this.state;
                      
      return (
          
        <div >
            

      
          <button type="button" className="btn btn-lg btn-success m-2 debute" onClick={this.onOpenModal}>Débuter la journée </button>
          <Modal open={open} onClose={this.onCloseModal} center className="modale">

            <div class ="row-12">

                <div class="col-12">
                    <div class="card  text-white bg-dark">

                        <div class="card-body align-middle">
                            <h1>Débuter la journée</h1>
                        </div>
                    </div>
                </div>

            </div>

            {/* <div class ="row-12"> */}
             {/* <div class="col-12"> */}

            <div class="card text-white bg-dark">

                <div class ="row-12"> 
                    <div class="card-header">
                        Saisir les solde initial suivant
                    </div>
                </div>

                
                <div class="card-body align-middle">
              
                    <form  >
                        <div class="form-row">

                            <div class="col">
                                <div class="form-group">
                                    <label for="Caisse">Caisse</label>
                                    <input onInput ={this._handleChange1} type="number" class="form-control" id="caisse" min="0" step="1" 
                                    name="caisse" placeholder="Caisse" />
                                </div>
                                <div class="form-group">
                                    <label for="Orange">Orange</label>
                                    <input onInput ={this._handleChange2} name="orange" type="number" class="form-control" id="orange" min="0" step="1" 
                                    placeholder="Orange"/>
                                </div>
                                <div class="form-group">
                                    <label for="Expresso">Expresso</label>
                                    <input onInput ={this._handleChange3} name="expresso" type="number" class="form-control" id="expresso" min="0" step="1" 
                                    placeholder="Expresso"/>
                                </div>
                                <div class="form-group">
                                    <label for="Tigo">Free</label>
                                    <input onInput ={this._handleChange4} name="tigo" type="number" class="form-control" id="tigo" min="0" step="1" 
                                    placeholder="Free"/>
                                </div>
                                <div class="form-group">
                                    <label for="Wari">Wari</label>
                                    <input onInput ={this._handleChange5} name="wari" type="number" class="form-control" id="wari" 
                                    placeholder="Wari"/>
                                </div>
                            </div>

                            <div class="col">
                                <div class="form-group">
                                    <label for="Wizal">Wizall</label>
                                    <input onConInput hange={this._handleChange6} name="wizal" type="number" class="form-control" id="wizall"  
                                    placeholder="Wizall"/>
                                </div>
                                <div class="form-group">
                                    <label for="Proximo">Proximo</label>
                                    <input onInput ={this._handleChange7} name="proximo" type="number" class="form-control" id="proximo"  
                                    placeholder="Proximo"/>
                                </div>
                                <div class="form-group">
                                    <label for=" Xpress">Xpress</label>
                                    <input onInput ={this._handleChange8} name="xpress" type="number" class="form-control" id="xpress"  
                                    placeholder="Xpress"/>
                                </div>
                                <div class="form-group">
                                    <label for="Yup">Yup</label>
                                    <input onInput ={this._handleChange9} name="yup" type="number" class="form-control" id="yup" 
                                    placeholder="Yup"/>
                                </div>
                                <div class="form-group">
                                    <label for="Wave">Wave</label>
                                    <input onInput ={this._handleChange10} name="wave" type="number" class="form-control" id="wave" 
                                    placeholder="Wave"/>
                                </div>
                            </div>
                        </div>

                        <div class="form-group validerDebute">
                            <span onClick={this.handleStart} class="form-check-label btn btn-primary" >Débuter la journée </span>
                        </div>
                        
                    </form>
                
            {/* </div> */}
        </div>
        </div>
          </Modal>
        </div>
      );
    }


  }
   
  export default ModalDebuter;