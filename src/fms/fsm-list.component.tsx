import React from "react";
import { Todo } from "./fsm.config";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "grommet";

interface TestFSMItemProps {
  todos: Todo[];
  clickItem: (id: number) => void;
}

export const FsmListComponent: React.FC<TestFSMItemProps> = (props) => {
  const { todos, clickItem } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Name
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
      {todos.map(({ id }) => (
        <TableRow key={id} onClick={() => clickItem(id)}>
          <TableCell scope="row">
            <strong> {id}</strong>
          </TableCell>
          <TableCell>Coconut</TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
  );
};
