import React, { useState } from 'react';
import { Box, createTheme, ThemeProvider, List, ListItem, ListItemText, Divider } from '@mui/material';
import NavBar from '../components/NavBar';
import ViewTable from "../components/Views/ViewTable";
import ViewBarChart from "../components/Views/ViewBarChart";
import ViewLineChart from "../components/Views/ViewLineChart";
import ViewPieChart from "../components/Views/ViewPieChart";

import { Theme } from '../theme/main';

export default function UserHistory() {
  const [themeMode, setThemeMode] = useState('light');
  const [selectedCompany, setSelectedCompany] = useState('');

  const companies = ['Company_01', 'Company_02', 'Company_03']; 

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider
      theme={themeMode === 'light' ? createTheme(Theme('light')) : createTheme(Theme('dark'))}
    >
      <NavBar toggleThemeMode={toggleThemeMode} />
      <Box display="flex" sx={{ m: 1 }}>
        {/* 侧边栏 */}
        <Box sx={{ width: 250, borderRadius: 2, boxShadow: 3, m: 1 }}>
          <List component="nav" aria-label="mailbox folders">
            {companies.map((company, index) => (
              <React.Fragment key={company}>
                {index > 0 && <Divider />}
                <ListItem 
                  button 
                  selected={selectedCompany === company} 
                  onClick={() => setSelectedCompany(company)}
                  sx={{ borderBottom: selectedCompany === company && '1.5px solid black' }}
                >
                  <ListItemText primary={company} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>
        {/* 主内容区 */}
        <Box flexGrow={1} sx={{ borderRadius: 2, boxShadow: 3, m: 1, p: 1 }}>
          {selectedCompany && (
            <>
              <ViewTable company={selectedCompany} />
              <ViewBarChart company={selectedCompany} />
              <ViewLineChart company={selectedCompany} />
              <ViewPieChart company={selectedCompany} />
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
