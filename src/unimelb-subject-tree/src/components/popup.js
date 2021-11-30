import {Popper, Box} from "@material-ui/core";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';

function Popup(props){
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText('#ffffff'),
        backgroundColor: '#ffffff',
        '&:hover': {
            backgroundColor: '#bdbdbd',
        },
    }));

    function textAsButton(d){
        return <ColorButton href={"/#/subject/" + d} target={"_blank"}>{d}</ColorButton>
    }

    return (
        <div>
            <Popper
                id={"search-popup"}
                open={props.isOpen}
                anchorEl = {document.getElementById("bruh")}
                placement= "auto-start"
            >
                <Box sx={{
                    border: '1px solid grey',
                    p: 1,
                    bgcolor: 'background.paper',
                    marginTop: 10,
                    marginLeft: -15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    maxHeight: "60vh",
                    overflow: "auto"
                }}
                     boxShadow={3}
                >
                    {props.dataSource.map(textAsButton)}
                </Box>
            </Popper>
        </div>
    )
}

export default Popup;