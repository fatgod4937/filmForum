"use client";

import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import Movie from "../components/Movie/Movie";
import { handleNavigate } from "../util/functions";
import { useRouter } from "next/navigation";

const fetchedFilms = [
    {
        id: 1,
        label: "The Godfather",
        posterLink: "imgs/posters/godfather.jpg",
        description:
            "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        genre: "Crime, Drama",
    },
    {
        id: 2,
        label: "Pulp Fiction",
        posterLink: "imgs/posters/pulpfiction.jpg",
        description:
            "The lives of two mob hitmen, a boxer, and others intertwine in tales of violence and redemption.",
        genre: "Crime, Drama",
    },
    {
        id: 3,
        label: "Fight Club",
        posterLink: "imgs/posters/fightclub.jpg",
        description:
            "An insomniac office worker and a soap maker form an underground fight club that evolves into something more.",
        genre: "Drama",
    },
];

const Page = () => {
    const [inputValue, setInputValue] = useState("");
    const [debouncedInput] = useDebounce(inputValue, 300);

    const filteredMovies = fetchedFilms.filter((movie) =>
        movie.label.toLowerCase().includes(debouncedInput.toLowerCase())
    );
    const router = useRouter();
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Autocomplete
                    freeSolo
                    disablePortal
                    options={fetchedFilms}
                    getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.label
                    }
                    sx={{ width: 300 }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Movie" />
                    )}
                />
            </Box>

            <Box mt={4}>
                {filteredMovies.map((movie) => (
                    <Button
                        sx={{ color: "black", textDecoration: "none" }}
                        onClick={() => {
                            handleNavigate(router, "movies/" + "fing");
                        }}
                    >
                        <Movie key={movie.id} movie={movie} />
                    </Button>
                ))}
            </Box>
        </Container>
    );
};

export default Page;
