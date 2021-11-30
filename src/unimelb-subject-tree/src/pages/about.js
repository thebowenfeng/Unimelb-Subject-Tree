import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';


function About(){
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText('#ffffff'),
        backgroundColor: '#ffffff',
        '&:hover': {
            backgroundColor: '#bdbdbd',
        },
    }));

    return (
        <div className="wrapper2">
            <h2 className="body">Site is maintained by Bowen</h2>
            <h2 className="body">Built using React + Material UI</h2>
            <ColorButton variant="contained" href="/">Go back</ColorButton>
        </div>
    );
}

export default About;
