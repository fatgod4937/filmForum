"use client";

import {
    Box,
    Button,
    CircularProgress,
    Container,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Forum from "../components/Forum/Forum";
import { ForumType } from "../data/Forum";
import mockForums from "../data/forums.json";
import { handleNavigate, slugify } from "../util/functions";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const [fetchedForums, setFetchedForums] = useState<Map<number, ForumType>>(
        new Map([
            [
                1,
                {
                    title: "superman",
                    createdAt: Date.now(),
                    author: "szabi",
                    description: "lorem ipsum...",
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
