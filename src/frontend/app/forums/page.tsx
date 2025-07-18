"use client";

import { Box, CircularProgress, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Forum from "../components/Forum/Forum";
import { ForumType } from "../data/Forum";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const [fetchedForums, setFetchedForums] = useState<ForumType[]>();
    // useEffect(() => {
    //     const forumsMap = new Map<number, ForumType>(
    //         Object.entries(mockForums).map(([id, forum]) => [Number(id), forum])
    //     );
    //     setFetchedForums(null);
    // }, []);

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
