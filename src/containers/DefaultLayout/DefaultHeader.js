

import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/rawade.PNG'
import $ from 'jquery';
import ModalChangerMotDePasse from '../../views/Pages/Caisse/ModalChangerMotdePasse'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(){
    super();
    this.state = {
        open: true
    };
     this.nom=JSON.parse(localStorage.getItem('logaccorde'))[0].nom;
     this.prenom=JSON.parse(localStorage.getItem('logaccorde'))[0].prenom;
     this.agence=JSON.parse(localStorage.getItem('logaccorde'))[0].agence;
     this.handleStart.bind(this);
     }
     handleStart=()=>{
      
       document.getElementById('mdp').click()
     }
     componentDidMount(){
      $('.mdp').css("display","none");
     }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 40, alt: 'Rawade Logo' }}
          minimized={{ src: sygnet, width: 70, height: 60, alt: 'Rawade Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        

        {/* <h5 className="ml-2 mt-2"> Agence de Médina </h5> */}
        <strong className="ml-1 mr-3">Agence:{this.agence}</strong>
        <ModalChangerMotDePasse  />
        {/* <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Tableau de bord</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Utilisateurs</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Paramètres</NavLink>
          </NavItem>
        </Nav> */}

        <Nav className="ml-auto" navbar>

          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}

          

          <UncontrolledDropdown nav direction="down">

            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/8.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <strong className="ml-1 mr-3"> {this.nom} {this.prenom} </strong>
            <DropdownMenu right>
              {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem> */}

              {/* <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem> */}
              <DropdownItem onClick={this.handleStart.bind(this)}><i className="fa fa-shield"></i> Changer le mot de passe</DropdownItem>

              {/* <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem> */}

              {/* <DropdownItem divider /> */}

              {/* <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}

              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Déconnexion</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          


        </Nav>
          {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
