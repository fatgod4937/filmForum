"use client";
import { IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useAuth } from "@/app/context/AuthContext";
import { CommentProps } from "@/app/data/Comment";
import SendIcon from "@mui/icons-material/Send";

const CommentSection = ({ id }: { id: string }) => {
    const { isLoggedIn } = useAuth();
    const [newComment, setNewComment] = useState<string>("");
    const [fetchedComments, setFetchedComments] = useState<CommentProps[]>();

    const fetchComments = async () => {
        try {
            const resp = await fetch(
                `http://localhost:8080/film_forum/forum_comments/${id}` //needsfix
            );
            const data = await resp.json();
            console.log(fetchedComments);
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [id]);
    const handleSend = async () => {
        if (!newComment.trim()) return;

        try {
            const resp = await fetch(
                "http://localhost:8080/film_forum/comments", //needsfix
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        forumId: id,
                        content: newComment,
                        author: "Anonymous",
                    }),
                }
            );

            if (!resp.ok) {
                throw new Error("Failed to post comment");
            }

            setNewComment("");
            await fetchComments();
        } catch (err) {
            console.error("Error posting comment:", err);
        }
    };

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
