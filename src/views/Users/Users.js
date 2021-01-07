

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import usersData from './UsersData'

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  const getBadge = (status) => {
    return status === 'Caissier' ? 'warning' :
          status === 'Superviseur' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.id.toString()}>
      <th scope="row"><Link to={userLink}>{user.id}</Link></th>
      <td><Link to={userLink}>{user.nom}</Link></td>
      <td>{user.prenom}</td>
      <td>{user.telephone}</td>
      <td>{user.agence}</td>
      <td>{user.identifiant}</td>
      <td>{user.motdepasse}</td>
      <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
      <td>
      <a href="/#/modifierencaissement" class="edit" title="Modifier" data-toggle="tooltip"><i className="fa fa-edit">  </i></a>
      <a href="#" class="delete" title="Supprimer" data-toggle="tooltip"><i className="fa fa-trash">  </i></a>
      </td>
    </tr>
  )
}

class Users extends Component {

  render() {

    const userList = usersData.filter((user) => user.id < 10)

    return (
      <>
      <div class ="row-12">
            <div class="card  text-white bg-dark">
              <div class="card-body align-middle">
                <h1>Liste des comptes</h1>
              </div>
            </div>
      </div>


      <div className="animated fadeIn row-12">
        
            <Card>
              <CardHeader>
                <i className="fa fa-beer"></i> Utilisateurs
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Prénom</th>
                      <th scope="col">Numéro de téléphone</th>
                      <th scope="col">Agence</th>
                      <th scope="col">Identifiant</th>
                      <th scope="col">Mot de passe</th>
                      <th scope="col">Role</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    
                      {userList.map((user, index) =>
                        <UserRow key={index} user={user}/>
                      )}
                     
                  </tbody>

                </Table>
              </CardBody>
            </Card>
      </div>

      </>
    )
  }
}

export default Users;
