package com.tcs.miniproject.FilmForum.DAO.interfaces;

import com.tcs.miniproject.FilmForum.entities.User;

import java.util.List;

public interface IUserDAO {
    public List<User> listAll();
    public User findById(int id);
    public User findByName(String name);
    public User save(User user);
    public void deleteById(int id);
}
