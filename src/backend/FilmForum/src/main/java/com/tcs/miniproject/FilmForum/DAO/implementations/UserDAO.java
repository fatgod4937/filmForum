package com.tcs.miniproject.FilmForum.DAO.implementations;

import com.tcs.miniproject.FilmForum.DAO.interfaces.IUserDAO;
import com.tcs.miniproject.FilmForum.entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDAO implements IUserDAO {

    private EntityManager entityManager;

    @Autowired
    public UserDAO(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    public List<User> listAll() {
        TypedQuery<User> theQuery = entityManager.createQuery("from User", User.class);

        return theQuery.getResultList();
    }

    @Override
    public User findById(int id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User findByName(String name) {
        List<User> users = entityManager.createQuery("SELECT u from User u where u.username = :name", User.class)
                .setParameter("name", name).getResultList();
        if(users.isEmpty()){
            return null;
        }
        return users.getFirst();
    }

    @Override
    public User save(User user) {
        return entityManager.merge(user);
    }

    @Override
    public void deleteById(int id) {
        User user = entityManager.find(User.class, id);
        entityManager.remove(user);
    }
}
