"use client";

import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Movie from "../components/Movie/Movie";
import { handleNavigate, slugify } from "../util/functions";
import { useRouter } from "next/navigation";
import { Film } from "../data/MovieData";

const Page = () => {
    const [inputValue, setInputValue] = useState("");
    const [debouncedInput] = useDebounce(inputValue, 300);
    const [fetchedFilms, setFetchedFilms] = useState<Film[]>([]);

    const router = useRouter();

    useEffect(() => {
        async function fetchFilms() {
            try {
                const resp = await fetch("http://localhost:8080/getFilms");
                if (!resp.ok) {
                    console.error("Failed to fetch films");
                    return;
                }
                const data = await resp.json();
                setFetchedFilms(data);
            } catch (error) {
                console.error("Error fetching films:", error);
            }
        }
        fetchFilms();
    }, []);
    const filteredMovies = fetchedFilms.filter((movie) =>
        movie.title.toLowerCase().includes(debouncedInput.toLowerCase())
    );

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
                    options={fetchedFilms}
                    getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.title
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

            <Box
                mt={4}
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 2,
                    justifyContent: "center",
                    maxWidth: "100%",
                }}
            >
                {filteredMovies.map((movie, index) => (
                    <a
                        key={index}
                        onClick={() =>
                            handleNavigate(
                                router,
                                `movies/${slugify(movie.title)}`
                            )
                        }
                    >
                        <Movie movie={movie} />
                    </a>
                ))}
            </Box>
        </Container>
    );
};

export default Page;
