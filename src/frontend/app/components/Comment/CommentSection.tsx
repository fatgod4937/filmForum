"use client";
import { IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useAuth } from "@/app/context/AuthContext";
import { CommentProps } from "@/app/data/Comment";
import SendIcon from "@mui/icons-material/Send";
const CommentSection = () => {
    const { isLoggedIn } = useAuth();
    const [newComment, setNewComment] = useState<string>("");
    const [fetchedComments, setFetchedComments] = useState<CommentProps[]>();
    const comments: CommentProps[] = [
        {
            author: "alice",
            message: "This movie was amazing!",
            postedAt: new Date("2024-06-10T10:15:30Z"),
        },
        {
            author: "bob",
            message: "I found it kind of slow in the middle.",
            postedAt: new Date("2024-06-11T14:22:10Z"),
        },
        {
            author: "carol",
            message: "Great cinematography but weak plot.",
            postedAt: new Date("2024-06-12T18:45:00Z"),
        },
        {
            author: "dave",
            message: "Loved the ending!",
            postedAt: new Date("2024-06-13T09:05:50Z"),
        },
        {
            author: "eve",
            message: "Totally overrated.",
            postedAt: new Date("2024-06-14T20:30:00Z"),
        },
    ];
    useEffect(() => {
        setFetchedComments(comments);
    }, []);
    function handleSend() {
        return "";
    }

    return (
        <div className="pt-6">
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Comments
            </Typography>

            {fetchedComments?.map((comment, index) => (
                <Comment key={index} {...comment} />
            ))}

            {isLoggedIn ? (
                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    placeholder="Comment something!"
                    value={newComment}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton
                                    onClick={handleSend}
                                    disabled={!newComment.trim()}
                                    aria-label="send comment"
                                >
                                    <SendIcon />
                                </IconButton>
                            ),
                        },
                    }}
                    onChange={(e) => {
                        setNewComment(e.target.value);
                    }}
                ></TextField>
            ) : (
                ""
            )}
        </div>
    );
};

export default CommentSection;
