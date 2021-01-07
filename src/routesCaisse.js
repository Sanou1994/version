import React from 'react';


const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const Caisse = React.lazy(() => import('./views/Pages/Caisse/Caisse'));
const Encaissement = React.lazy(() => import('./views/Pages/Caisse/Encaissement'));
const Decaissement = React.lazy(() => import('./views/Pages/Caisse/Decaissement'));
const ModifierEncaissement = React.lazy(() => import('./views/Pages/Caisse/ModifierEncaissement'));
const ModifierDecaissement = React.lazy(() => import('./views/Pages/Caisse/ModifierDecaissement'));
const HistoriqueCaisse = React.lazy(() => import('./views/Pages/Caisse/HistoriqueCaisse'));
const MaJournee = React.lazy(() => import('./views/Pages/Caisse/MaJournee'));







// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routesCaisse = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/caisse', name: 'Caisse', component: Caisse },
  { path: '/encaissement', name: 'Encaissement', component: Encaissement },
  { path: '/decaissement', name: 'Decaissement', component: Decaissement },
  { path: '/modifierencaissement', name: 'Modifier Encaissement', component: ModifierEncaissement },
  { path: '/modifierdecaissement', name: 'Modifier Decaissement', component: ModifierDecaissement },
  { path: '/historiquecaisse', name: 'Historique Caisse', component: HistoriqueCaisse },
  { path: '/majournee', name: 'Ma journée', component: MaJournee },

  
];

export default routesCaisse;
