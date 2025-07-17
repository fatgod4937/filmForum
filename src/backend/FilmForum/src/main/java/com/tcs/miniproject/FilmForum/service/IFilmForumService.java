package com.tcs.miniproject.FilmForum.service;

import com.tcs.miniproject.FilmForum.entities.Comment;
import com.tcs.miniproject.FilmForum.entities.Film;
import com.tcs.miniproject.FilmForum.entities.Forum;

import java.util.List;

public interface IFilmForumService {
    // User-handling
    public String register(String username, String password);
    public int login(String username, String password);

    //Listings
    public List<Film> listAllFilms();
    public List<Comment> listAllCommentsByForumId(int id);
    public List<Forum> listAllForumsByFilmId(int id);

    // posts
    public Comment createComment(Comment comment, int userId);
    public Forum createForum(Forum forum, int userId);

    public Comment updateComment(Comment comment, int userId);
    public Forum updateForum(Forum forum, int userId);

    public Comment deleteComment(Comment comment, int userId);
    public Forum deleteForum(Forum forum, int userId);
}
