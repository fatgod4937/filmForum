import React, { useState, ChangeEvent, FormEvent } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { AuthModalProps, FormData } from "@/app/data/AuthData";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const Auth: React.FC<AuthModalProps> = ({
    open,
    mode,
    onClose,
    setLoggedIn,
    onAuthError,
    onAuthSuccess,
}) => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<boolean>(false);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const resp = await fetch(
                "http://localhost:8080/film_forum/" + mode,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: formData.email,
                        password: formData.password,
                    }),
                }
            );

            const message = await resp.text();
            console.log("Server response:", message);

            setError(false);
            onAuthSuccess?.();
            setLoggedIn(true);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(true);
            onAuthError?.();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box component="form" sx={style} onSubmit={handleSubmit}>
                <Typography variant="h6" mb={2} sx={{ color: "black" }}>
                    {mode === "login"
                        ? "Login to Your Account"
                        : "Create an Account"}
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    {mode === "login" ? "Login" : "Register"}
                </Button>
            </Box>
        </Modal>
    );
};

export default Auth;
