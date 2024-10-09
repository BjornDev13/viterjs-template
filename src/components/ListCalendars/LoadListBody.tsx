import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Skeleton, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function LoadListBody() {

    const skeletonArray = Array.from(new Array(5));

    return (
      <Box sx={{
        marginTop: '10px'
      }}>
        {skeletonArray.map((_, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Skeleton variant="text" width="80%" />
            </AccordionSummary>
            <AccordionDetails>
              <Skeleton variant="rectangular" width="100%" height={50} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
}
