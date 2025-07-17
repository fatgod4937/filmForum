export interface ForumType {
    title: string;
    createdAt: number;
    author: string;
    description: string;
    comments: {
        [commentId: string]: {
            author: string;
            message: string;
            postedAt: number;
        };
    };
    movie: {
        title: string;
        year: number;
    };
}
