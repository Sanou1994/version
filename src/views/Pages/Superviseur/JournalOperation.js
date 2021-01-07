

import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import $ from 'jquery';

class JournalOperation extends Component {

  render() {

    return (
      <>
        
        <div class ="row-12">
          <div class="card  text-white bg-dark">

            {/* <div class="card-header">
              
            </div> */}

            <div class="card-body align-middle">
              <h1>Journal des opérations</h1>
            </div>
          </div>
        </div>


        <div class="row">
            <div class="col-sm-3">
                <div class="card text-success bg-dark">
                    <div class="card-header center">Total encaissement</div>
                    <div class="card-body">
                        <h5 class="card-title">1 724 675</h5>
                        <p class="card-text"></p>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card text-danger bg-dark">
                    <div class="card-header">Total décaissement</div>
                    <div class="card-body">
                        <h5 class="card-title">234 654</h5>
                        <p class="card-text"></p>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card text-info bg-dark">
                    <div class="card-header">Total frais</div>
                    <div class="card-body ">
                        <h5 class="card-title">234 123</h5>
                        <p class="card-text"></p>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card text-info bg-dark">
                    <div class="card-header">Total</div>
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
                            
                            <th>Total  </th>
                            <th> </th>
                            <th>  </th>
                            <th>2 876 543  </th>
                            <th>6 987 032  </th>
                            <th>2389  </th>
                            <th>  </th>
                            <th>  </th>
                            <th>  </th>
                            <th>  </th>
                            <th>  </th>
                            <th>  </th>
                            
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            
                            <th>Date  </th>
                            <th>Caisse Sup </th>
                            <th>Opération  </th>
                            <th>Décaissement  </th>
                            <th>Encaissement  </th>
                            <th>Frais   </th>
                            <th>Numéro  </th>
                            <th>Sens  </th>
                            <th>Référence  </th>
                            <th>Diminué  </th>
                            <th>Augmenté  </th>
                            <th>Taxe  </th>
                            
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

export default JournalOperation;