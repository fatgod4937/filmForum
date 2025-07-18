"use client";

import React, { useState } from "react";
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
    Snackbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import Auth from "../Auth/Auth";
import { Snack } from "@/app/data/Snack";
import { handleNavigate } from "@/app/util/functions";
import { useAuth } from "../../context/AuthContext";

const navItems = ["Home", "Movies"];

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
    const [showSnack, setShowSnack] = useState<Snack>();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const router = useRouter();

    const { isLoggedIn, login, logout } = useAuth();

    const drawerClick = (page: string) => {
        handleNavigate(router, page);
        setDrawerOpen(false);
    };

    function showSnackBar(message: string, isError: boolean) {
        setShowSnack({ open: true, message, isError });
    }

    function handleLogout(): void {
        logout();
        showSnackBar("Successful logout", false);
    }

    const snackStyle = {
        backgroundColor: showSnack?.isError ? "red" : "green",
        color: "white",
        px: 3,
        py: 1.5,
        borderRadius: 1,
        boxShadow: 3,
    };

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
                            FilmForum
                        </Typography>
                    </Box>

                    {!isMobile && (
                        <Box>
                            {navItems.map((item) => (
                                <Button
                                    key={item}
                                    color="inherit"
                                    onClick={() => {
                                        if (item === "Home") drawerClick("");
                                        else drawerClick(item);
                                    }}
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
                                <Button color="inherit" onClick={handleLogout}>
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
                                    onClick={() => drawerClick(text)}
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
                setLoggedIn={() => login()}
                onAuthSuccess={() =>
                    showSnackBar("Successful validation", false)
                }
                onAuthError={() => showSnackBar("Authentication failed", true)}
            />

            <Snackbar
                open={showSnack?.open}
                sx={{ marginTop: 4 }}
                autoHideDuration={3000}
                onClose={() =>
                    setShowSnack((prev) => ({ ...prev, open: false }))
                }
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Box sx={snackStyle}>
                    <Typography>{showSnack?.message}</Typography>
                </Box>
            </Snackbar>
        </>
    );
};

export default Navbar;
