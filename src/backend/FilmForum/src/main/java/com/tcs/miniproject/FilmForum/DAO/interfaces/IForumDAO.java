package com.tcs.miniproject.FilmForum.DAO.interfaces;

import com.tcs.miniproject.FilmForum.entities.Forum;

import java.util.List;

public interface IForumDAO {
    public List<Forum> listAll();
    public Forum findById(int id);
    public Forum findByTitle(String title);
    public Forum save(Forum forum);
    public void deleteById(int id);
}
