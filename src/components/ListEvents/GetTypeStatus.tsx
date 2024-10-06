import { Chip } from '@mui/material'

type getTypeStatusProps = { status: string }

export default function GetTypeStatus({ status }: getTypeStatusProps): JSX.Element {
    switch (status) {
        case 'confirmed':
            return (
            <Chip
                sx={{
                    px: "4px",
                    backgroundColor: 'success.main',
                    color: "#fff",
                    fontWeight: 'bold'
                }}
                size="small"
                label='Confirmado'
            ></Chip>
        )
        case 'cancelled':
            return (
            <Chip
                sx={{
                    px: "4px",
                    backgroundColor: 'error.main',
                    color: "#fff",
                    fontWeight: 'bold'
                }}
                size="small"
                label='Cancelado'
            ></Chip>
        )
        case 'tentative':
            return (
            <Chip
                sx={{
                    px: "4px",
                    backgroundColor: 'secondary.main',
                    color: "#fff",
                    fontWeight: 'bold'
                }}
                size="small"
                label='En espera'
            ></Chip>
        )

        default:
            return (
            <Chip
                sx={{
                    px: "4px",
                    backgroundColor: 'secondary.main',
                    color: "#fff",
                    fontWeight: 'bold'
                }}
                size="small"
                label='En espera'
            ></Chip>
        )
    }
}