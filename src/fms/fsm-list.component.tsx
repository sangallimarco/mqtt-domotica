import React from "react";
import {Todo} from "./fsm.config";
import {Grid, GridItem} from "../components/grid.component";

interface TestFSMItemProps {
    todos: Todo[];
    clickItem: (id: number) => void;
}

export const FsmListComponent: React.FC<TestFSMItemProps> = (props) => {
    const {todos, clickItem} = props;

    return (
        <Grid size={todos.length}>
            {
                props.todos.map(({id}) => (
                    <GridItem key={id} onClick={()=> clickItem(id)}>{id}</GridItem>
                ))
            }
        </Grid>
    );

};



