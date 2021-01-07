

import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import $ from 'jquery';

class JournalCommission extends Component {

  render() {

    return (
      <>
        <div class ="row-12">
          <div class="card  text-white bg-dark">

            {/* <div class="card-header">
              
            </div> */}

            <div class="card-body align-middle">
              <h1>Journal des commissions</h1>
            </div>
          </div>
        </div>


        <div class="row">
            
            <div class="col-sm-3">
                <div class="card text-success bg-dark">
                    <div class="card-header">Total bénéfice</div>
                    <div class="card-body ">
                        <h5 class="card-title">2 432 598</h5>
                        <p class="card-text"></p>  
                    </div>
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
                            <th>Solde Caisse </th>
                            <th>Solde superviseur  </th>
                            <th>Solde cumulé  </th>
                            <th>Solde opérateur  </th>
                            <th>Opérateur   </th>
                            <th>Bénéfice  </th>
                            
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
                            
                        </tr>
                        <tr>
                            
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

export default JournalCommission;