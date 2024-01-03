// App.tsx
import React, { FormEvent, useState } from 'react';
import { Container, Paper, Typography, Grid, Button } from '@mui/material';
import { UserForm } from './UserForm';
import { AddressForm } from './AddressForm';
// import { AccountForm } from './AccountForm';
import { ComplaintForm } from './Complaint';
import { IncidentAddressForm } from './IncidentAddressForm';
import StartPage from './StartPage';
import { ComplaintCont } from './ComplaintCont';
import { FinalizeSubmissionForm } from './FinalizeSubmissionForm';
import { RepresentativeForm } from './Representative';
import { FormData } from './types'; // Import the shared type

const INITIAL_DATA: FormData = {
  //use-info-page
  user_title: '',
  user_firstName: '',
  user_lastName: '',
  user_postalAddress: '',
  user_address: '',
  user_suburb: '',
  user_postcode: '',
  user_state: '',
  user_country: '',
  user_preferredContact: '',
  user_landline: '',
  user_mobile: '',
  user_email: '',
  // RepresentativeForm-data page
  representativeTitle: '',
  representativeFirstName: '',
  representativeLastName: '',
  representativePostalAddress: '',
  representativeSuburb: '',
  representativePostcode: '',
  representativeState: '',
  representativeCountry: '',
  representativePreferredContact: '',
  representativeLandline: '',
  representativeMobile: '',
  representativeEmail: '',
  //for address page
  address_street: '',
  address_city: '',
  address_state: '',
  address_zip: '',
  //Incident-address-page
  incident_address: '',
  incident_address1: '',
  incident_city: '',
  incident_postcode: '',
  incident_state: '',
  //complaint page 
  complaint_supplier: '',
  complaint_service: '',
  complaint_accountNumber: '',
  complaint_complaintDescription: '',
  complaint_resolutionDescription: '',
  //complaint-cont page
  complaint_cont_concession: '',
  complaint_cont_concessionTypes: [],
  complaint_cont_hasComplaint: '',
  complaint_cont_complaintDescription: '',
  complaint_cont_agree: false,
  complaint_cont_treeIdentification: '',
  //final-page-submission
  final_sub_bestTime: '',
  final_sub_howDidYouHear: '',
  final_sub_attachFile: null,
  final_sub_isRobot: false,
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [showStartPage, setShowStartPage] = useState(true);//
  const [currentStepIndex, setCurrentStepIndex] = useState(0); //
  const [userList, setUserList] = useState<FormData[]>([]);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  function next() {
    setCurrentStepIndex((i) => (i >= steps.length - 1 ? i : i + 1));
  }

  function back() {
    setCurrentStepIndex((i) => (i <= 0 ? i : i - 1));
  }

  function startForm() {
    setData(INITIAL_DATA);
    setCurrentStepIndex(0);
    setShowStartPage(false);
  }

  const steps = [
    <UserForm {...data} updateFields={updateFields} />,
    <RepresentativeForm {...data} updateFields={updateFields} />,
    <AddressForm {...data} updateFields={updateFields} />,
    <IncidentAddressForm {...data} updateFields={updateFields} />,
    <ComplaintForm {...data} updateFields={updateFields} />,
    <ComplaintCont {...data} updateFields={updateFields} />,
    <FinalizeSubmissionForm {...data} updateFields={updateFields} />
  ];

  const step = showStartPage ? (
    <StartPage onNext={startForm} userDataList={userList} />
  ) : (
    steps[currentStepIndex]
  );

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    // Add the current data to the user list
    setUserList((prevList) => [...prevList, data]); //new
    console.log(data);
    // alert('Successful Account Creation');
    // setShowStartPage(true); //old
    // Reset the form data for the next entry
    setData(INITIAL_DATA);
    setShowStartPage(true);
    // next();
    setCurrentStepIndex(0);
  }

  return (
    <Container
      component="main"
      maxWidth={false}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#d7e3f5'
      }}
    >
      {showStartPage ? (
        <StartPage onNext={startForm} userDataList={userList} />
      ) : (
        <Paper
          style={{
            padding: '2rem',
            borderRadius: '.5rem',
            fontFamily: 'Arial',
            maxWidth: '600px',
          }}
        >
          <form onSubmit={onSubmit}>
            <div style={{ textAlign: 'right' }}>
              {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              {!isFirstStep && (
                <Button
                  type="button"
                  onClick={back}
                  style={{ marginRight: '8px', backgroundColor: 'blue', color: 'white' }}
                >
                  Back
                </Button>
              )}
              {!isLastStep && (
                <Button
                  type="submit"
                  style={{ marginRight: '8px', backgroundColor: 'blue', color: 'white' }}
                >
                  Next
                </Button>
              )}
              {isLastStep && (
                <Button
                  type="submit"
                  style={{ backgroundColor: 'blue', color: 'white' }}
                >
                  Finish
                </Button>
              )}
            </div>
          </form>
        </Paper>
      )}
    </Container>
  );
}

export default App;
