import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { path } from '../../npwd.config';
import { NavLink, useLocation } from 'react-router-dom';
import { CreditCard, People, Person } from '@mui/icons-material';
import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const [page, setPage] = useState(pathname);

  const handleChange = (_e: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <BottomNavigation value={page} onChange={handleChange} showLabels>
      <BottomNavigationAction label={'Me'} value={path} component={NavLink} icon={<Person />} to={path} />
      <BottomNavigationAction
        label={'Licenses'}
        value="licenses"
        color="secondary"
        component={NavLink}
        icon={<CreditCard />}
        to={`${path}/licenses`}
      />
      <BottomNavigationAction
        label={'Shared'}
        value="shared"
        color="secondary"
        component={NavLink}
        icon={<People />}
        to={`${path}/shared`}
      />
    </BottomNavigation>
  );
};

export default Footer;
