import { ShoppingCart } from "@mui/icons-material"
import { AppBar, Badge, FormControlLabel, IconButton, List, ListItem, Switch, Toolbar } from "@mui/material"
import { Box } from "@mui/system"
import { Link, NavLink } from "react-router-dom"

import { useAppSelector } from "../Store/ConfigureStore"

interface HeaderProps {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

interface LinksProps {
    links: {
        title: string
        path: string
    }[]
}

function ToolbarLinks({links}: LinksProps) {
    return (
        <List sx={{display: "flex"}}>
            {links.map(({title, path}) => 
                <ListItem 
                    component={NavLink} 
                    to={path}
                    key={path}
                    sx={{
                        color: "inherit",
                        typography: "h6",
                        "&:hover": {
                            color: "grey.500"
                        },
                        "&.active": {
                            color: "text.secondary"
                        }
                    }}
                >
                    {title.toUpperCase()}
                </ListItem>
            )}
        </List>
    )
}

const flexBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
}

export default function Header({isDarkMode, toggleDarkMode}: HeaderProps) {
	const {basket} = useAppSelector(state => state.basket)
	const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position="static" sx={{marginBottom: 4}}>
            <Toolbar sx={flexBoxStyle}>
                <Box sx={flexBoxStyle}>
                    <ToolbarLinks links={[{
                        title: "re-store",
                        path: "/"
                    }]}/>
                    <FormControlLabel 
                        control={
                            <Switch checked={isDarkMode} onChange={toggleDarkMode}/>
                        } 
                        label={isDarkMode ? "DARK MODE" : "LIGHT MODE"}
                    />
                </Box>

                <ToolbarLinks links={[
                    {
                        title: "catalog",
                        path: "/catalog"
                    }, {
                        title: "about",
                        path: "/about"
                    }, {
                        title: "contact",
                        path: "/contact"
                    }
                ]}/>

                <Box sx={flexBoxStyle}>
                    <IconButton component={Link} to="/basket" size="large" sx={{color: "inherit"}}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                    <ToolbarLinks links={[
                        {
                            title: "login",
                            path: "/login"
                        }, {
                            title: "register",
                            path: "/register"
                        }
                    ]}/>
                </Box>
            </Toolbar>
        </AppBar>
    )
}