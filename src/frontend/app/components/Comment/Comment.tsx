import React from "react";
import { Box, Typography } from "@mui/material";
import { CommentProps } from "@/app/data/Comment";

const Comment: React.FC<CommentProps> = ({
    author,
    message,
    postedAt,
}: CommentProps) => {
    return (
        <Box sx={{ my: 1, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
            <Typography variant="subtitle2">{author}</Typography>
            <Typography variant="body2" color="textSecondary">
                {message}
            </Typography>
            <Typography variant="caption" color="textDisabled">
                {postedAt.toLocaleDateString()}
            </Typography>
        </Box>
    );
};

export default Comment;
