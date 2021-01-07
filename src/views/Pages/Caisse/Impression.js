import $ from 'jquery';
import { format } from 'date-fns';
import './Impression.css'
import React, { Component } from 'react';


class Impression extends Component {

constructor(props){
    super(props);
    this.state = {render:'',caisse1:[],caisse2:[],caisse:[],isLoad:false,url:'https://rawade-api.herokuapp.com/api/',
    date:format(new Date(), 'dd/MM/yyyy')
   
}
}
componentDidMount(){

    console.log();
}


render() {
    
    return(
     
        
            <iframe id="ifmcontentstoprint" >
             <div id='DivIdToPrint'>
                <img src={'../../../assets/img/logo.png'} className="logo" alt="admin@bootstrapmaster.com" />
               
                
                <div className="recu">
                    <span >Opérateur:</span><span className="bouge"> {this.props.operateur}</span>
                </div>
                <div className="recu">
                    <span>Opération:</span><span className="bouge">  {this.props.operation}</span>
                </div>
                <div className="recu">
                    <span>Montant:</span><span className="bouge3">    {this.props.montant} FCFA</span>
                </div>
                <div className="recu bloc2">
                    <span>Frait:</span><span className="bouge2">     {this.props.frais} FCFA</span>
                </div>
               

            </div>
            </iframe>
      
    )

}

}

export default Impression;