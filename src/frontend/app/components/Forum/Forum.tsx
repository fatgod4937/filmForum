import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Button,
    TextField,
} from "@mui/material";
import Comment from "../Comment/Comment";
import { ForumType } from "@/app/data/Forum";
import { useAuth } from "@/app/context/AuthContext";

interface CommentData {
    author: string;
    message: string;
    postedAt: number;
}

const Forum: React.FC<ForumType> = ({
    title,
    author,
    createdAt,
    description,
    comments,
    movie,
}) => {
    const [newComment, setNewComment] = useState<string>("");

    function handleRedirect() {
        throw new Error("Function not implemented.");
    }
    const { isLoggedIn } = useAuth();
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
                {isLoggedIn ? (
                    <TextField
                        fullWidth
                        multiline
                        variant="outlined"
                        placeholder="Comment something!"
                        value={newComment}
                        onChange={(e) => {
                            setNewComment(e.target.value);
                        }}
                    ></TextField>
                ) : (
                    ""
                )}
            </CardContent>
        </Card>
    );
};

export default Forum;
