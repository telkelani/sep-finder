import React from 'react';
import './style.css';

import InitialEnrollment from './SEPs/InitialEnrollment.js';
import AnnualOpenEnrollment from './SEPs/AnnualOpenEnrollment';
export default function App() {
  return (
    <div>
      <h1>SEP Finder</h1>
      <InitialEnrollment />
      <AnnualOpenEnrollment />
    </div>
  );
}
