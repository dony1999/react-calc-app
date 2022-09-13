import "./App.css";
import "./Responsive.css"
import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";

function App() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);
  
  console.log("-----------render------------");
  console.log(preState + "preState:");
  console.log("curState: " + curState);
  console.log("input: " + input);
  console.log("operator: " + operator);
  console.log("total: " + total);

  const inputNumber = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;
    if (total) {
      setPreState("");
    }

    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
    setTotal(false);
  };

    useEffect(() => {
      setInput(curState);
    }, [curState]);

    useEffect(() => {
      setInput("0");
    },[]);

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else setPreState(curState);
    setCurState("");
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }

    var calculate;
    switch (operator) {
      case "+":
        calculate = parseFloat(preState) + parseFloat(curState);
        break;
      case "-":
        calculate = parseFloat(preState) - parseFloat(curState);
        break;
      case "X":
        calculate = parseFloat(preState) * parseFloat(curState);
        break;
      case "÷":
        calculate = parseFloat(preState) / parseFloat(curState);
        break;
      default:
        break;
    }
    setInput('');
    setPreState(calculate);
    setCurState("");
  };

  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  const percent = () => {
    if (preState) {
      setCurState((parseFloat(curState) / 100) * 100);
    } else {
      setCurState(parseFloat(curState) / 100);
    }
  };

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {input !== "" || input === "0" ? (
            <NumericFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumericFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <div className="btn-container">
          <div className="btn btn-fnc" onClick={reset}>
            AC
          </div>
          <div className="btn btn-fnc" onClick={minusPlus}>
            +/-
          </div>
          <div className="btn btn-fnc" onClick={percent}>
            %
          </div>
          <div className="btn btn-operator" onClick={operatorType}>
            ÷
          </div>
          <div className="btn number" onClick={inputNumber}>
            7
          </div>
          <div className="btn number" onClick={inputNumber}>
            8
          </div>
          <div className="btn number" onClick={inputNumber}>
            9
          </div>
          <div className="btn btn-operator" onClick={operatorType}>
            X
          </div>
          <div className="btn number" onClick={inputNumber}>
            4
          </div>
          <div className="btn number" onClick={inputNumber}>
            5
          </div>
          <div className="btn number" onClick={inputNumber}>
            6
          </div>
          <div className="btn btn-operator" onClick={operatorType}>
            -
          </div>
          <div className="btn number" onClick={inputNumber}>
            1
          </div>
          <div className="btn number" onClick={inputNumber}>
            2
          </div>
          <div className="btn number" onClick={inputNumber}>
            3
          </div>
          <div className="btn btn-operator" onClick={operatorType}>
            +
          </div>
          <div className="btn number zero" onClick={inputNumber}>
            0
          </div>
          <div className="btn number" onClick={inputNumber}>
            .
          </div>
          <div className="btn btn-operator" onClick={equals}>
            {" "}
            ={" "}
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default App;
