

import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import $ from 'jquery';

class SoldeOperateur extends Component {

  render() {

    return (
      <>

        <div class ="row-12">
          <div class="card  text-white bg-dark">

            {/* <div class="card-header">
              
            </div> */}

            <div class="card-body align-middle">
              <h1>Solde des opérateurs</h1>
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
                            
                            <th>Date  </th>
                            <th>Caisse  </th>
                            <th>Orange  </th>
                            <th>Expresso  </th>
                            <th>Tigo  </th>
                            <th>Wari  </th>
                            <th>Wizall  </th>
                            <th>Proximo  </th>
                            <th>Xpress  </th>
                            <th>Yup  </th>
                            <th>Wave  </th>
                            <th>Intouch  </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            
                        </tr>
                        <tr>
                            
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            <td>Rien</td>
                            
                        </tr>
                         
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

export default SoldeOperateur;