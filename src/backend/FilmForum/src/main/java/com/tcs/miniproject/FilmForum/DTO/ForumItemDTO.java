package com.tcs.miniproject.FilmForum.DTO;

import java.time.Instant;

public record ForumItemDTO(String title, String username, Instant createdAt) {
}
