import { createTheme } from '@material-ui/core/styles';


const theme = createTheme({
    palette: {
        primary: {
            main: '#1A335A'
        },
        secondary: {
            main: '#ECF0F1'
        },
    },
    overrides: {
        MuiAppBar: {
            
        }
    }
})

export default theme