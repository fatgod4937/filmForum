package com.tcs.miniproject.FilmForum.DTO;

import java.time.Instant;

public record ForumItemDTO(int id, int FilmId, String title, String username, Instant createdAt) {
}
