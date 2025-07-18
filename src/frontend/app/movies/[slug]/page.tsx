// app/film_forum/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    Container,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Box,
} from "@mui/material";
import { ForumType } from "@/app/data/Forum";
import { MovieProps } from "@/app/components/Movie/Movie";
import CommentSection from "@/app/components/Comment/CommentSection";

export default function ForumListPage() {
    const { slug } = useParams();
    const [posts, setPosts] = useState<ForumType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch(
                    `http://localhost:8080/film_forum/film_forums/${slug}`,
                    {
                        method: "GET",
                    }
                );
                if (!res.ok) throw new Error("Failed to fetch forum posts");

                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, [slug]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={6}>
                <CircularProgress />
            </Box>
        );
    }

    if (!posts.length) {
        return (
            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Typography variant="h6" color="text.secondary">
                    No forum posts found for ID: {slug}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom>
                Forum Posts for ID: {slug}
            </Typography>

            {posts.map((post) => (
                <Card key={post.id} sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mt: 1 }}
                        >
                            Posted by {post.author} on{" "}
                            {new Date(post.createdAt).toLocaleString()}
                        </Typography>
                    </CardContent>
                    {/*Needs fix */} <CommentSection id={post.id} />
                </Card>
            ))}
        </Container>
    );
}
