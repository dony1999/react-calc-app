import "./App.css";
import "./Responsive.css";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { FiDelete } from "react-icons/fi";
import { MdOutlineSuperscript } from "react-icons/md";
import { FaSquareRootAlt, FaPercentage } from "react-icons/fa";

// import { useEffect } from "react";

function App() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  // const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  console.log("-----------render------------");
  console.log("preState: " + preState);
  console.log("curState: " + curState);
  // console.log("display: " + display);
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

  // useEffect(() => {
  //   setDisplay(curState);
  // }, [curState]);

  // useEffect(() => {
  //   setDisplay("0")
  // }, []);

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
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
      case "x":
        calculate = parseFloat(preState) * parseFloat(curState);
        break;
      case "÷":
        calculate = parseFloat(preState) / parseFloat(curState);
        break;
      default:
        return;
    }
    // setDisplay("");
    setPreState(Math.round(calculate * 1000000000) / 1000000000);
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
    if (preState && curState && (operator === "x" || operator === "÷")) {
      setCurState(parseFloat(curState) / 100);
    } else if (
      preState &&
      curState === "" &&
      (operator === "x" || operator === "÷")
    ) {
      setPreState(parseFloat(preState) / 100);
    } else if (curState) {
      setCurState(
        Math.round((parseFloat(curState) / 100) * preState * 100) / 100
      );
    } else {
      setPreState(
        Math.round((parseFloat(preState) / 100) * preState * 100) / 100
      );
    }
  };

  const square = () => {
    curState
      ? setCurState(Math.pow(curState, 2))
      : setCurState(Math.pow(preState, 2));
  };

  const onePerX = () => {
    curState ? setCurState(1 / curState) : setCurState(1 / preState);
  };

  const squareRoot = () => {
    curState
      ? setCurState(Math.sqrt(curState))
      : setCurState(Math.sqrt(preState));
  };

  const reset = () => {
    setPreState("");
    setCurState("");
    // setDisplay("0");
    setOperator(null);
  };

  const resetCurrentState = () => {
    if (curState) {
      setCurState("");
      // setDisplay("0");
    } else {
      reset();
    }
  };

  const deleteLastCharacter = () => {
    curState
      ? setCurState(curState.slice(0, curState.length - 1))
      : setCurState(curState);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {curState !== "" || curState === "0" ? (
            <NumericFormat
              value={curState}
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
          <div className="btn btn-fnc" onClick={percent}>
            <FaPercentage/>
          </div>
          <div className="btn btn-fnc" onClick={resetCurrentState}>
            CE
          </div>
          <div className="btn btn-fnc" onClick={reset}>
            AC
          </div>
          <div className="btn btn-fnc" onClick={deleteLastCharacter}>
            <FiDelete />
          </div>
          <div className="btn btn-fnc" onClick={onePerX}>
            1/x
          </div>
          <div className="btn btn-fnc" onClick={square}>
            <MdOutlineSuperscript/>
          </div>
          <div className="btn btn-fnc" onClick={squareRoot}>
            <FaSquareRootAlt/>
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
            +
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
            x
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
            -
          </div>
          <div className="btn btn-fnc" onClick={minusPlus}>
            +/-
          </div>
          <div className="btn number zero" onClick={inputNumber}>
            0
          </div>
          <div className="btn number" onClick={inputNumber}>
            .
          </div>
          <div className="btn btn-operator" onClick={equals}>
            =
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
