package com.tcs.miniproject.FilmForum.service;

import com.tcs.miniproject.FilmForum.DAO.implementations.CommentDAO;
import com.tcs.miniproject.FilmForum.DAO.implementations.FilmDAO;
import com.tcs.miniproject.FilmForum.DAO.implementations.ForumDAO;
import com.tcs.miniproject.FilmForum.DAO.interfaces.ICommentDAO;
import com.tcs.miniproject.FilmForum.DAO.interfaces.IFilmDAO;
import com.tcs.miniproject.FilmForum.DAO.interfaces.IForumDAO;
import com.tcs.miniproject.FilmForum.DAO.interfaces.IUserDAO;
import com.tcs.miniproject.FilmForum.DTO.*;
import com.tcs.miniproject.FilmForum.entities.Comment;
import com.tcs.miniproject.FilmForum.entities.Film;
import com.tcs.miniproject.FilmForum.entities.Forum;
import com.tcs.miniproject.FilmForum.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class FilmForumService implements IFilmForumService {

    private IForumDAO forumDAO;
    private IFilmDAO filmDAO;
    private ICommentDAO commentDAO;
    private IUserDAO userDAO;

    @Autowired
    public FilmForumService(IForumDAO forumDAO, IFilmDAO filmDAO, ICommentDAO commentDAO, IUserDAO userDAO) {
        this.forumDAO = forumDAO;
        this.filmDAO = filmDAO;
        this.commentDAO = commentDAO;
        this.userDAO = userDAO;
    }



    @Transactional
    @Override
    public String register(String username, String password) {
        if(userDAO.findByName(username) !=null)
            return "Username is taken";
        User user = new User(username, password);
        userDAO.save(user);
        return "Successfully registered!";
    }

    @Override
    public int login(String username, String password) {
        User user = userDAO.findByName(username);
        if(user == null)
            return -1;
        if(Objects.equals(user.getPassword(), password))
            return user.getId();
        return -1;

    }

    @Override
    public List<FilmDTO> listAllFilms() {
        return List.of();
    }

    @Override
    public List<CommentItemDTO> listAllCommentsByForumId(int id) {
        return List.of();
    }

    @Override
    public List<ForumItemDTO> listAllForumsByFilmId(int id) {
        return List.of();
    }

    @Override
    public ForumDetailDTO getForumById(int id) {
        return null;
    }

    @Override
    public String createComment(CommentCreateDTO comment) {
        return "";
    }

    @Override
    public String createForum(ForumCreateDTO forum) {
        return "";
    }

    @Override
    public String updateComment(CommentCreateDTO comment) {
        return "";
    }

    @Override
    public String updateForum(ForumCreateDTO forum) {
        return "";
    }

    @Override
    public String deleteComment(int commentId, int userId) {
        return "";
    }

    @Override
    public String deleteForum(int forumId, int userId) {
        return "";
    }


}
