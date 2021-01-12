import React from                                         'react'                   ;
import                                                    './App.css'               ;
import   M                                           from 'materialize-css'         ;
import { BrowserRouter, Route , Switch , useHistory} from "react-router-dom"
import   SubmitForm                                  from "./components/SubmitForm";
import   AllForms                                    from './components/AllForms'   ;
import   Navbar                                      from "./components/Navbar"     ;
import   Default                                     from "./components/Default"   ;
const App = () => {
  

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/"         component ={SubmitForm} />
        <Route       path="/view" component ={AllForms  } />
        <Route component={Default} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
