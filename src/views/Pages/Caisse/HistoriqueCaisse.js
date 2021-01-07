

import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Dropdown, Row, Table } from 'reactstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import $ from 'jquery';
import axios from 'axios'
import DropDownListeCaissier from './DropDownListeCaissier';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; 
import './HistoriqueCaisse.css'

class HistoriqueCaisse extends Component {
    
    constructor(props){
        super(props);
        this.state={history:[],historydate:[],export:"none",fichier:""}
        this.handleSearch.bind(this);
        $('.champ-export').css("display","none");
    }
    
componentDidMount(){
    $('.champ-export').css("display","none");
    const apiUrl = 'https://rawade-api.herokuapp.com/api/dates';
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {console.log('This is your data debute ', data)
    this.setState({historydate:data});
    }
    );
   
}
    handleSearch=()=>{
        var datep=$("#sel1 option:selected").text();
        var dated=$("#sel2 option:selected").text();
        var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
        var identite=JSON.parse(localStorage.getItem('logaccorde'))[0];
        this.setState({fichier:"historique_"+"_"+datep+"_"+dated+"_"+identite.nom+"-"+identite.prenom})
        const apiUrl = 'https://rawade-api.herokuapp.com/api/transactions/caissier/historiques/';
        axios.post(apiUrl,{id:idU,date:datep,date1:dated})
    
       .then((response) => {console.log('This is your data', response.data)
       if(response.data.length==0){
        $('.champ-export').css("display","none");
       }else{
        $('.champ-export').css("display","block"); 
       }
        this.setState({history:response.data});
      
    }
    )
    }

  render() {

    return (
      <>

        <div class ="row-12">
            <div class="card  text-white bg-dark">
            <div class="card-body align-middle">
                <h1>Historique de la caisse</h1>
            </div>
            </div>
        </div>

<div class="card text-white bg-dark">
    <div class="card-body align-middle">
    <form>
        <div class="row">

            <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                 <small for="sel1">Date N°1</small> 
                  <select class="form-control" id="sel1">
                {
                    this.state.historydate.map((element,idx) =>(
                    <option>{element.dates}</option>
                        )
                    )
                  }
                </select>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                 <small for="sel2">Date N°2</small> 
                  <select class="form-control" id="sel2">
                {
                    this.state.historydate.map((element,idx) =>(
                    <option>{element.dates}</option>
                        )
                    )
                  }
                </select>
            </div>

            <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                <button onClick={this.handleSearch.bind(this)} class="form-check-label" class="btn btn-primary rh">Rechercher</button>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 hist champ-export">
              <ReactHTMLTableToExcel  
                        className="btn btn-success"  
                        table="emp-caisse-hist"  
                        filename={this.state.fichier}  
                        sheet="Sheet"  
                        buttonText="Exporter Excel" /> 
            </div>
        </div>
    </form>
    </div>
</div>


        <div class="table-responsive">
            <div class="table-wrapper">
                
                <div class="card">
                <div class="card-body">
                <Table responsive striped bordered hover id="emp-caisse-hist">
                    <thead>
                        <tr>
                            
                            <th>Date</th>
                            <th>Opérateur </th>
                            <th>Opération</th>
                            <th>Décaiss</th>
                            <th>Encaiss</th>
                            <th>Frais</th>
                            <th>Commission</th>
                            <th>Numéro</th>
                            <th>Sens</th>
                            <th>Référence</th>
                            <th>Crédit</th>
                            <th>Débit</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.history.map((element,idx) =>(
                            
                        <tr>
                            
                                 <td>{element.date}</td>
                                  <td>{element.operateur}</td>
                                  <td>{element.operation}</td>
                                  <td>{element.decaissement}</td>
                                  <td>{element.encaissement}</td>
                                  <td>{element.frais}</td>
                                  <td>{element.commission}</td>
                                  <td>{element.numero}</td>
                                  <td>{element.sens}</td>
                                  <td>{element.reference}</td>
                                  <td>{element.credit}</td>
                                  <td>{element.debit}</td>
                        </tr>
                    ))
                }
                         
                    </tbody>
                </Table>
                </div>
                </div>
            </div>
        </div>   


      </>
    )
  }
}

export default HistoriqueCaisse;