// StartPage.tsx
import React, { useState } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
  Paper,
  Container,
  FormControl,
  FormLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { FormData } from './types';

type StartPageProps = {
  onNext: () => void;
  userDataList: FormData[]; // Add userData prop
};

const StartPage: React.FC<StartPageProps> = ({ onNext, userDataList }) => {
  const [selectedOption1, setSelectedOption1] = useState<string | undefined>('');
  const [selectedOption2, setSelectedOption2] = useState<string | undefined>('');
  const [showWarning, setShowWarning] = useState(false);

  const handleChange1 = (value: string) => {
    setSelectedOption1(value);
    setShowWarning(value === 'yes1');
    setSelectedOption2(undefined);
  };

  const handleChange2 = (value: string) => {
    setSelectedOption2(value);
    setShowWarning(value === 'no2');
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h6" gutterBottom>
          Questionnaire:
        </Typography>

        <div style={{ marginBottom: '2rem' }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Are you without electricity, gas, or water?</FormLabel>
            <RadioGroup
              aria-label="question1"
              name="question1"
              value={selectedOption1}
              onChange={(e) => handleChange1(e.target.value)}
            >
              <FormControlLabel value="yes1" control={<Radio />} label="Yes" />
              <FormControlLabel value="no1" control={<Radio />} label="No" />
            </RadioGroup>
            {showWarning && (
              <Typography color="error" variant="body2">
                Please contact your foreman at {selectedOption1 === 'yes1' ? '+376423926719' : '+00393946334'}
              </Typography>
            )}
          </FormControl>
        </div>

        {selectedOption1 === 'no1' && (
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Have you contacted your provider to try to resolve your complaint?</FormLabel>
              <RadioGroup
                aria-label="question2"
                name="question2"
                value={selectedOption2}
                onChange={(e) => handleChange2(e.target.value)}
              >
                <FormControlLabel value="yes2" control={<Radio />} label="Yes" />
                <FormControlLabel value="no2" control={<Radio />} label="No" />
              </RadioGroup>
              {showWarning && (
                <Typography color="error" variant="body2">
                  Please contact your foreman at +00393946334
                </Typography>
              )}
            </FormControl>
          </div>
        )}
        {selectedOption2 === 'yes2' && (
          <Button variant="contained" color="primary" onClick={handleNext} style={{ marginTop: '2rem' }}>
            Next
          </Button>
        )}

         {/* Display the table with user data */}
         <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Title</TableCell>
              <TableCell>User First Name</TableCell>
              <TableCell>User Last Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDataList.map((userData, index) => (
              <TableRow key={index}>
                <TableCell>{userData.user_title}</TableCell>
                <TableCell>{userData.user_firstName}</TableCell>
                <TableCell>{userData.user_lastName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default StartPage;
