package com.tcs.miniproject.FilmForum.DAO.implementations;

import com.tcs.miniproject.FilmForum.DAO.interfaces.IFilmDAO;
import com.tcs.miniproject.FilmForum.entities.Film;
import com.tcs.miniproject.FilmForum.entities.Forum;
import com.tcs.miniproject.FilmForum.entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FilmDAO implements IFilmDAO {

    private EntityManager entityManager;

    @Autowired
    public FilmDAO(EntityManager entityManager){
        this.entityManager = entityManager;
    }
    @Override
    public List<Film> listAll() {
        TypedQuery<Film> theQuery = entityManager.createQuery("from Film", Film.class);

        return theQuery.getResultList();
    }

    @Override
    public Film findById(int id) {
        return entityManager.find(Film.class, id);
    }

    @Override
    public Film findByTitle(String title) {
        return entityManager.createQuery("SELECT f from Film f where f.title = :title", Film.class)
                .setParameter("title", title).getSingleResult();
    }

    @Override
    public Film save(Film film) {
        return entityManager.merge(film);
    }

    @Override
    public void deleteById(int id) {
        Film film = entityManager.find(Film.class, id);
        entityManager.remove(film);
    }
}
