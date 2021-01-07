

import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import $ from 'jquery';

class ListeCompte extends Component {

  constructor(props){
    super(props);
    this.state={users:[],message:"",fichier:""}
 
}


  componentDidMount(){
    const apiUrlUsers = 'https://rawade-api.herokuapp.com/api/utilisateurs' ;
 
    //utilistateurs
    fetch(apiUrlUsers)
    .then((response) => response.json())
    .then((data) => {console.log('This is your data users ', data)
    this.setState({users:data});
    }
    );

    
}
  render() {

    return (
      <>

        <div class ="row-12">
          <div class="card  text-white bg-dark">
            <div class="card-body align-middle">
              <h1>Liste des comptes</h1>
            </div>
          </div>
        </div>
        <div class="table-responsive">
            <div class="table-wrapper">
                
                <div class="card">
                <div class="card-body">
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            
                            <th>Nom</th>
                            <th>Prenom </th>
                            <th>Spseudo</th>
                            <th>Agence</th>
                            <th>Telephone</th>
                            <th>Role</th>
                            <th>Login</th>
                            <th>Mot de passe</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.users.map((element,idx) =>(
                            
                        <tr>
                            
                                 <td>{element.nom}</td>
                                  <td>{element.prenom}</td>
                                  <td>{element.spseudo}</td>
                                  <td>{element.agence}</td>
                                  <td>{element.telephone}</td>
                                  <td>{element.role}</td>
                                  <td>{element.login}</td>
                                  <td>{element.password}</td>
                                
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
export default ListeCompte;