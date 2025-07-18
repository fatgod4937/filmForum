package com.tcs.miniproject.FilmForum.DAO.implementations;

import com.tcs.miniproject.FilmForum.DAO.interfaces.IForumDAO;
import com.tcs.miniproject.FilmForum.entities.Comment;
import com.tcs.miniproject.FilmForum.entities.Forum;
import com.tcs.miniproject.FilmForum.entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ForumDAO implements IForumDAO {
    private EntityManager entityManager;

    @Autowired
    public ForumDAO(EntityManager entityManager){
        this.entityManager=entityManager;

    }

    @Override
    public List<Forum> listAll() {
        TypedQuery<Forum> theQuery = entityManager.createQuery("SELECT f from Forum f ORDER BY f.createDate DESC", Forum.class);

        return theQuery.getResultList();
    }

    @Override
    public Forum findById(int id) {
        return entityManager.find(Forum.class, id);
    }

    @Override
    public Forum findByTitle(String title) {
        List<Forum> forums =  entityManager.createQuery("SELECT f from Forum f where f.title = :title", Forum.class)
                .setParameter("title", title).getResultList();
        if(forums.isEmpty())
            return null;
        return forums.getFirst();
    }

    @Override
    public Forum save(Forum forum) {
        return entityManager.merge(forum);
    }

    @Override
    public void deleteById(int id) {
        Forum forum = entityManager.find(Forum.class, id);
        entityManager.remove(forum);

    }

    @Override
    public List<Forum> findAllByFilmId(int id) {
        TypedQuery<Forum> theQuery = entityManager.createQuery("SELECT f FROM Forum f WHERE f.film.id = :filmId", Forum.class)
                .setParameter("filmId", id);
        return theQuery.getResultList();
    }
}
