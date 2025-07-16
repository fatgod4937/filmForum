CREATE TABLE `filmForumDB`.`forums` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `create_date` DATE NOT NULL,
  `update_date` DATE NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `film_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `film_id_idx` (`film_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `film_id`
    FOREIGN KEY (`film_id`)
    REFERENCES `filmForumDB`.`films` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `filmForumDB`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

