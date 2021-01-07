import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardImg,CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, CardHeader } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import axios from 'axios'
import logo from '../../../../src/assets/img/brand/logo.png'
import $ from 'jquery';
import './Login.css';
class Login extends Component {
  
  constructor(){
    super();
    this.login.bind(this);
    this.state={etat:false,etatsup:false,user:'',users:"",message:"Identifiant ou Mot de passe incorrect",erreur:"none"}
   
}
login=()=>{
  $('.confirmation').css("display","block");
  $('.validation').css("display","none");
  const apiUrl = 'https://rawade-api.herokuapp.com/api/authentification/';
  axios.post(apiUrl,{login:$('#login').val(),password:$('#password').val()})
  .then((response) => {

    this.setState({user:response.data});
    
    if(this.state.user.role=="caissier"){
    var players = [{id:this.state.user.id,nom:this.state.user.nom, prenom: this.state.user.prenom,agence:this.state.user.agence,role:this.state.user.role}];
    localStorage.setItem('logaccorde', JSON.stringify(players));
    // console.log(JSON.parse(localStorage.getItem('logaccorde')));
    this.setState({etat:true})
  }
  if(this.state.user.role=="superviseur"){
    var players = [{id:this.state.user.id,nom:this.state.user.nom, prenom: this.state.user.prenom,agence:this.state.user.agence,role:this.state.user.role}];
    localStorage.setItem('logaccorde', JSON.stringify(players));
    // console.log(JSON.parse(localStorage.getItem('logaccorde')));
    this.setState({etatsup:true})
  }
  if(this.state.user==''){
    $('.confirmation').css("display","none");
    $('.validation').css("display","block");
      this.setState({erreur:"block"})
      $('#msg').css("display","block");
      setTimeout(
    
        function() 
        {
          $('#msg').css("display","none");
        }, 2000);
  }
 

 
    
}
 );
 var donnee=[] 
// donnee[0]={id:this.state.user.id,nom:this.state.user.nom,prenom:this.state.user.prenom,agence:this.state.user.agence,role:this.state.user.role}
//   localStorage.setItem('logaccorde2',JSON.stringify(donnee));
//   console.log(JSON.parse(localStorage.getItem('logaccorde2')) );

 
}
 componentDidMount(){
  const apiUrl = 'https://rawade-api.herokuapp.com/api/authentification/';
  $('#msg').css("display",this.state.erreur);
  $('.confirmation').css("display","none");
  $('.validation').css("display","block");


}
  render() {
    if(this.state.etat){
      return <Redirect to='/caisse'/>;
    }else if(this.state.etatsup){
      return <Redirect to='/historiquecaissesuperviseur'/>;
    }
    else{
                         
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="4">
                <CardGroup>
  
                  <Card className="p-4 bg-white text-info">
                    <CardImg variant="top" src={logo} />
  
                    <CardHeader className="bg-white">
  
                    </CardHeader>
  
                    <CardBody>
                      <Form>
                        
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" id="login" placeholder="Identifiant" autoComplete="username" />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" id="password" placeholder="Mot de passe" autoComplete="current-password" />
                        </InputGroup>
  
                        <Row>
                          <Col xs="6">
                            <Button color="info"onClick={this.login.bind(this)} className="px-4 text-white validation">Connexion</Button>
                            <button class="btn btn-primary confirmation" type="button" disabled>
                           <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span> En cours...
                          </button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0">Mot de passe oublié ?</Button>
                          </Col>
                        </Row>
                        <Row>
                        <label id="msg">{this.state.message}</label>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                  
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      );
    
  }
}
}
export default Login;
