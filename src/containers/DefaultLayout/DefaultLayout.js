

import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import $ from 'jquery';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
import nav from '../../_navCaisse';
// routes config
import routes from '../../routes';
import routesCaisse from '../../routesCaisse';
import './defaultLayout.css'
const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

 loading = () => <div className="animated fadeIn pt-1 text-center"></div>

  signOut(e) {
    localStorage.removeItem('logaccorde')
    e.preventDefault()
    this.props.history.push('/login')
  }
  menu=()=>{
    var acces=null;
    try{
      acces=JSON.parse(localStorage.getItem('logaccorde'))[0].role
      if(acces=="caissier"){
        return nav
      }else{
        return navigation
      }
     }catch(exception){
      return nav;
     }
    
  }
  route=()=>{
    var acces=null;
    try{
      acces=JSON.parse(localStorage.getItem('logaccorde'))[0].role
      if(acces=="caissier"){
        return routesCaisse;
      }else{
        return routes
      }
     }catch(exception){
     return routesCaisse;
     }
   
  }
  componentDidMount(){
    $("a[href='#/decaissement']").css("color","#f86c6b")
    $(".icon-share-alt").css("color","#f86c6b")
    $("a[href='#/encaissement']").css("color","#4dbd74")
    $(".icon-bag").css("color","#4dbd74")

    $(".nav-item:hover").css("color","white")
    
  }

  render() {
    var acces=null;
    try{
      acces=JSON.parse(localStorage.getItem('logaccorde'))[0].role
     }catch(exception){
      acces="";
     }
   
    return (
      <div className="app">
        <AppHeader fixed>
          
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
        
        </AppHeader>

        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={this.menu()} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={this.route()} router={router}/> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {this.route().map((route, idx) => {
                    return route.component ? (
                      (acces=='caissier' || acces=='superviseur' ) ?
                      (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} 
                        
                        />
                      ) : (null)
                        
                    ) : (null);
                  })}

                  <Redirect from="/" to="/login" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
