"use client";

import { Box } from "@mui/material";
import React from "react";
import type { Film } from "@/app/data/MovieData";

export interface MovieProps {
    movie: Film;
}

const Movie: React.FC<MovieProps> = ({ movie }) => {
    return (
        <Box
            mb={4}
            p={2}
            border="1px solid #ccc"
            borderRadius={2}
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
            }}
        >
            <Box className="space-y-1">
                <h2 style={{ margin: 0 }}>{movie.title}</h2>
                <p style={{ margin: 0 }}>
                    <strong>Genre:</strong> {movie.genre}
                </p>
                <p style={{ margin: 0 }}>
                    <strong>Release Date:</strong>{" "}
                    {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
            </Box>
        </Box>
    );
};

export default Movie;
