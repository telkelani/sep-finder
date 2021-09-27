import React, { useRef, useState } from 'react';

function InitialEnrollment() {
  var partADate = useRef();
  var partBDate = useRef();
  var MARadio = useRef();
  var MAPDRadio = useRef();
  var PDPRadio = useRef();

  var [MAChecked, setMAChecked] = useState(false);
  var [MAPDChecked, setMAPDChecked] = useState(true);
  var [PDPChecked, setPDPChecked] = useState(false);
  var [result, setResult] = useState(false);

  const threeOneThree = (today, partB) => {
    let valid = false;

    console.log(partADate.current)

    let firstOfTheMonth = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      1
    );

    let monthDiff = partB.getUTCMonth() - firstOfTheMonth.getUTCMonth(); //Difference in Months

    //3 months before or after
    if (firstOfTheMonth.getUTCFullYear() == partB.getUTCFullYear()){
      if (Math.abs(monthDiff) <= 3) {
        valid = true;
      }
    }
   

    //Overlap on end of year (part B month Oct - Dec)
    if (partB.getUTCMonth() >= 9) {
      if (firstOfTheMonth.getUTCFullYear() == partB.getUTCFullYear() + 1){
        if (monthDiff <= 11 && monthDiff >= 9) {
          valid = true;
        }
      }
 
    }

    //Overlap on the beginning of year (partB month Jan - Mar)
    if (partB.getUTCMonth() <= 2) {
      if (firstOfTheMonth.getUTCFullYear() == partB.getUTCFullYear() - 1){
        if (Math.abs(monthDiff) <= 11 && Math.abs(monthDiff) >= 9) {
          valid = true;
        }
      }
      
    }
    return valid;
  };

  const isIEPorICEP = () => {
    var partA = new Date(partADate.current.value);
    var partB = new Date(partBDate.current.value);
    var today = new Date(2020, 8, 1); //months start from 0
    var sameAandB = partA.toDateString() == partB.toDateString();

    //Validation
    if (partADate.current.value != '' && partBDate.current.value != '') {
      if (sameAandB) {
        var isICIEP = threeOneThree(today, partB);
        console.log(isICIEP);
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
    } else {
      setResult('Enter part A and part B date');
    }
  };

  return (
    <div>
      <p>IEP/ICEP</p>
      <label>Part A Start Date </label>
      <input type="date" ref={partADate} />
      <br />
      <label>Part B Start Date </label>
      <input type="date" ref={partBDate} />
      <br />
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