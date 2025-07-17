package com.tcs.miniproject.FilmForum.DTO;

public record CommentCreateDTO(int commentId, int userId, int forumId, String comment) {
}
