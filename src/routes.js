import React from 'react';


 //const Users = React.lazy(() => import('./views/Users/Users'));
 //const User = React.lazy(() => import('./views/Users/User'));

// const Comptabilite = React.lazy(() => import('./views/Pages/Superviseur/Comptabilite'));
// const JournalCommission = React.lazy(() => import('./views/Pages/Superviseur/JournalCommission'));
// const JournalOperation = React.lazy(() => import('./views/Pages/Superviseur/JournalOperation'));
// const Position = React.lazy(() => import('./views/Pages/Superviseur/Position'));
// const SoldeOperateur = React.lazy(() => import('./views/Pages/Superviseur/SoldeOperateur'));
const HistoriqueCaisseSuperviseur = React.lazy(() => import('./views/Pages/Caisse/HistoriqueCaisseSuperviseur'));

 const CreationCompte = React.lazy(() => import('./views/Pages/Superviseur/CreationCompte'));
 const ListeCompte = React.lazy(() => import('./views/Pages/Superviseur/ListeCompte'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
 
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },

  // { path: '/comptabilite', name: 'Comptabilite', component: Comptabilite },
  // { path: '/journalcommission', name: 'Journal des Commissions', component: JournalCommission },
  // { path: '/journaloperation', name: 'Journal des Operations', component: JournalOperation },
  // { path: '/position', name: 'Position', component: Position },
  // { path: '/soldeoperateur', name: 'Solde des Operateurs', component: SoldeOperateur },
  { path: '/historiquecaissesuperviseur', name: 'Historique Caisse Superviseur', component: HistoriqueCaisseSuperviseur },

  { path: '/creercompte', name: 'Creation des Comptes', component: CreationCompte },
  { path: '/listecompte', name: 'Liste des Compte', component: ListeCompte },

  
  
  
];

export default routes;
