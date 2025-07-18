import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Button,
} from "@mui/material";
import { ForumType } from "@/app/data/Forum";
import { handleNavigate, slugify } from "@/app/util/functions";
import { useRouter } from "next/navigation";
import CommentSection from "../Comment/CommentSection";

const Forum: React.FC<ForumType> = ({
    title,
    author,
    createdAt,
    description,
}) => {
    const router = useRouter();

    return (
        <Card sx={{ my: 3, borderRadius: 3, backgroundColor: "##F5F5F5" }}>
            <a
                onClick={() => {
                    handleNavigate(router, "forums/" + slugify(title));
                }}
            >
                <CardHeader
                    title={title}
                    subheader={`Posted by ${author} on ${new Date(
                        createdAt
                    ).toLocaleString()}`}
                />
            </a>
            <CardContent>
                <Typography variant="body1" mb={2}>
                    {description}
                </Typography>
                {/* {movie ? (
                    <a
                        onClick={() => {
                            handleNavigate(router, "movies/" + slugify(title));
                        }}
                    >
                        Find more {movie.title} ({movie.year} related forums)
                    </a>
                ) : (
                    ""
                )} */}
            </CardContent>
        </Card>
    );
};

export default Forum;
