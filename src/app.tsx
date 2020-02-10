import React from 'react';
import {TestComponent} from './test.component';
import {FsmContainerComponent} from "./fms/fsm-container.component";
import {Grommet} from 'grommet';

const App: React.FC = () => {
    const theme = {
        global: {
            font: {
                family: 'Roboto',
                size: '18px',
                height: '20px',
            },
        },
    };

    return (
        <Grommet theme={theme}>
            <div className="App">
                <TestComponent label="yeahhh!"/>
                <FsmContainerComponent label={'ok'}/>
            </div>
        </Grommet>
    );
};

export default App;
