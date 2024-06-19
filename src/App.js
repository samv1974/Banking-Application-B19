import React, { useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import PersonalDetailsForm from './PersonalDetailsForm';

function App() {
  const [pdfStatus, setPdfStatus] = useState({});

  const handlePdfOpen = (pdfId) => {
    setPdfStatus((prevStatus) => ({ ...prevStatus, [pdfId]: true }));
  };

  const allPdfsOpened = Object.keys(pdfStatus).length === 5;

  return (
    <div>
      <HomePage handlePdfOpen={handlePdfOpen} pdfStatus={pdfStatus} />
      <div className="flex justify-center items-center mt-10">
        <button
          className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${!allPdfsOpened ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!allPdfsOpened}
        >
          Start Application
        </button>
      </div>
      {allPdfsOpened && (
        <div className="flex justify-center items-center mt-10">
          <PersonalDetailsForm />
        </div>
      )}
    </div>
  );
}

export default App;
