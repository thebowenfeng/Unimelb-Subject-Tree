import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {ListItemButton} from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import React from "react";

function SearchBox(props){
    function renderResult(elem){
        return <ListItem>
                <ListItemButton
                    component="a"
                    href={window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/#/subject/" + elem["obj"]["code"]}
                    target={"_blank"}>
                    <ListItemText primary={elem["obj"]["name"]} secondary={elem["obj"]["code"]} />
                </ListItemButton>
            </ListItem>
    }

    return(
        <List sx={{
            width: '100%',
            maxWidth: 700,
            bgcolor: 'background.paper',
            overflow: "auto",
            maxHeight: '75vh'
        }}>
            {props.dataSource != null && props.dataSource.map(renderResult)}
        </List>
    )
}

export default SearchBox;