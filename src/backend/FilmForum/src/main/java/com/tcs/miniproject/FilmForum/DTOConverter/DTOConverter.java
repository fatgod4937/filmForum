package com.tcs.miniproject.FilmForum.DTOConverter;

import com.tcs.miniproject.FilmForum.DTO.*;
import com.tcs.miniproject.FilmForum.entities.Comment;
import com.tcs.miniproject.FilmForum.entities.Film;
import com.tcs.miniproject.FilmForum.entities.Forum;
import com.tcs.miniproject.FilmForum.entities.User;

import java.time.Instant;
import java.util.List;

public class DTOConverter {
    //CommentCreateDTO to Comment
    public static Comment convertFromDTO(CommentCreateDTO dto, User user, Forum forum){
        Comment comment =  new Comment(dto.comment(), Instant.now(), Instant.EPOCH);
        comment.setUser(user);
        comment.setForum(forum);
        return comment;
    }
    public static Comment convertFromDTO(CommentCreateDTO dto, Comment comment){
        comment.setUpdateDate(Instant.now());
        comment.setComment(dto.comment());
        return comment;
    }

    //Comment to CommentItemDTO
    public static CommentItemDTO convertToDTO(Comment comment){
        return new CommentItemDTO(comment.getUser().getUsername(), comment.getComment(), comment.getCreateDate());
    }

    //Film to FilmDTO
    public static FilmDTO convertToDTO(Film film){
        return new FilmDTO(film.getTitle(), film.getGenre(), film.getReleaseDate());
    }

    //ForumCreateDTO to Forum
    public static Forum convertFromDTO(ForumCreateDTO dto, User user, Film film){
        Forum forum = new Forum(dto.title(), Instant.now(), Instant.EPOCH, dto.description());
        forum.setFilm(film);
        forum.setUser(user);
        return forum;
    }

    public static Forum convertFromDTO(ForumCreateDTO dto, Forum forum){
        forum.setUpdateDate(Instant.now());
        forum.setTitle(dto.title());
        forum.setDescription(dto.description());
        return forum;
    }

    //Forum to ForumDetailDTO
    public static ForumDetailDTO convertToDTO(Forum forum){
        return new ForumDetailDTO(forum.getTitle(),forum.getUser().getUsername(),forum.getDescription());
    }

    //Forum to ForumItemDTO
    public static ForumItemDTO convertToForumItemDTO(Forum forum){
        return new ForumItemDTO(forum.getTitle(), forum.getUser().getUsername(), forum.getCreateDate());
    }










}
