import { Box, Paper, Typography } from '@mui/material'
import { IconPalette } from '@tabler/icons-react'
import { useState } from 'react'

export default function InputColor({ colors, setValues, listColor = 'event' }) {
    const [colorSelected, setColorSelected] = useState(null)
    const [openPallet, setOpenPallet] = useState(false)
  return (
    <Box
        sx={{
            width: '100%',
            position: 'relative',
            cursor: 'pointer',
        }}
    >
        <Paper
            onClick={() => setOpenPallet(!openPallet)}
            elevation={0}
            sx={{
                height: '50px',
                padding: 2,
                border: `1px solid ${colorSelected ? colorSelected : '#5A6A85'}`,
                display: 'flex',
                backgroundColor: colorSelected ? colorSelected : 'white',
                color: colorSelected ? 'white' : '#5A6A85',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <Typography
                sx={{
                    fontSize: 16,
                    color: colorSelected ? 'white' : '#5A6A85',
                    marginRight: 1,
                }}
            >
                Seleccione el color del evento
            </Typography>
            <IconPalette />
        </Paper>
        <Paper
            elevation={6}
            sx={{
                display: openPallet ? 'block' : 'none',
                position: 'absolute',
                top: 'auto',
                left: 0,
                bottom: '10px',
                width: '100%',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 100
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    padding: 2,
                }}
                >
                {
                    colors &&
                    colors.calendar &&
                    Object.keys(colors[listColor]).map(key => (
                        <Box
                            key={key}
                            onClick={() => {
                                setColorSelected(colors[listColor][key].background)
                                setOpenPallet(false)
                                setValues('colorId', key)
                            }}
                            sx={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: colors[listColor][key].background,
                                margin: 1,
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',   
                                justifyContent: 'center',
                                fontSize: '15px'
                            }}
                        >
                            <IconPalette size={15} />
                        </Box>
                    ))
                }
                </Box>
            </Paper>
    </Box>
  )
}
