import { MovieProps } from "@/app/data/MovieData";
import { handleNavigate } from "@/app/util/functions";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const Movie: React.FC<MovieProps> = ({ movie }) => {
    return (
        <Box
            mb={4}
            p={2}
            border="1px solid #ccc"
            borderRadius={2}
            sx={{ display: "flex", flexDirection: "row" }}
        >
            <img src={movie.posterLink} alt={movie.label} width={200} />
            <Box sx={{ marginLeft: 3 }} className="space-y-5">
                <h2>{movie.label}</h2>
                <p>
                    <strong>Genre:</strong> {movie.genre}
                </p>
                <p>{movie.description}</p>
            </Box>
        </Box>
    );
};

export default Movie;
