package com.tcs.miniproject.FilmForum.DAO.interfaces;

import com.tcs.miniproject.FilmForum.entities.Comment;

import java.util.List;

public interface ICommentDAO {
    public List<Comment> listAll();
    public Comment findById(int id);
    public Comment save(Comment comment);
    public void deleteById(int id);
}
