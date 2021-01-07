

import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Dropdown, Row, Table } from 'reactstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import $ from 'jquery';
import DropDownListeCaissier from './DropDownListeCaissier';
import axios from 'axios'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import './historiqueCaisseSuperviseur.css';
class HistoriqueCaisse extends Component {

    constructor(props){
        super(props);
        this.state={history:[],historydate:[],users:[],message:"",fichier:""}
        this.handleSearch.bind(this);
    }



    componentDidMount(){
        const apiUrlUsers = 'https://rawade-api.herokuapp.com/api/utilisateurs' ;
        const apiUrl = 'https://rawade-api.herokuapp.com/api/dates';
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {console.log('This is your data debute ', data)
        this.setState({historydate:data});
        }
        );


        //utilistateurs
        fetch(apiUrlUsers)
        .then((response) => response.json())
        .then((data) => {console.log('This is your data users ', data)
        this.setState({users:data});
        }
        );

        
    }
        handleSearch=()=>{
           var valselect= document.getElementById("sel2");
           var datep=$("#sel1 option:selected").text();
           var dated=$("#sel3 option:selected").text();
           var utilisateur=$("#sel2 option:selected").text();

            var idU=valselect.options[valselect.selectedIndex].value;
            const apiUrl = 'https://rawade-api.herokuapp.com/api/transactions/caissier/historiques/';
            axios.post(apiUrl,{id:idU,date:datep,date1:dated})
        
           .then((response) => {console.log('This is your data', response.data)
              if(response.data.length==0){
                this.setState({message:"error"});
              }else{
                this.setState({message:""});
              }
              
            this.setState({fichier:"rapport-"+utilisateur+"-"+datep+"_"+dated})
            this.setState({history:response.data});
            if(this.state.message=="error"){
                $('.excel').css("display","none");
            }else{
                $('.excel').css("display","block");
            }


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
                <small for="sel2">Caissier</small>
                  <select class="form-control" id="sel2">
                       {
                    this.state.users.map((element,idx) =>(
                        (element.role === "caissier" ) ?
                        (  <option value={element.id}>{element.nom} {element.prenom}</option>) :(null)
                  
                        )
                    )
                  }
                    
                  </select>
            </div>

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
                <small for="sel1">Date N°2</small>
                  <select class="form-control" id="sel3">
                     {
                    this.state.historydate.map((element,idx) =>(
                    <option>{element.dates}</option>
                        )
                    )
                  }
                </select>
            </div>


            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            

         <button onClick={this.handleSearch.bind(this)} class="form-check-label" class="btn btn-primary rechercher">Rechercher</button>
            
                
            </div>
            <div class="col-md-3 col-sm-12 col-xs-12 excel ">
                        <ReactHTMLTableToExcel  
                        className="btn btn-success"  
                        table="emp"  
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
             {
                (this.state.message!="error") ?
                (<Table id="emp" responsive striped bordered hover>
                   

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
                    ): (<h1 className="journee">Données non accessibles pour le moment </h1>)
            }
                </div>
                </div>
                {/* <div class="clearfix">
                    <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                    <ul class="pagination">
                        <li class="page-item disabled"><a href="#"><i class="fa fa-angle-double-left"></i></a></li>
                        <li class="page-item"><a href="#" class="page-link">1</a></li>
                        <li class="page-item"><a href="#" class="page-link">2</a></li>
                        <li class="page-item active"><a href="#" class="page-link">3</a></li>
                        <li class="page-item"><a href="#" class="page-link">4</a></li>
                        <li class="page-item"><a href="#" class="page-link">5</a></li>
                        <li class="page-item"><a href="#" class="page-link"><i class="fa fa-angle-double-right"></i></a></li>
                    </ul>
                </div> */}
            </div>
        </div>   


      </>
    )
  }
}

export default HistoriqueCaisse;