package com.tcs.miniproject.FilmForum.entities;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name="comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="comment")
    private String comment;

    @Column(name="create_date")
    private Instant createDate;

    @Column(name="update_date")
    private Instant updateDate;

    @ManyToOne
    @JoinColumn(name = "forum_id")
    private Forum forum;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Comment(String comment, Instant createDate, Instant updateDate) {
        this.comment = comment;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }

    public Comment(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Instant updateDate) {
        this.updateDate = updateDate;
    }

    public Forum getForum() {
        return forum;
    }

    public void setForum(Forum forum) {
        this.forum = forum;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", comment='" + comment + '\'' +
                ", createDate=" + createDate +
                ", updateDate=" + updateDate +
                ", forum=" + forum +
                ", user=" + user +
                '}';
    }
}
