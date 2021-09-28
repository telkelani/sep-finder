import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";


function InitialEnrollment() {
  var [partA, setPartA] = useState(null)
  var [partB, setPartB] = useState(null)
  var today = new Date(2021,9,1); //months start from 0
  var MARadio = useRef();
  var MAPDRadio = useRef();
  var PDPRadio = useRef();

  var [MAChecked, setMAChecked] = useState(false);
  var [MAPDChecked, setMAPDChecked] = useState(true);
  var [PDPChecked, setPDPChecked] = useState(false);
  var [result, setResult] = useState(false);


  const threeOneThree = (today, partB) => {
    let valid = false;

    let firstOfTheMonth = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      1
    );

    let monthDiff = partB.getUTCMonth() - firstOfTheMonth.getUTCMonth(); //Difference in Months
    console.log(monthDiff)

    if (firstOfTheMonth.getUTCFullYear() == partB.getUTCFullYear()){
      
      if (Math.abs(monthDiff) <= 3) {
        valid = true;
      }
    }
    
   

    //Overlap on end of year (part B month Oct - Dec)
    else if (partB.getUTCMonth() >= 9) {
      if (firstOfTheMonth.getUTCFullYear() == partB.getUTCFullYear() + 1){
        if (monthDiff <= 11 && monthDiff >= 9) {
          valid = true;
        }
      }
 
    }

    //Overlap on the beginning of year (partB month Jan - Mar)
    else if (partB.getUTCMonth() <= 2) {
      if (firstOfTheMonth.getUTCFullYear() == partB.getUTCFullYear() - 1){
        if (Math.abs(monthDiff) <= 11 && Math.abs(monthDiff) >= 9) {
          valid = true;
        }
      }
      
    }
    return valid;
  };

  
  const threeMonthsPrior = () => {
    let valid = false
    let monthDiff =  today.getUTCMonth() - partB.getUTCMonth()
    let sameYear = partB.getUTCFullYear() == today.getUTCFullYear()
    let partBYearAfter = partB.getUTCFullYear() == today.getUTCFullYear() + 1

    if (sameYear) {
      if (monthDiff <= 3 && monthDiff >= 0){
        if (partB.toDateString() != today.toDateString()) {
          valid = true
        }
      }
    }

    else if (partBYearAfter){
      console.log(monthDiff)
      if (Math.abs(monthDiff) >= 9 && Math.abs(monthDiff) <= 11){
        valid = true
      }
    }
    return valid
  }

  const isIEPorICEP = () => {

    
    var sameAandB = partA.toDateString() == partB.toDateString();

    //Validation
    if (partA != null && partB != null) {
      console.log(partA)
      if (sameAandB) {
        var isICIEP = threeOneThree(today, partB);
        
        if (isICIEP) {
          if (MAChecked) {
            setResult('ICEP');
          } else {
            setResult('IEP');
          }
        } else {
          setResult('Not in IEP/ICEP');
        }
      }

      //if a & b not the same date
      else {
        let ICEP = threeMonthsPrior();
        if (ICEP && (MAChecked || MAPDChecked) ){ setResult('ICEP')}
        else {setResult('Check SEP')}

      

      }
    } else {
      setResult('Enter part A and part B date');
    }
  };

  return (
    <div>
      <p>IEP/ICEP</p>
      <label>Part A Start Date </label>
      <DatePicker selected={partA} onChange={(date) => setPartA(date)} dateFormat="MM/yyyy" showMonthYearPicker />
      <label>Part B Start Date </label>
      <DatePicker selected={partB} onChange={(date) => setPartB(date)} dateFormat="MM/yyyy" showMonthYearPicker />
      <br />
      <p>Note: All dates are on the first of the month</p>
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
      <br />
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
      <br />
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
      <br />
      <button type="submit" onClick={isIEPorICEP}>
        Submit
      </button>

      <h1>{result}</h1>

      <p>OEP-New</p>
    </div>
  );
}

export default InitialEnrollment;
