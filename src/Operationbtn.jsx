import { ACTIONS } from "./App"

export default function Operationbtn( {dispatch,operation} ) {
    return(<button className="btn" onClick={() => dispatch({type : ACTIONS.CHOOSE_OPERATION, payload : {operation}})}>{operation}</button>)

}