import React from 'react';
import './App.css';
import { TestComponent } from './TestComponent';
import {FSMContainer} from "./FSM/FSMContainer";

const App: React.FC = () => {
  return (
    <div className="App">
      <TestComponent label="yeahhh!"/>
      <FSMContainer label={'ok'}/>
    </div>
  );
};

export default App;
