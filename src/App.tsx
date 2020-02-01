import React from 'react';
import './App.css';
import { TestComponent } from './TestComponent';
import {TestFSMComponent} from "./TestFSMComponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <TestComponent label="yeahhh!"/>
      <TestFSMComponent label={'ok'}/>
    </div>
  );
};

export default App;
