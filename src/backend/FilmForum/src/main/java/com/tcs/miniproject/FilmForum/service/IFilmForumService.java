package com.tcs.miniproject.FilmForum.service;

import com.tcs.miniproject.FilmForum.DTO.*;
import com.tcs.miniproject.FilmForum.entities.Comment;
import com.tcs.miniproject.FilmForum.entities.Film;
import com.tcs.miniproject.FilmForum.entities.Forum;

import java.util.List;

public interface IFilmForumService {
    // User-handling
    public String register(String username, String password);
    public int login(String username, String password);

    //Listings
    public List<FilmDTO> listAllFilms();
    public List<CommentItemDTO> listAllCommentsByForumId(int id);
    public List<ForumItemDTO> listAllForumsByFilmId(int id);
    public ForumDetailDTO getForumById(int id);
    public List<ForumItemDTO> listAllForums();

    // posts
    public String createComment(CommentCreateDTO comment);
    public String createForum(ForumCreateDTO forum);

    public String updateComment(CommentCreateDTO comment);
    public String updateForum(ForumCreateDTO forum);

    public String deleteComment(int commentId, int userId);
    public String deleteForum(int forumId, int userId);
}
