import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Button,
} from "@mui/material";
import Comment from "../Comment/Comment";

interface CommentData {
    author: string;
    message: string;
    postedAt: number;
}

interface ForumProps {
    title: string;
    author: string;
    createdAt: number;
    description: string;
    comments: Record<string, CommentData>;
    movie?: {
        title: string;
        year: number;
    };
}

const Forum: React.FC<ForumProps> = ({
    title,
    author,
    createdAt,
    description,
    comments,
    movie,
}) => {
    function handleRedirect() {
        throw new Error("Function not implemented.");
    }

    return (
        <Card sx={{ my: 3, borderRadius: 3, backgroundColor: "##F5F5F5" }}>
            <CardHeader
                title={title}
                subheader={`Posted by ${author} on ${new Date(
                    createdAt
                ).toLocaleString()}`}
            />
            <CardContent>
                <Typography variant="body1" mb={2}>
                    {description}
                </Typography>
                {movie ? (
                    <Button
                        onClick={handleRedirect}
                        variant="outlined"
                        sx={{
                            color: "black",
                            paddingLeft: 0,
                            marginBottom: 5,
                        }}
                    >
                        Find more {movie.title} ({movie.year} related forums)
                    </Button>
                ) : (
                    ""
                )}
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Comments
                </Typography>

                {Object.entries(comments).map(([id, comment]) => (
                    <Comment key={id} {...comment} />
                ))}
            </CardContent>
        </Card>
    );
};

export default Forum;
