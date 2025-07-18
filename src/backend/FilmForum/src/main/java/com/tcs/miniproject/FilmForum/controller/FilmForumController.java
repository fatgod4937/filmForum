package com.tcs.miniproject.FilmForum.controller;

import com.tcs.miniproject.FilmForum.DTO.UserDTO;
import com.tcs.miniproject.FilmForum.service.FilmForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
