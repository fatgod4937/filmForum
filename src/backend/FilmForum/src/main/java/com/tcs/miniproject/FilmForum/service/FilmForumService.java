package com.tcs.miniproject.FilmForum.service;

import com.tcs.miniproject.FilmForum.DAO.implementations.CommentDAO;
import com.tcs.miniproject.FilmForum.DAO.implementations.FilmDAO;
import com.tcs.miniproject.FilmForum.DAO.implementations.ForumDAO;
import com.tcs.miniproject.FilmForum.DAO.interfaces.ICommentDAO;
import com.tcs.miniproject.FilmForum.DAO.interfaces.IFilmDAO;
import com.tcs.miniproject.FilmForum.DAO.interfaces.IForumDAO;
import com.tcs.miniproject.FilmForum.DAO.interfaces.IUserDAO;
import com.tcs.miniproject.FilmForum.DTO.*;
import com.tcs.miniproject.FilmForum.DTOConverter.DTOConverter;
import com.tcs.miniproject.FilmForum.entities.Comment;
import com.tcs.miniproject.FilmForum.entities.Film;
import com.tcs.miniproject.FilmForum.entities.Forum;
import com.tcs.miniproject.FilmForum.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        List<Film> films = filmDAO.listAll();
        List<FilmDTO> result = new ArrayList<>();
        for(Film film : films){
            result.add(DTOConverter.convertToDTO(film));
        }
        return result;
    }

    @Override
    public List<CommentItemDTO> listAllCommentsByForumId(int id) {
        List<Comment> comments = commentDAO.findAllByForumId(id);
        List<CommentItemDTO> result = new ArrayList<>();
        for(Comment comment : comments){
            result.add(DTOConverter.convertToDTO(comment));
        }
        return result;
    }

    @Override
    public List<ForumItemDTO> listAllForumsByFilmId(int id) {
        List<Forum> forums = forumDAO.findAllByFilmId(id);
        List<ForumItemDTO> result = new ArrayList<>();
        for(Forum forum : forums){
            result.add(DTOConverter.convertToForumItemDTO(forum));
        }
        return result;
    }


    @Override
    public ForumDetailDTO getForumById(int id) {
        return DTOConverter.convertToDTO(forumDAO.findById(id));
    }

    @Override
    public List<ForumItemDTO> listAllForums() {
        List<Forum> forums = forumDAO.listAll();
        List<ForumItemDTO> result = new ArrayList<>();
        for(Forum forum : forums){
            result.add(DTOConverter.convertToForumItemDTO(forum));
        }
        return result;
    }

    @Override
    public FilmDTO getFilmById(int id) {
        return DTOConverter.convertToDTO(filmDAO.findById(id));
    }

    @Transactional
    @Override
    public String createComment(CommentCreateDTO comment) {
        if(comment.commentId() != -1){
            return "Comment already exists, and cant be created";
        }
        Comment result =
                DTOConverter.convertFromDTO(comment, userDAO.findById(comment.userId()), forumDAO.findById(comment.forumId()));
        commentDAO.save(result);
        return "Comment successfully added";
    }

    @Transactional
    @Override
    public String createForum(ForumCreateDTO forum) {
        if(forum.forumId()!= -1){
            return "Forum already exists, and cant be created";
        }
        Forum result =
                DTOConverter.convertFromDTO(forum, userDAO.findById(forum.userId()), filmDAO.findById(forum.filmId()));
        forumDAO.save(result);
        return "Forum successfully created";
    }

    @Transactional
    @Override
    public String updateComment(CommentCreateDTO comment) {
        if(comment.commentId() == -1){
            return "Comment does not exist, hence it can not be updated";
        }
        Comment og = commentDAO.findById(comment.commentId());
        if(og.getUser().getId() != comment.userId()){
            return "User tried to edit another user's comment, hence the operation was cancelled";
        }
        Comment result =
                DTOConverter.convertFromDTO(comment, og);
        commentDAO.save(result);
        return "Comment successfully updated";
    }

    @Transactional
    @Override
    public String updateForum(ForumCreateDTO forum) {
        if(forum.forumId() == -1){
            return "Forum does not exist, hence it can not be updated";
        }
        Forum og = forumDAO.findById(forum.forumId());
        if(og.getUser().getId() != forum.userId()){
            return "User tried to edit another user's forum, hence the operation was cancelled";
        }
        Forum result = DTOConverter.convertFromDTO(forum, og);
        forumDAO.save(result);
        return "Forum successfully updated";
    }

    @Transactional
    @Override
    public String deleteComment(DeleteDTO dto) {
        Comment tempComment = commentDAO.findById(dto.deleteId());
        if(tempComment.getUser().getId() != dto.userId()){
            return "User tried to delete a comment which was not theirs, hence the operation was cancelled";
        }
        commentDAO.deleteById(dto.deleteId());
        return "Comment successfully deleted";
    }

    @Transactional
    @Override
    public String deleteForum(DeleteDTO dto) {
        Forum tempForum = forumDAO.findById(dto.deleteId());
        if(tempForum.getUser().getId() != dto.userId()){
            return "User tried to delete a forum which was not theirs, hence the operation was cancelled";
        }
        List<Comment> tempComments = commentDAO.findAllByForumId(dto.deleteId());
        for(Comment comment : tempComments){
            commentDAO.deleteById(comment.getId());
        }
        forumDAO.deleteById(dto.deleteId());
        return "Forum and all its comments were successfully deleted";
    }


}
