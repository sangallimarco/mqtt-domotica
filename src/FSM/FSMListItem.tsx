import React from "react";
import {Todo} from "./FSM.types";
import styled from 'styled-components';

interface TestFSMItemProps {
    todos: Todo[];
}

export const FSMListItem: React.FC<TestFSMItemProps> = (props) => {
    const {todos} = props;

    const ListContainer = styled.div`
      min-height: 1rem;
      backGround: ${todos.length ? 'white' : '#111'};
      display: grid;
      grid-auto-rows: 2rem;
      grid-template-columns: repeat(6, 1fr);
    `;

    const ListItem = styled.div`
        font-size: 1rem;
    `;


    return (
        <ListContainer>
            {
                props.todos.map(todo => (
                    <ListItem key={todo.id}>{todo.id}</ListItem>
                ))
            }
        </ListContainer>
    );

};



