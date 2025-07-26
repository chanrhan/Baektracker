import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Helmet} from "react-helmet-async";
import ModalContainer from "./js/setup/modal/ModalContainer";
import {TooltipContainer} from "./js/setup/modal/tooltip/TooltipContainer";
import {registerGlobalTooltip} from "./js/setup/utils/TooltipUtils";
import {Route, Routes} from "react-router-dom";
import {Main} from "./js/components/main";

function App() {
  // 전역 툴팁 함수들 등록
  React.useEffect(() => {
    registerGlobalTooltip();
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>코테스터디</title>
        <meta name='viewport' content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      </Helmet>
      <ModalContainer/>
      <TooltipContainer/>
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
