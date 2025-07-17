package com.tcs.miniproject.FilmForum.DTO;

import java.time.Instant;

public record CommentItemDTO(String username, String comment, Instant createdAt) {
}
