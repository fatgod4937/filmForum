"use client";

import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import Auth from "../Auth/Auth";

const navItems = ["Home", "Forums", "Movies"];

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
    const router = useRouter();
    useEffect(() => {
        const dummyCookie = localStorage.getItem("cookie");
        if (dummyCookie) setIsLoggedIn(true);
    }, [isLoggedIn]);

    const handleNavigate = (page: string) => {
        router.push(`/${page.toLowerCase()}`);
        setDrawerOpen(false);
    };
    function handleLogout(): void {
        localStorage.removeItem("cookie");
        setIsLoggedIn(false);
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box display="flex" alignItems="center">
                        {isMobile && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={() => setDrawerOpen(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ ml: isMobile ? 1 : 0 }}
                        >
                            FIlmForum
                        </Typography>
                    </Box>

                    {!isMobile && (
                        <Box>
                            {navItems.map((item) => (
                                <Button
                                    key={item}
                                    color="inherit"
                                    onClick={() => handleNavigate(item)}
                                >
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    )}
                    <Box>
                        {!isLoggedIn ? (
                            <>
                                <Button
                                    color="inherit"
                                    onClick={() => setAuthMode("login")}
                                >
                                    Login
                                </Button>
                                <Button
                                    color="inherit"
                                    onClick={() => setAuthMode("register")}
                                >
                                    Register
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    color="inherit"
                                    onClick={() => handleNavigate("profile")}
                                >
                                    Profile
                                </Button>
                                <Button
                                    color="inherit"
                                    onClick={() => handleLogout()}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        {navItems.map((text) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton
                                    onClick={() => handleNavigate(text)}
                                >
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Auth
                open={!!authMode}
                mode={authMode}
                onClose={() => setAuthMode(null)}
                setLoggedIn={(x: boolean) => setIsLoggedIn(x)}
            />
        </>
    );
};

export default Navbar;
