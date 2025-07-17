package com.tcs.miniproject.FilmForum.DAO.interfaces;

import com.tcs.miniproject.FilmForum.entities.Film;


import java.util.List;

public interface IFilmDAO {
    public List<Film> listAll();
    public Film findById(int id);
    public Film findByTitle(String name);
    public Film save(Film film);
    public void deleteById(int id);
}
