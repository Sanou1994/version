

import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import $ from 'jquery';
import axios from 'axios'
import ModalDebuter from './ModalDebuter';
import ModalCloturer from './ModalCloturer';
import { format } from 'date-fns';
import './MaJournne.css'

class MaJournee extends Component {


    constructor(){
        super();
        this.state = {rendor:'',close:false,journee:{caisse:0,orange:0,expresso:0,freeMoney:0,wari:0,wizall:0,proximo:0,xpress:0,yup:0,wave:0,cloturer:0,
            sommeinitiale:0,date:"",idU:0},initial:{caisse:0,orange:0,expresso:0,freeMoney:0,wari:0,wizall:0,proximo:0,xpress:0,yup:0,wave:0,cloturer:0,
                sommeinitiale:0,date:"",idU:0}}
              
        
    }
      
    componentDidMount(){
        var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
        $('.journee').css("color","20a8d8");
        const apiUrlinitial = 'https://rawade-api.herokuapp.com/api/maJournee/'+idU;
        const apiUrl = 'https://rawade-api.herokuapp.com/api/soldeDebuterJournees/caissier/'+idU;
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {console.log('This is your data debute ', data)
      
          this.setState({journee:data[0]});
          if(data.length>0){
        
            $(".debute").attr("disabled", true);
       
          
          }
          if(typeof(this.state.journee)=="undefined"){
            $(".modifierdebute").attr("disabled", true);
            $(".cloturejourne").attr("disabled", true);
          }
     
        }
      
       );
       fetch(apiUrlinitial)
       .then((response) => response.json())
       .then((data) => {
        if(data.length !=0){
            this.setState({initial:data[0]});
        }
        
       }
     
      );
  
      
      }

   
  

    handleClick(type=''){
        //console.log(operateur);
        this.setState({rendor:type});
    }

    switchementoo(){
        switch(this.state.rendor){
            case 'Debuter': return <Debuter />
            case 'ModifierDebuter' : return <ModifierDebuter donne={this.state.journee}/>
            default:
        }  
    }

  render() {

    return (
      <>

            <div class ="row-12">
                <div class="card text-white text-center bg-dark mt-4">

                    <div className="card-header">
                        <h2 className="text-center">Ma journée</h2>
                    </div>
                    <div class="card-body">
                        <div className="row">
                            <div className="col-lg-4">
                                <ModalDebuter/>
                            </div>
                            <div className="col-lg-4">
                                <  button className="btn btn-lg btn-success m-2 modifierdebute" aria-selected="true" onClick={this.handleClick.bind(this, 'ModifierDebuter')}> Modifier les soldes initiaux </button>
                            </div>
                            <div className="col-lg-4">
                                <ModalCloturer />
                            </div>
                        </div>
                        {/* <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button className="btn btn-lg btn-success m-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Debuter')}> Débuter la journée </button>
                            <button className="btn btn-lg btn-success m-2" aria-selected="true" onClick={this.handleClick.bind(this, 'ModifierDebuter')}> Modifier les soldes initiaux </button>
                            <button className="btn btn-lg btn-danger m-2" aria-selected="true" onClick={this.handleClick.bind(this, 'Cloturer')}> Clôturer la journée </button>
                        </div> */}
                    </div>
                </div>
            </div>

<div class="table-responsive">
    <div class="table-wrapper">
        <div class="card">
            <div class="card-body">
            {
                
            ( typeof(this.state.journee)!="undefined") ? (
               <>
                <Table responsive striped bordered hover>
                    
                    <thead>
                    <h4 class="si">Soldes Initiaux</h4>
                        <tr>
                            <th>Caisse  </th>
                            <th>Orange  </th>
                            <th>Expresso  </th>
                            <th>Free  </th>
                            <th>Wari  </th>
                            <th>Wizall  </th>
                            <th>Proximo  </th>
                            <th>Xpress  </th>
                            <th>Yup  </th>
                            <th>Wave  </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        
                          
                        <tr>                    
                            <td>{this.state.initial.caisse}</td>
                            <td>{this.state.initial.orange}</td>
                            <td>{this.state.initial.expresso}</td>
                            <td>{this.state.initial.freeMoney}</td>
                            <td>{this.state.initial.wari}</td>
                            <td>{this.state.initial.wizall}</td>
                            <td>{this.state.initial.proximo}</td>
                            <td>{this.state.initial.xpress}</td>
                            <td>{this.state.initial.yup}</td>
                            <td>{this.state.initial.wave}</td> 
                          
                        </tr> 
                          
                      
                    </tbody>
                </Table>
                <Table responsive striped bordered hover>
                    
                    <thead>
                    <h4 class="st">Soldes Transactions</h4>
                        <tr>
                            <th>Caisse  </th>
                            <th>Orange  </th>
                            <th>Expresso  </th>
                            <th>Free  </th>
                            <th>Wari  </th>
                            <th>Wizall  </th>
                            <th>Proximo  </th>
                            <th>Xpress  </th>
                            <th>Yup  </th>
                            <th>Wave  </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        
                          
                        <tr>                    
                            <td>{this.state.journee.caisse}</td>
                            <td>{this.state.journee.orange}</td>
                            <td>{this.state.journee.expresso}</td>
                            <td>{this.state.journee.freeMoney}</td>
                            <td>{this.state.journee.wari}</td>
                            <td>{this.state.journee.wizall}</td>
                            <td>{this.state.journee.proximo}</td>
                            <td>{this.state.journee.xpress}</td>
                            <td>{this.state.journee.yup}</td>
                            <td>{this.state.journee.wave}</td> 
                          
                        </tr> 
                          
                      
                    </tbody>
                </Table>
                </>
                ) : (<h1 className="journee">La journée n'a pas commencée:veuillez cliquer sur <span>debuter journée</span> </h1>)
            }
            </div>
        </div>      
    </div>
</div>

            {this.switchementoo()}

            {/* <div class ="row-12">
                <button className="btn btn-lg btn-success m-2"> Débuter la journée </button>
                <button className="btn btn-lg btn-success m-2"> Modifier les soldes initiaux </button>
                <button className="btn btn-lg btn-danger m-2"> Clôturer la journée </button>
            </div> */}

            



        {/* <div class ="row-12">
            <div class="card  text-white bg-dark">
                <div class="card-body align-middle">
                    <h3>Clôturer la journée</h3>
                </div>
            </div>
        </div> */}

         

      </>
    )
  }
}


class ModifierDebuter extends Component{
        constructor(props){
            super(props)
           
                this.handlevalider.bind(this)
        }
        componentDidMount(){
        $('#caisse').val(this.journee().caisse);
        $('#orange').val(this.journee().orange);
        $('#expresso').val(this.journee().expresso);
        $('#free').val(this.journee().freeMoney);
        $('#wari').val(this.journee().wari);
        $('#wizall').val(this.journee().wizall);
        $('#proximo').val(this.journee().proximo);
        $('#xpress').val(this.journee().xpress);
        $('#yup').val(this.journee().yup);
        $('#wave').val(this.journee().wave);
            
          
          }
    journee=()=>{
        return this.props.donne
    }    
    handlevalider=()=>{
       // e.preventDefault();
    var date=new Date();
    var somme=parseInt($('#caisse').val())+parseInt($('#orange').val())+parseInt($('#expresso').val())+parseInt($('#free').val())+parseInt($('#wari').val())+parseInt($('#wizall').val())+parseInt($('#proximo').val())+parseInt($('#xpress').val())+parseInt($('#yup').val())+parseInt($('#wave').val())
    const NewDate= format(date,'dd/MM/yyyy');
    var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
        axios.put('https://rawade-api.herokuapp.com/api/soldeDebuterJournees/modifier/'+this.journee().id,{caisse:$('#caisse').val(),orange:$('#orange').val(),expresso:$('#expresso').val(),freeMoney:$('#free').val(),wari:$('#wari').val(),wizall:$('#wizall').val(),proximo:$('#proximo').val(),xpress:$('#xpress').val(),yup:$('#yup').val(),wave:$('#wave').val(),cloturer:0,sommeInitiale:somme,date:NewDate,idU:idU})

        $('#caisse').val('');
        $('#orange').val('');
        $('#expresso').val('');
        $('#free').val('');
        $('#wari').val('');
        $('#wizall').val('');
        $('#proximo').val('');
        $('#xpress').val('');
        $('#yup').val('');
        $('#wave').val('');
        window.location.reload(false); 
    }
 
render(){

    return<>
    
    <div class="card text-white bg-dark">
        <div class ="row-12"> 
            <div class="card-header">
                <h4>Débuter la journée</h4>
                Veuillez saisir vos soldes initiaux suivant :
            </div>
        </div>

        
        <div class="card-body align-middle">
            
            <form>
                <div class="form-row">

                    <div class="col">
                        <div class="form-group">
                            <label for="Caisse">Caisse</label>
                            <input type="number" class="form-control" id="Caisse" min="0" step="1" 
                            name="Caisse" id="caisse" placeholder="caisse" />
                        </div>
                        <div class="form-group">
                            <label for="Orange">Orange</label>
                            <input type="number"  class="form-control" id="orange" min="0" step="1" 
                            placeholder="Orange"/>
                        </div>
                        <div class="form-group">
                            <label for="Expresso">Expresso</label>
                            <input type="number"  class="form-control" id="expresso" min="0" step="1" 
                            placeholder="Expresso"/>
                        </div>
                        <div class="form-group">
                            <label for="Free">Free</label>
                            <input type="number"  class="form-control" id="free" min="0" step="1" 
                            placeholder="Free"/>
                        </div>
                        <div class="form-group">
                            <label for="Wari">Wari</label>
                            <input type="number"  class="form-control" id="wari" min="0" step="1" 
                            placeholder="Wari"/>
                        </div>
                    </div>

                    <div class="col">
                        <div class="form-group">
                            <label for="Wizal">Wizall</label>
                            <input type="number"   class="form-control" id="wizall" min="0" step="1" 
                            placeholder="Wizal"/>
                        </div>
                        <div class="form-group">
                            <label for="Proximo">Proximo</label>
                            <input type="number"   class="form-control" id="proximo" min="0" step="1" 
                            placeholder="Proximo"/>
                        </div>
                        <div class="form-group">
                            <label for="Ecobank Xpress">Xpress</label>
                            <input type="number"   class="form-control" id="xpress" min="0" step="1" 
                            placeholder="Xpress"/>
                        </div>
                        <div class="form-group">
                            <label for="Yup">Yup</label>
                            <input type="number"  class="form-control" id="yup" min="0" step="1" 
                            placeholder="Yup"/>
                        </div>
                        <div class="form-group">
                            <label for="Wave">Wave</label>
                            <input type="number"  class="form-control" id="wave" min="0" step="1" 
                            placeholder="Wave"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <button onClick={this.handlevalider.bind(this)} class="form-check-label btn btn-primary" >Débuter la journée </button>
                </div>
                
            </form>
        </div>
    </div>

    </>
}
    
}

const Debuter =  () => {

    return<>
    
    <div class="card text-white bg-dark">
        <div class ="row-12"> 
            <div class="card-header">
            <h4> <i className="fa fa-edit"></i>  Modifier les soldes initiaux de la journée</h4>
                Veuillez saisir vos soldes initiaux suivant :
            </div>
        </div>

        
        <div class="card-body align-middle">
            
            <form>
                <div class="form-row">

                    <div class="col">
                        <div class="form-group">
                            <label for="Caisse">Caisse</label>
                            <input type="number" class="form-control" id="Caisse" min="0" step="1" 
                            name="Caisse" placeholder="Caisse" />
                        </div>
                        <div class="form-group">
                            <label for="Orange">Orange</label>
                            <input type="number" class="form-control" id="Orange" min="0" step="1" 
                            placeholder="Orange"/>
                        </div>
                        <div class="form-group">
                            <label for="Expresso">Expresso</label>
                            <input type="number" class="form-control" id="Expresso" min="0" step="1" 
                            placeholder="Expresso"/>
                        </div>
                        <div class="form-group">
                            <label for="Free">Free</label>
                            <input type="number" class="form-control" id="Free" min="0" step="1" 
                            placeholder="Free"/>
                        </div>
                        <div class="form-group">
                            <label for="Wari">Wari</label>
                            <input type="number" class="form-control" id="Wari" min="0" step="1" 
                            placeholder="Wari"/>
                        </div>
                    </div>

                    <div class="col">
                        <div class="form-group">
                            <label for="Wizal">Wizall</label>
                            <input type="number" class="form-control" id="Wizal" min="0" step="1" 
                            placeholder="Wizal"/>
                        </div>
                        <div class="form-group">
                            <label for="Proximo">Proximo</label>
                            <input type="number" class="form-control" id="Proximo" min="0" step="1" 
                            placeholder="Proximo"/>
                        </div>
                        <div class="form-group">
                            <label for="Xpress">Xpress</label>
                            <input type="number" class="form-control" id="Xpress" min="0" step="1" 
                            placeholder="Xpress"/>
                        </div>
                        <div class="form-group">
                            <label for="Yup">Yup</label>
                            <input type="number" class="form-control" id="Yup" min="0" step="1" 
                            placeholder="Yup"/>
                        </div>
                        <div class="form-group">
                            <label for="Wave">Wave</label>
                            <input type="number" class="form-control" id="Wave" min="0" step="1" 
                            placeholder="Wave"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <button type="submit" class="form-check-label btn btn-primary" >Modifier </button>
                </div>
                
            </form>
        </div>
    </div>

    </>
}

const Cloturer =  () => {

return<>
    <div class ="row-12">
        <div class="card  text-white bg-dark">
            <div class="card-header">
                <h4>Clôture de la journée</h4>
                Veuillez saisir le montant de la caisse :
            </div>

            <div class="card-body align-middle">
                <form>
                    <div class="form-group">
                            <label for="Caisse">Montant caisse</label>
                            <input type="number" class="form-control" id="Caisse" min="0" step="1" 
                        name="Caisse" placeholder="Montant caisse" />
                    </div>
                    <div class="form-group">
                        <button type="submit" class="form-check-label btn btn-primary" >Clôturer la journée </button>
                    </div>
                </form>
            </div>
        </div>      
    </div>
</>
}

export default MaJournee;