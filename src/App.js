import "./App.css";
import "./Responsive.css";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { FiDelete } from "react-icons/fi";
import { MdOutlineSuperscript } from "react-icons/md";
import { FaSquareRootAlt, FaPercentage } from "react-icons/fa";

let operator = false;
let prevNumber = 0;

function App() {
  let [rs, setRS] = useState("");
  // const [operator, setOperator] = useState(null);

  console.log("-----------render------------");
  console.log("typeof prevNumber: " + typeof prevNumber);
  console.log("prevNumber: " + prevNumber);
  console.log("typeof RS: " + typeof rs);
  console.log("RS: " + rs);
  console.log("operator: " + operator);

  const inputNumber = (e) => {
    if (
      (typeof rs === "number" && prevNumber === 0) ||
      (rs && prevNumber === false)
    ) {
      setRS(e.target.innerText);
    } else if (rs) {
      setRS((pre) => pre + e.target.innerText);
    } else {
      setRS(e.target.innerText);
    }
  };

  const operatorType = (e) => {
    if (prevNumber === 0) {
      operator = false;
    }
    if (operator === false || prevNumber === 0) {
      operator = e.target.innerText;
    }
    if (rs === "") return;
    if (prevNumber !== 0) {
      equals();
    } else {
      prevNumber = rs;
      rs = "";
    }
  };

  const equals = (e) => {
    let calculate;

    switch (operator) {
      case "+":
        if (prevNumber && rs === "") {
          // TH không nhập số sau khi nhập toán tử
          calculate = parseFloat(prevNumber) + parseFloat(prevNumber);
        } else if (prevNumber === 0 && rs) {
          // TH không nhập số trước khi nhập toán tử
          calculate = 0 + parseFloat(rs);
        } else {
          calculate = parseFloat(prevNumber) + parseFloat(rs);
        }
        break;
      case "-":
        if (prevNumber && rs === "") {
          // TH không nhập số sau khi nhập toán tử
          calculate = parseFloat(prevNumber) - parseFloat(prevNumber);
        } else if (prevNumber === 0 && rs) {
          // TH không nhập số trước khi nhập toán tử
          calculate = 0 - parseFloat(rs);
        } else if (prevNumber && rs === 0) {
          calculate = parseFloat(rs) - 0;
        } else {
          calculate = parseFloat(prevNumber) - parseFloat(rs);
        }
        break;
      case "x":
        if (prevNumber && rs === "") {
          // TH không nhập số sau khi nhập toán tử
          calculate = parseFloat(prevNumber) * parseFloat(prevNumber);
        } else if (prevNumber === 0 && rs) {
          // TH không nhập số trước khi nhập toán tử
          calculate = 0 * parseFloat(rs);
        } else {
          calculate = parseFloat(prevNumber) * parseFloat(rs);
        }
        break;
      case "÷":
        if (prevNumber && rs === "") {
          // TH không nhập số sau khi nhập toán tử
          calculate = parseFloat(prevNumber) / parseFloat(prevNumber);
        } else if (prevNumber === 0 && rs) {
          // TH không nhập số trước khi nhập toán tử
          calculate = 0 / parseFloat(rs);
        } else {
          calculate = parseFloat(prevNumber) / parseFloat(rs);
        }
        break;
      default:
        return;
    }

    prevNumber = Math.round(calculate * 1000000000) / 1000000000;
    setRS("");
    operator = window.event.target.getAttribute("value");

    if (e?.target.innerText === "=") {
      setRS(prevNumber);
      prevNumber = 0;
      operator = false;
    }
  };

  const minusPlus = () => {
    if (rs.charAt(0) === "-") {
      setRS(rs.substring(1));
    } else {
      setRS("-" + rs);
    }
  };

  const percent = (e) => {
    if ((rs && prevNumber === false) || (rs && prevNumber === 0)) {
      setRS(parseFloat(rs) / 100);
    } else if (prevNumber && rs && (operator === "x" || operator === "÷")) {
      setRS(parseFloat(rs) / 100);
    } else if (
      prevNumber === false &&
      rs &&
      (operator === "x" || operator === "÷")
    ) {
      setRS(parseFloat(rs) / 100);
    } else if (rs) {
      setRS(Math.round((parseFloat(rs) / 100) * prevNumber * 100) / 100);
    } else {
      setRS(
        Math.round((parseFloat(prevNumber) / 100) * prevNumber * 100) / 100
      );
    }
  };

  const square = () => {
    rs ? setRS(Math.pow(rs, 2)) : setRS(Math.pow(prevNumber, 2));
  };

  const onePerX = () => {
    rs ? setRS(1 / rs) : setRS(1 / prevNumber);
  };

  const squareRoot = () => {
    rs ? setRS(Math.sqrt(rs)) : setRS(Math.sqrt(prevNumber));
  };

  const resetCurrentState = () => {
    if (rs) {
      setRS("");
    } else {
      reset();
    }
  };

  const deleteLastCharacter = () => {
    rs ? setRS(rs.slice(0, rs.length - 1)) : setRS(rs);
  };

  const reset = () => {
    if (operator !== false) {
      setRS(0);
      prevNumber = 0;
      operator = false;
    } else {
      setRS("");
      prevNumber = 0;
      operator = false;
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {rs !== "" || rs === "0" ? (
            <NumericFormat
              value={rs}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumericFormat
              value={prevNumber.toString()}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <div className="btn-container">
          <div className="btn btn-fnc" onClick={percent}>
            <FaPercentage />
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
            <MdOutlineSuperscript />
          </div>
          <div className="btn btn-fnc" onClick={squareRoot}>
            <FaSquareRootAlt />
          </div>
          <form className="btn btn-operator" value="÷" onClick={operatorType}>
            ÷
          </form>
          <div className="btn number" onClick={inputNumber}>
            7
          </div>
          <div className="btn number" onClick={inputNumber}>
            8
          </div>
          <div className="btn number" onClick={inputNumber}>
            9
          </div>
          <form className="btn btn-operator" value="+" onClick={operatorType}>
            +
          </form>
          <div className="btn number" onClick={inputNumber}>
            4
          </div>
          <div className="btn number" onClick={inputNumber}>
            5
          </div>
          <div className="btn number" onClick={inputNumber}>
            6
          </div>
          <form className="btn btn-operator" value="x" onClick={operatorType}>
            x
          </form>
          <div className="btn number" onClick={inputNumber}>
            1
          </div>
          <div className="btn number" onClick={inputNumber}>
            2
          </div>
          <div className="btn number" onClick={inputNumber}>
            3
          </div>
          <form className="btn btn-operator" value="-" onClick={operatorType}>
            -
          </form>
          <div className="btn btn-fnc" onClick={minusPlus}>
            +/-
          </div>
          <div className="btn number zero" onClick={inputNumber}>
            0
          </div>
          <div className="btn number" onClick={inputNumber}>
            .
          </div>
          <form className="btn btn-operator" onClick={equals}>
            =
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
