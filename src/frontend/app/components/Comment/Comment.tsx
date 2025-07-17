import React from "react";
import { Box, Typography } from "@mui/material";

interface CommentProps {
    author: string;
    message: string;
    postedAt: number;
}

const Comment: React.FC<CommentProps> = ({ author, message, postedAt }) => {
    return (
        <Box sx={{ my: 1, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
            <Typography variant="subtitle2">{author}</Typography>
            <Typography variant="body2" color="textSecondary">
                {message}
            </Typography>
            <Typography variant="caption" color="textDisabled">
                {new Date(postedAt).toLocaleString()}
            </Typography>
        </Box>
    );
};

export default Comment;
