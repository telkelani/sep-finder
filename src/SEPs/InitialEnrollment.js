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
  var [result, setResult] = useState('');

  const isIEPorICEP = () => {
    var partA = new Date(partADate.current.value);
    var partB = new Date(partBDate.current.value);

    var sameAandB = partA.toDateString() == partB.toDateString();

    if (sameAandB) {
      if (MAChecked) {
        setResult('ICEP');
      } else {
        setResult('IEP');
      }
    } else {
    }
  };

  return (
    <div>
      <p>IEP/ICEP</p>
      <label>Part A Start Date </label>
      <input type="date" ref={partADate} onChange={isIEPorICEP} />
      <br />
      <label>Part B Start Date </label>
      <input type="date" ref={partBDate} onChange={isIEPorICEP} />
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
