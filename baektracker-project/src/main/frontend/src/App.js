import logo from './logo.svg';
import './App.css';
import {Helmet} from "react-helmet-async";
import ModalContainer from "./js/setup/modal/ModalContainer";
import {Route, Routes} from "react-router-dom";
import {Main} from "./js/components/main";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>코테스터디</title>
        <meta name='viewport' content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      </Helmet>
      <ModalContainer/>
      <Routes>
        <Route path='/'>
            <Route path='' element={<Main/>}>

            </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
