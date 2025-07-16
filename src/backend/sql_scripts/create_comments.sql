CREATE TABLE `filmForumDB`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(100) NOT NULL,
  `forum_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `forum_id_idx` (`forum_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `forum_id`
    FOREIGN KEY (`forum_id`)
    REFERENCES `filmForumDB`.`forums` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_comment_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `filmForumDB`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
