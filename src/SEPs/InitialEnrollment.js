import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './IEP.css';

function InitialEnrollment() {
  var [partA, setPartA] = useState(null);
  var [partB, setPartB] = useState(null);
  var [partD, setPartD] = useState(null);
  var [today, setToday] = useState(new Date());
  var MARadio = useRef();
  var MAPDRadio = useRef();
  var PDPRadio = useRef();

  var [MAChecked, setMAChecked] = useState(false);
  var [MAPDChecked, setMAPDChecked] = useState(true);
  var [PDPChecked, setPDPChecked] = useState(false);
  var [result, setResult] = useState(null);

  const ShowResult = () => {
    const resultStyle = {
      color: 'red',
    };

    if (result == null) {
      return null;
    }

    if (result == 'IEP 🎉' || result == 'ICEP 🎉') {
      resultStyle.color = '#00fc43'; //green
    }
    else if (result == 'Check for SEP 😳'){
      resultStyle.color = '#eba836' //yellow
    }
    
    else {
      resultStyle.color = '#f23400' //red
    }
    return (
      <div className="result-container">
        <h1 style={resultStyle}>{result}</h1>
      </div>
    );
  };

  const threeOneThree = (today, partB) => {
    let valid = false;

    let monthDiff = partB.getUTCMonth() - today.getUTCMonth(); //Difference in Months
    let sameYear = today.getUTCFullYear() == partB.getUTCFullYear();
    let todayYearAfterB = today.getUTCFullYear() == partB.getUTCFullYear() + 1;
    let todayYearBeforeB = today.getUTCFullYear() == partB.getUTCFullYear() - 1;

    if (sameYear) {
      if (Math.abs(monthDiff) <= 3) {
        valid = true;
      }
    }

    //Overlap on end of year (part B month Oct - Dec)
    else if (partB.getUTCMonth() >= 9) {
      if (todayYearAfterB) {
        if (monthDiff <= 11 && monthDiff >= 9) {
          valid = true;
        }
      }
    }

    //Overlap on the beginning of year (partB month Jan - Mar)
    else if (partB.getUTCMonth() <= 2) {
      if (todayYearBeforeB) {
        if (Math.abs(monthDiff) <= 11 && Math.abs(monthDiff) >= 9) {
          valid = true;
        }
      }
    }
    return valid;
  };

  const threeMonthsPrior = () => {
    let valid = false;
    let monthDiff = partB.getUTCMonth() - today.getUTCMonth();
    let sameYear = partB.getUTCFullYear() == today.getUTCFullYear();
    let partBYearAfter = partB.getUTCFullYear() == today.getUTCFullYear() + 1;

    if (sameYear) {
      if (monthDiff <= 3 && monthDiff >= 0) {
        if (partB.toDateString() != today.toDateString()) {
          valid = true;
        }
      }
    } else if (partBYearAfter) {
      console.log(monthDiff);
      if (Math.abs(monthDiff) >= 9 && Math.abs(monthDiff) <= 11) {
        valid = true;
      }
    }
    return valid;
  };

  const isIEPorICEP = () => {
    //Validation
    if (partA != null && partB != null) {
      var sameAandB = partA.toDateString() == partB.toDateString();

      if (sameAandB) {
        var isICIEP = threeOneThree(today, partB);

        if (isICIEP) {
          if (MAChecked) {
            setResult('ICEP 🎉');
          } else {
            setResult('IEP 🎉');
          }
        } else {
          setResult('Not in IEP/ICEP 😢');
        }
      }

      //if a & b not the same date
      else {
        if (PDPChecked) {
          let IEP = threeOneThree(today, partD);
          if (IEP) {
            setResult('IEP 🎉');
          } else {
            setResult('Check for SEP 😳');
          }
        } else {
          if (partA == null && partB == null) {
            setResult('Enter part A and part B date');
            return;
          }

          let ICEP = threeMonthsPrior();
          if (ICEP && (MAChecked || MAPDChecked)) {
            setResult('ICEP 🎉');
          } else {
            setResult('Check for SEP 😳');
          }
        }
      }
    } else {
      if (partA == null && partB == null) {
        setResult('Enter part A and B Date 😡');
        return;
      }

      if (partA == null) {
        setResult('Enter part A Date 😡');
        return;
      }

      if (partB == null) {
        setResult('Enter part B Date 😡');
        return;
      }
      if (partD == null) {
        setResult('Enter Part D date 😡');
        return;
      }
      if (PDPChecked) {
        let IEP = threeOneThree(today, partD);
        if (IEP) {
          setResult('IEP 🎉');
        } else {
          setResult('Check for SEP 😳');
        }
      }
    }
  };

  return (
    <div>
      <div className="iep-title-container">
        <h2>IEP/ICEP Calculator</h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="date">
          <label className="date-label">Part A Start Date </label>
          <DatePicker
            className="date-input"
            selected={partA}
            onChange={(date) => setPartA(date)}
            dateFormat="MM/01/yyyy"
            showMonthYearPicker
          />
        </div>

        <div className="date">
          <label className="date-label">Part B Start Date </label>
          <DatePicker
            className="date-input"
            selected={partB}
            onChange={(date) => setPartB(date)}
            dateFormat="MM/01/yyyy"
            showMonthYearPicker
          />
        </div>

        <div className="date">
          <label className="date-label">Part D Date</label>
          <DatePicker
            className="date-input"
            selected={partD}
            onChange={(date) => setPartD(date)}
            dateFormat="MM/01/yyyy"
            showMonthYearPicker
          />
        </div>

        <div className="date">
          <label className="date-label">Current Date</label>
          <DatePicker
            className="date-input"
            selected={today}
            onChange={(date) => setToday(date)}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '50px',
        }}
      >
        <div className="radio-button">
          <label>MA</label>
          <input
            id="MA"
            type="radio"
            name="plan-type"
            ref={MARadio}
            onClick={() => {
              setMAChecked(true);
              setMAPDChecked(false);
              setPDPChecked(false);
            }}
          />
        </div>

        <div className="radio-button">
          <label>MAPD</label>
          <input
            id="MAPD"
            type="radio"
            name="plan-type"
            ref={MAPDRadio}
            checked={MAPDChecked}
            onChange={() => {
              setMAChecked(false);
              setMAPDChecked(true);
              setPDPChecked(false);
            }}
          />
        </div>

        <div className="radio-button">
          <label>PDP</label>
          <input
            id="PDP"
            type="radio"
            name="plan-type"
            ref={PDPRadio}
            onClick={() => {
              setMAChecked(false);
              setMAPDChecked(false);
              setPDPChecked(true);
            }}
          />
        </div>
      </div>

      <div class="button-container">
        <button id="submit-button" type="submit" onClick={isIEPorICEP}>
          Submit
        </button>
      </div>
      <ShowResult />
    </div>
  );
}

export default InitialEnrollment;
