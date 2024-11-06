import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import BooleanVariables from "./BooleanVariables";
import Classes from "./Classes";
import ConditionalOutputInline from "./ConditionalOutputInline";
import Destructing from "./Destructing";
import House from "./House";
import LegacyFunctions from "./LegacyFunctions";
import MapFunction from "./MapFunction";
import SimpleArrays from "./SimpleArrays";
import TernaryOperator from "./TernaryOperator";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import { useSelector } from "react-redux";
export default function Lab3() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  return (
    <div>
      <h2>Lab 3</h2>
      <ul className="list-group">
        {todos.map((todo: any) => (
          <li className="list-group-item" key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
      <hr />
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <TernaryOperator />
      <ConditionalOutputInline />
      <LegacyFunctions />
      <SimpleArrays />
      <AddingAndRemovingToFromArrays />
      <MapFunction />
      <House />
      <Destructing />
      <Classes />
    </div>
  );
}
