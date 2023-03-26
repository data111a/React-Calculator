import { useReducer, useState } from "react"
import Digitbtn from "./Digitbtn"
import Operationbtn from "./Operationbtn"


export const ACTIONS = {
  ADD_DIGIT : 'add_digit',
  CHOOSE_OPERATION : 'choose_operation',
  CLEAR : 'clear',
  REMOVE_DIGIT : 'remove_digit',
  EVALUATE : 'evalueate'
}
const FORMATER = new Intl.NumberFormat('en-us',{
  maximumFractionDigits : 0,
})

function formatNum(num){
  if(num == null) return
  const [int, decimal] = num.split('.')
  if (decimal == null) return FORMATER.format(int) 
  return `${FORMATER.format(int)}.${decimal}`
}
function reducer(state,{ type, payload }){
  switch(type){
    case  ACTIONS.ADD_DIGIT :
      if(state.overwrtie) {
        return {
          ...state,
          currentNum : payload.digit,
          overwrtie : false
        }
      }
      if (payload.digit ==='0' && state.currentNum === '0') {
        return state
      }
      if (payload.digit === '.' && state.currentNum?.includes('.')){
         return state
        }
      if(payload.digit === '.' && state.currentNum == null){
        return {
          ...state,
          currentNum : '0.'
        }
      }
      

      return {
        ...state,  
        currentNum : `${state.currentNum || ''}${payload.digit}`,
          
      }

    case ACTIONS.CHOOSE_OPERATION :
      if (state.currentNum == null && state.previousNum == null){
        return state
      }
      if(state.currentNum == null){
        return {
          ...state,
          operation : payload.operation
        }
      }
      if (state.previousNum == null) {
        return {
          ...state,
          operation : payload.operation,
          previousNum : state.currentNum,
          currentNum : null
        }
      }
      return {
        ...state,
        previousNum : evaluete(state),
        operation : payload.operation,
        currentNum : null
      }

    case ACTIONS.EVALUATE :
      if(state.currentNum == null || state.previousNum == null || state.operation == null){
        return state
      }
      return {
        ...state,
        overwrtie : true,
        previousNum : null,
        currentNum : evaluete(state),
        operation : null
      }
    case ACTIONS.CLEAR : 
      return {}
    case ACTIONS.REMOVE_DIGIT :
      if (state.overwrtie){ 
        return {
          ...state,
          overwrtie : false,
          currentNum : null
        }
      }
      if(state.currentNum == null) return state
      if(state.currentNum.lenght === 1){
        return {
          ...state,
          currentNum : null
        }
      }
      return {
        ...state,
        currentNum : state.currentNum.slice(0,-1)
      }
  }
}

function evaluete({currentNum,previousNum,operation}){
  const current = parseFloat(currentNum)
  const previous = parseFloat(previousNum)
  if (isNaN(current) || isNaN(previous)) return ''
  let compututation = ''
  switch(operation){
    case '+' :
      compututation = previous + current
      break
    case '-' :
      compututation = previous - current
      break
    case '/' :
      compututation = previous / current
      break
    case '*' :
      compututation = previous * current
      break

  }
  return compututation.toString()
}

export const App = () =>{
  const [{ currentNum, previousNum, operation },dispatch] = useReducer(reducer,{})
  return(
    <div className="app">
      <div className="calculator_grid">
        <div className="output">
          <div className="previousNum">{formatNum(previousNum)}{operation}</div>
          <div className="currentNum">{formatNum(currentNum)}</div>
        </div>
        <button  className="span-two btn" onClick={() => dispatch({type : ACTIONS.CLEAR})}>AC</button>
        <button className="btn" onClick={() => dispatch({type : ACTIONS.REMOVE_DIGIT})}>DEL</button>
        <Operationbtn operation='/' dispatch={dispatch} />
        <Digitbtn digit='1' dispatch={dispatch}/>
        <Digitbtn digit='2' dispatch={dispatch}/>
        <Digitbtn digit='3' dispatch={dispatch}/>
        <Operationbtn operation='*' dispatch={dispatch}/>
        <Digitbtn digit='4' dispatch={dispatch}/>
        <Digitbtn digit='5' dispatch={dispatch}/>
        <Digitbtn digit='6' dispatch={dispatch}/>
        <Operationbtn operation='+' dispatch={dispatch}/>
        <Digitbtn digit='7' dispatch={dispatch}/>
        <Digitbtn digit='8' dispatch={dispatch}/>
        <Digitbtn digit='9' dispatch={dispatch}/>
        <Operationbtn operation='-' dispatch={dispatch}/>
        <Digitbtn digit='.' dispatch={dispatch}/>
        <Digitbtn digit='0' dispatch={dispatch}/>
        <button className="span-two btn"  onClick={() => dispatch({type : ACTIONS.EVALUATE})}>=</button>
      </div>
    </div>
  )
  
}
