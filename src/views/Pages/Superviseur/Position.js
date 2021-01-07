

import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import $ from 'jquery';

class Position extends Component {

  render() {

    return (
      <>

        <div class ="row-12">
          <div class="card  text-white bg-dark">
            <div class="card-body align-middle">
              <h1>Positions</h1>
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
                            <th>S. Initial  </th>
                            <th>Entrées  </th>
                            <th>Sorties  </th>
                            <th>S. Final  </th>
                            <th>S. Caisse  </th>
                            <th>S. Journal  </th>
                            
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

export default Position;