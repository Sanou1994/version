

import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import $ from 'jquery';

class Comptabilite extends Component {

  render() {

    return (
      <>

        <div class ="row-12">
          <div class="card  text-white bg-dark">

            {/* <div class="card-header">
              
            </div> */}

            <div class="card-body align-middle">
              <h1>Comptabilité</h1>
            </div>
          </div>
        </div>

        <nav aria-label="Page navigation example">
          <ul class="pagination  pagination-circle pg-blue justify-content-center bg-dark ">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>

      </>
    )
  }
}

export default Comptabilite;