import React, { Component } from "react";
import $ from 'jquery';
import toastr from 'toastr'

class Notification extends Component {
  constructor(props){
    super(props);
   
}

componentDidMount(){
  $('.alert').css("text-align","center")
  $('.alert').css("color","green")
  $('.alert').css("border-radius","15px")
  $('.img').css("color","green")
   $('.img').css("font-size","20px")
  setTimeout(
    
    function() 
    {
      $('.alert').css("display","none")
    }, 5000);
}
  render() {
    
    return (
      <>
      <div className="alert alert-success affiche" role="alert">
      <i className="fa fa-check img"></i> {this.props.message}
      </div>
    </>
    );
  }
}

export default Notification;