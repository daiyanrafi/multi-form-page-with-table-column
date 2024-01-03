// UserDataTable.tsx
import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { FormData } from './types';

type UserDataTableProps = {
  userData: FormData;
};

const UserDataTable: React.FC<UserDataTableProps> = ({ userData }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User Title</TableCell>
          <TableCell>User First Name</TableCell>
          <TableCell>User Last Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{userData.user_title}</TableCell>
          <TableCell>{userData.user_firstName}</TableCell>
          <TableCell>{userData.user_lastName}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default UserDataTable;
