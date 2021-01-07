

import React,{ Component } from 'react';
import {Table } from 'reactstrap';
import axios from 'axios'
import Notification from './MessageSucces'
import ModifierDecaissement from './ModifierDecaissement'
import ModifierEncaissement from './ModifierEncaissement'
import MessageSupprimer from './MessageSupprimer'
import ValidationOk from './ValidationOk'
import Impression from './Impression'
import { ToastProvider, useToasts } from 'react-toast-notifications'
import './caisse.css';
import $ from 'jquery';
import { format } from 'date-fns';
import { toast, ToastContainer, MDBContainer, MDBBtn } from "mdbreact";
import ModalDebuter from './ModalDebuter';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; 

class Caisse extends Component {

constructor(props){
    super(props);
    this.state = {render:'',caisse1:[],caisse2:[],caisse:[],isLoad:false,url:'https://rawade-api.herokuapp.com/api/',
    sommeEnc:0,sommeDec:0,sommef:0,sommeInitial:0,checked:false,total:0,donne:{},id:0,sens:"",del:false,updatePage:'',
    date:format(new Date(), 'dd/MM/yyyy'),showSucces:false,totalDec:0,totalEnc:0,totalCom:0,totalFr:0,
    content:'',pri:'',optrImprime:"",opImprime:"",montantImprime:"",fraisImprime:"",fichier:""
   
}
    var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
    this.handledelete.bind(this);
    this.handleupdate.bind(this);
    this.handlesupprimer.bind(this);
    this.handleimprimer.bind(this);
    this.handleTrieoperateur.bind(this);
    this.handleTrieoperation.bind(this);
    //this.claculSomme.bind(this);
   
  //  this.affiche.bind(this)
}

handleClick(compName, e){
    console.log(compName);
    this.setState({render:compName});  
         
}
_renderSubComp(){
    switch(this.state.render){
        
    }
}

componentDidMount(){
    $('#ifmcontentstoprint').css("display","none");
    $('.debute').css("display","none");
    var identite=JSON.parse(localStorage.getItem('logaccorde'))[0];
    var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
    this.setState({fichier:"journee_"+identite.nom+"-"+identite.prenom})
    this.handleClick();
    const apiUrl = 'https://rawade-api.herokuapp.com/api/transactions/caissier/'+idU;
    var somme=0;
    var sommeDecaissement=0;
    var sommeEncaissement=0;
    var sommeComm=0;
    var sommeFrais=0;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {console.log('This is your data caisse', data)
    
        this.setState({caisse:data});
        for(var i=0;i<data.length;i++){
            sommeDecaissement+=data[i].decaissement;
            sommeEncaissement+=data[i].encaissement;
            sommeComm+=data[i].commission;
            sommeFrais+=data[i].frais;
            somme+=data[i].encaissement + data[i].decaissement;
        }
        this.setState({total:somme});
        this.setState({total:somme});
        this.setState({totalEnc:sommeEncaissement});
        this.setState({totalDec:sommeDecaissement});
        this.setState({totalCom:sommeComm});
        this.setState({totalFr:sommeFrais});
        $('#total').val(this.state.total+" FCFA");
    }
     );

     
     var somme2=0;
     const apiUrl2 = 'https://rawade-api.herokuapp.com/api/soldeDebuterJournees/caissier/'+idU;
     fetch(apiUrl2)
     .then((response) => response.json())
     .then((data) => {console.log('This is your data initial ', data)
       if( typeof(data[0])!="undefined") {
        localStorage.setItem('etatdelajourne',"ok"); 
       }else{
           $('.debute').click();
       }
      
     
}
);
     
 this.update()  ; 
//  document.getElementById('demarre').click()

this.setState({content:document.getElementById("DivIdToPrint")})
this.setState({pri:document.getElementById("ifmcontentstoprint").contentWindow})

}


update=()=>{
     const apiUrl = 'https://rawade-api.herokuapp.com/api';
    
     var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
     const apiUrlinitial = 'https://rawade-api.herokuapp.com/api/maJournee/'+idU;


    fetch(apiUrl+"/totalEntree/"+idU)
      .then((response) => response.json())
      .then((data) => {
    
        this.setState({sommeEnc:data});
        
    }
      );
      fetch(apiUrl+"/totalSortie/"+idU)
      .then((response) => response.json())
      .then((data) => {
    
        this.setState({sommeDec:data});
        console.log("somme sortie: "+data) 

    }
      );



      fetch(apiUrl+"/sommeFinale/"+idU)
      .then((response) => response.json())
      .then((data) => {
    
        this.setState({sommef:data});
        console.log("somme Finale: "+data) 

    }
      );


      fetch(apiUrlinitial)
      .then((response) => response.json())
      .then((data) => {console.log('This is your data debute ', data)
    
      if( typeof(data[0])!="undefined") {
        this.setState({sommeInitial:data[0].caisse});
       
       }
      }
    
     );
 

}
handlesupprimer(ide){
    this.setState({id:ide,del:true});
}
handledelete(){
    
        axios.delete('https://rawade-api.herokuapp.com/api/transactions/supprimer/'+this.state.id)
        .then(
            res=>{
                this.setState(prevstate => ({
                    caisse : prevstate.caisse.filter(
                    caisse => caisse.id !== this.state.id)
                }))
                this.afficheTout();
                
            }
        )
      
       $('.close').click();
    this.setState({del:false});
    this.setState({showSucces:true});   
}
show=()=>{
    if(this.state.showSucces){
      return <Notification message="Elément supprimé avec succès"/>
    }
  }
handleupdate(id,sens){
    this.setState({checked:true});
        axios.get(this.state.url+'transactions/'+id)
      .then((response) => {
        console.log(response.data);
        this.setState({donne:response.data});
        console.log("element: "+this.state.donne);
        if(sens=="encaissement"){
        this.setState({updatePage:<ModifierEncaissement caisse={response.data} />});
        } else if(sens="decaissement"){
            this.setState({updatePage:<ModifierDecaissement caisse={response.data} />}); 
        }
        this.setState({opImprime:response.data.operation})
        this.setState({optrImprime:response.data.operateur})
        this.setState({fraisImprime:response.data.frais})
        this.setState({montantImprime:response.data.montant})
      }
      )
      
    
  
  
}

handlerecupimprime(id,sens){
    
        axios.get(this.state.url+'transactions/'+id)
      .then((response) => {
     
      
        this.setState({opImprime:response.data.operation})
        this.setState({optrImprime:response.data.operateur})
        this.setState({fraisImprime:response.data.frais})
        this.setState({montantImprime:response.data.montant})
      }
      )
      
    
  
  
}

handleimprimer(id,sens){
    axios.get(this.state.url+'transactions/'+id)
    .then((response) => {
   
    
      this.setState({opImprime:response.data.operation})
      this.setState({optrImprime:response.data.operateur})
      this.setState({fraisImprime:response.data.frais})
      this.setState({montantImprime:response.data.montant})


      
      $('.bouge').css("margin-left","100px");
      $('.bouge3').css("margin-left","110px");
      $('.recu').css("margin-bottom","10px");
      $('.bouge2').css("margin-left","150px");
      $('.recu').css("font-size","25px");
      $('.logo2').css("margin-top","10px");
      $('.bloc2').css("margin-bottom","220px");
      $('.logo').css("margin-bottom","20px");
      $('.logo').css("margin-top","10px");
      var content = document.getElementById("DivIdToPrint");
      var pri = document.getElementById("ifmcontentstoprint").contentWindow;
      this.state.pri.document.open();
      
          pri.document.write(content.innerHTML);
          pri.document.close();
          pri.focus();
          setTimeout(function(){
          pri.print();
          },400)
    }
    )
    ;
    
    

}
afficheTout=()=>{
    var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
    const apiUrl = 'https://rawade-api.herokuapp.com/api/transactions/caissier/'+idU;
    var somme=0;
    var sommeDecaissement=0;
    var sommeEncaissement=0;
    var sommeComm=0;
    var sommeFrais=0;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {console.log('This is your data', data)
    
        this.setState({caisse:data});
        for(var i=0;i<data.length;i++){
         sommeDecaissement+=data[i].decaissement;
         sommeEncaissement+=data[i].encaissement;
         sommeComm+=data[i].commission;
         sommeFrais+=data[i].frais;
         somme+=data[i].encaissement + data[i].decaissement;
        }
        this.setState({total:somme});
        this.setState({totalEnc:sommeEncaissement});
        this.setState({totalDec:sommeDecaissement});
        this.setState({totalCom:sommeComm});
        this.setState({totalFr:sommeFrais});
        $('#total').val(this.state.total+" FCFA");
    }
     );
}
handleTrieoperateur(){
    this.props.history.push('/caisse')
    var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
    if($("#trie option:selected").text()=="Tout"){
        this.afficheTout();
    }else{
    const apiUrl = 'https://rawade-api.herokuapp.com/api/transactions/caissier/'+idU+'/recherche/operateur/'+$("#trie option:selected").text();
    var somme=0;
    var sommeDecaissement=0;
    var sommeEncaissement=0;
    var sommeComm=0;
    var sommeFrais=0;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {console.log('This is your data', data)
    
        this.setState({caisse:data});
        for(var i=0;i<data.length;i++){
            sommeDecaissement+=data[i].decaissement;
            sommeEncaissement+=data[i].encaissement;
            sommeComm+=data[i].commission;
            sommeFrais+=data[i].frais;
            somme+=data[i].encaissement + data[i].decaissement;
           }
           this.setState({total:somme});
           this.setState({totalEnc:sommeEncaissement});
           this.setState({totalDec:sommeDecaissement});
           this.setState({totalCom:sommeComm});
           this.setState({totalFr:sommeFrais});
           this.setState({total:somme});
           $('#total').val(this.state.total+' FCFA');
    //  this.setState({caisse:[...this.state.caisse1, ...this.state.caisse2]});
    }
     );
    
}
    
}
handleTrieoperation(){
  
    var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id;
    if($("#trieoperation option:selected").text()=="Tout"){
        this.afficheTout();
    }else{
    const apiUrl = 'https://rawade-api.herokuapp.com/api/transactions/caissier/'+idU+'/recherche/operation/'+$("#trieoperation option:selected").text();
   var somme = 0;
   var sommeDecaissement=0;
   var sommeEncaissement=0;
   var sommeComm=0;
   var sommeFrais=0;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {console.log('This is your data', data)
    
        this.setState({caisse:data});
        for(var i=0;i<data.length;i++){
            sommeDecaissement+=data[i].decaissement;
            sommeEncaissement+=data[i].encaissement;
            sommeComm+=data[i].commission;
            sommeFrais+=data[i].frais;
            somme+=data[i].encaissement + data[i].decaissement;
           }
           this.setState({total:somme});
           this.setState({totalEnc:sommeEncaissement});
           this.setState({totalDec:sommeDecaissement});
           this.setState({totalCom:sommeComm});
           this.setState({totalFr:sommeFrais});
           this.setState({total:somme});
           $('#total').val(this.state.total+' FCFA');
    }
     );
    
}
    
}
affiche=()=>{
  if(this.state.del){
       return  <MessageSupprimer handlesupprimer={this.handledelete.bind(this)}/>
        
   }
}

 printDiv=()=> 
{

  
    $('.bouge').css("margin-left","100px");
    $('.bouge3').css("margin-left","110px");
    $('.recu').css("margin-bottom","10px");
    $('.bouge2').css("margin-left","150px");
    $('.recu').css("font-size","25px");
    $('.logo2').css("margin-top","10px");
    $('.bloc2').css("margin-bottom","220px");
    $('.logo').css("margin-bottom","20px");
    $('.logo').css("margin-top","10px");
    $('.logo2').css("float","right");
    var content = document.getElementById("DivIdToPrint");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    this.state.pri.document.open();
    
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        setTimeout(function(){
        pri.print();
        },400);


}

modele=()=>{
    var idU=JSON.parse(localStorage.getItem('logaccorde'))[0].id
    if(this.state.checked){
        return this.state.updatePage
    }else{
        return (
            <>
            {
             this.affiche()
            }
             <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>

           {<Impression operateur={this.state.optrImprime} operation={this.state.opImprime} montant={this.state.montantImprime} frais={this.state.fraisImprime}/>}

           {<ModalDebuter/>}
        <div class="card text-dark bg-light" id="card1">
            
            
            
            <div class="card-body ">

                <div class="form-inline right row">
                    
                    <div calssName="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <h4 className="mr-lg-5" >{this.state.date}</h4>
                    </div>

                    <div calssName="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <a id="demarre" href="/#/encaissement" className="btn btn-lg btn-outline-success m">Encaisser</a>
                    </div>

                    <div calssName="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <a href="/#/decaissement" className="btn btn-lg btn-outline-danger  m">Décaisser</a>
                    </div>
                  
                    <div calssName="col-lg-3 col-md-3 col-sm-12 col-xs-12  ">
                        <div class="exporter-caisse-jour">
                        <ReactHTMLTableToExcel  
                        className="btn btn-success"  
                        table="emp-caisse"  
                        filename={this.state.fichier}  
                        sheet="Sheet"  
                        buttonText="Exporter Excel" /> 
                        </div>
                  
                    </div>
                </div>

            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-3">
                <div class="card text-info bg-dark " id="card2">
                    <div class="card-header center">Solde initiale</div>
                    <div class="card-body">
                        <h5 class="card-title">{this.state.sommeInitial} FCFA</h5>
                        <p class="card-text"></p>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card text-info bg-dark" id="card3">
                    <div class="card-header">Entrée</div>
                    <div class="card-body">
                    <h5 class="card-title">{this.state.sommeEnc} FCFA</h5>
                        <p class="card-text"></p>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card text-danger bg-dark" id="card4">
                    <div class="card-header">Sorties</div>
                    <div class="card-body ">
                  <h5 class="card-title">{this.state.sommeDec} FCFA</h5>
                        <p class="card-text"></p>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card text-success bg-dark" id="card5">
                    <div class="card-header">Solde finale</div>
                    <div class="card-body ">
                        <h5 class="card-title">{this.state.sommef} FCFA</h5>
                        <p class="card-text"></p>  
                    </div>
                </div>
            </div>
        </div>


 <div class="card text-white bg-dark" id="card6">
    
    <div class="card-header">
    <div class="row">
        <div class="col-lg-3">
            <label for="total">Total décaissement : </label>
            <strong>{this.state.totalDec} FCFA</strong>
        </div>
        <div class="col-lg-3">
            <label for="total">Total encaissement : </label>
            <strong>{this.state.totalEnc} FCFA</strong>
        </div>
        <div class="col-lg-3">
            <label for="total">Total frais : </label>
            <strong>{this.state.totalFr} FCFA</strong>
        </div>
        <div class="col-lg-3">
            <label for="total">Total commission : </label>
            <strong>{this.state.totalCom} FCFA</strong>
        </div>
        </div>
    </div>
    
    <div class="card-body ">
    
        <div class="row">

        
            <div class="col-md-4 ">
                <label>Opérateur </label>
                <form class="form-inline">
                    <select id="trie" class="form-control">
                        <option selected>Tout</option>
                        <option  value="1">Orange</option>
                        <option  value="2">Wari</option>
                        <option  value="3">Free</option>
                        <option   value="4">Expresso</option>
                        <option  value="5">Proximo</option>
                        <option  value="6">Banque</option>
                        <option  value="7">Xpress</option>
                        <option  value="8">Wizall</option>
                        <option  value="9">Yup</option>
                        <option  value="10">Tigo</option>
                        <option  value="11">Wave</option>
                        <option value="12">Entree</option>
                        <option value="13">Sortie</option>
                        <option value="14">Plafonnement</option>
                        <option value="15">Deplafonnement</option>
                    </select>
                    <button onClick={this.handleTrieoperateur.bind(this)} class="btn  btn-outline-light ml-1">  <i class="fa fa-search"></i></button>
                </form>
            </div>

            <div class="col-md-4 ">
                <label>Sens</label>
                <form class="form-inline">
                  <select class="form-control" id="trieoperation">
                    <option selected>Tout</option>
                    <option value="1">encaissement</option>
                    <option value="2">decaissement</option>
                    
                  </select>
                <button onClick={this.handleTrieoperation.bind(this)} class="btn  btn-outline-light ml-1">  <i class="fa fa-search"></i></button>
                </form>
            </div>

            <div class="col-md-4 ">
                <label for="total">Total</label>
                <input type="txt"  class="form-control" id="total"
                name="total" placeholder="Total" readOnly/>
            </div>
        </div>

        {/* <div class="row mt-3">

            <div class="col-lg-3">
                <h4 for="total">Total décaissement : </h4>
                5545555555
            </div>

            <div class="col-lg-3">
                <small for="total">Total encaissement : </small>
                5555
            </div>

            <div class="col-lg-3">
                <small for="total">Total frais : </small>
                88
            </div>

            <div class="col-lg-3">
                <small for="total">Total commission : </small>
                888
            </div>

        </div> */}
        
  
    </div>
</div>


      {this.show()}


          <div>
              <div class="table-responsive">
                  <div class="table-wrapper">
                      
                      <div id="impression" class="card">
                      <div class="card-body">
                      <Table  responsive striped bordered hover id="emp-caisse">
                          <thead>
                              <tr>
                                  <th>Date</th>
                                  <th>Opérateur</th>
                                  <th>Opération</th>
                                  <th>Décaiss</th>
                                  <th>Encaiss</th>
                                  <th>Frais</th>
                                  <th>Commission </th>
                                  <th>Numéro </th>
                                  <th>Sens </th>
                                  <th>Référence </th>
                                  <th>Crédit </th>
                                  <th>Débit </th>
                                  <th>Action </th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                        ( this.state.caisse.length!=0) ? (
                          this.state.caisse.map((element,idx) =>(
                            (element.idU==idU) ?
                              (<tr>
                      
                                  <td>{element.date}</td>
                                  <td>{element.operateur}</td>
                                  <td>{element.operation}</td>
                                  <td>{element.decaissement}</td>
                                  <td>{element.encaissement}</td>
                                  <td>{element.frais}</td>
                                  <td>{element.commission}</td>
                                  <td>{element.numero}</td>
                                  <td>{element.sens}</td>
                                  <td>{element.reference}</td>
                                  <td>{element.credit}</td>
                                  <td>{element.debit}</td>
                                  <td className="actions">
      
                                      <a href="#/caisse" onClick={this.handleupdate.bind(this,element.id,element.sens)}  className="fa fa-pencil ico2"></a>
                                      <a href="#/caisse" onClick={this.handleimprimer.bind(this,element.id)} className="fa fa-print icoIm"></a>
                                      <a href="#/caisse" onClick={this.handlesupprimer.bind(this,element.id)} className="fa fa-trash ico"></a>
                                      
                                  </td>
                              </tr>) : null
                                
                          )
                          )
                                  ) : null
                      }

                          </tbody>
                      </Table>
                      </div>
                      </div>
      
                  </div>
              </div>   
             
          </div>
      
          {/* <MessageSucces className="msg"/> */}
        
          
          
            </>
          )
    }
}
  render() {
    
      return(this.modele())

  }



}


export default Caisse;

