"use client";

import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Forum from "../components/Forum/Forum";
import { ForumType } from "../data/Forum";
import mockForums from "../data/forums.json";

const page = () => {
    const [fetchedForums, setFetchedForums] = useState<Map<number, ForumType>>(
        new Map([
            [
                1,
                {
                    title: "superman",
                    createdAt: Date.now(),
                    author: "szabi",
                    description: "lorem ipsum...",
                    comments: {
                        1: {
                            author: "akos",
                            message: "hulyeseg",
                            postedAt: Date.now(),
                        },
                        2: {
                            author: "laci",
                            message: "hulyeseg",
                            postedAt: Date.now(),
                        },
                        3: {
                            author: "lajos",
                            message: "hulyeseg",
                            postedAt: Date.now(),
                        },
                        4: {
                            author: "tibi",
                            message: "oszinten nem tom mit irjak meg",
                            postedAt: Date.now(),
                        },
                    },
                    movie: {
                        title: "Superman",
                        year: 2025,
                    },
                },
            ],
        ])
    );
    useEffect(() => {
        const forumsMap = new Map<number, ForumType>(
            Object.entries(mockForums).map(([id, forum]) => [Number(id), forum])
        );
        setFetchedForums(forumsMap);
    }, []);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box>
                {!fetchedForums ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box>
                        {Array.from(fetchedForums.entries()).map(
                            ([id, forum]) => (
                                <Forum key={id} {...forum} />
                            )
                        )}
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default page;
