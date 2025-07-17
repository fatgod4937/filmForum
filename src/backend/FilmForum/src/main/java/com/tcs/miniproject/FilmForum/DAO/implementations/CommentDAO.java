package com.tcs.miniproject.FilmForum.DAO.implementations;

import com.tcs.miniproject.FilmForum.DAO.interfaces.ICommentDAO;
import com.tcs.miniproject.FilmForum.entities.Comment;
import com.tcs.miniproject.FilmForum.entities.Film;
import com.tcs.miniproject.FilmForum.entities.Forum;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommentDAO implements ICommentDAO {

    private EntityManager entityManager;

    @Autowired
    public CommentDAO(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    public List<Comment> listAll() {
        TypedQuery<Comment> theQuery = entityManager.createQuery("SELECT c from Comment c ORDER BY c.createDate DESC", Comment.class);

        return theQuery.getResultList();
    }

    @Override
    public Comment findById(int id) {
        return entityManager.find(Comment.class, id);
    }

    @Override
    public Comment save(Comment comment) {
        return entityManager.merge(comment);
    }

    @Override
    public void deleteById(int id) {
        Comment comment = entityManager.find(Comment.class, id);
        entityManager.remove(comment);

    }

    @Override
    public List<Comment> findAllByForumId(int id){
        TypedQuery<Comment> theQuery = entityManager.createQuery("SELECT c FROM Comment c WHERE c.forum.id = :forumId", Comment.class)
                .setParameter("forumId", id);
        return theQuery.getResultList();
    }
}
