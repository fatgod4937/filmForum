package com.tcs.miniproject.FilmForum.controller;

import com.tcs.miniproject.FilmForum.DTO.*;
import com.tcs.miniproject.FilmForum.service.FilmForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/film_forum")
public class FilmForumController {
    private FilmForumService filmForumService;

    @Autowired
    public FilmForumController(FilmForumService filmForumService){
        this.filmForumService = filmForumService;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody UserDTO dto){
        return filmForumService.register(dto.username(), dto.password());
    }

    @GetMapping("/login")
    public int loginUser(@RequestBody UserDTO dto){
        return filmForumService.login(dto.username(), dto.password());
    }

    @GetMapping("/films")
    public List<FilmDTO> getAllFilms(){
        return filmForumService.listAllFilms();
    }
    @GetMapping("/films/{id}")
    public FilmDTO getFilmById(@PathVariable int id){
        return filmForumService.getFilmById(id);
    }
    @GetMapping("/forum_comments/{id}")
    public List<CommentItemDTO> getCommentsByForumId(@PathVariable int id){
        return filmForumService.listAllCommentsByForumId(id);
    }
    @GetMapping("/film_forums/{id}")
    public List<ForumItemDTO> getForumsByFilmId(@PathVariable int id){
        return filmForumService.listAllForumsByFilmId(id);
    }
    @GetMapping("/forums/{id}")
    public ForumDetailDTO getForumById(@PathVariable int id){
        return filmForumService.getForumById(id);
    }

    @PostMapping("/comments")
    public String createComment(@RequestBody CommentCreateDTO dto){
        return filmForumService.createComment(dto);
    }

    @PostMapping("/forums")
    public String createForum(@RequestBody ForumCreateDTO dto){
        return filmForumService.createForum(dto);
    }

    @PutMapping("/comments")
    public String updateComment(@RequestBody CommentCreateDTO dto){
        return filmForumService.updateComment(dto);
    }

    @PutMapping("/forums")
    public String updateForum(@RequestBody ForumCreateDTO dto){
        return filmForumService.updateForum(dto);
    }
    @DeleteMapping("/comments")
    public String deleteComment(@RequestBody DeleteDTO dto){
        return filmForumService.deleteComment(dto);
    }
    @DeleteMapping("/forums")
    public String deleteForum(@RequestBody DeleteDTO dto){
        return filmForumService.deleteForum(dto);
    }




}
