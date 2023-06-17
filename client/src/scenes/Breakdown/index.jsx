import { Box, Grid } from '@mui/material'
import BreakdownChart from 'components/BreakdownChart'
import Header from 'components/Header'
import React from 'react'

const Breakdown = () => {
  return (
    <Box m='1rem 2rem'>
        <Header title='Breakdown'/>
        <Box height='70vh'>
            <BreakdownChart/>
        </Box>
    </Box>
  )
}

export default Breakdown