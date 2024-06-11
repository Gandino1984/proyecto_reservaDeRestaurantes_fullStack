-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Bookitdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Bookitdb` ;

-- -----------------------------------------------------
-- Schema Bookitdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Bookitdb` ;
USE `Bookitdb` ;

-- -----------------------------------------------------
-- Table `Bookitdb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookitdb`.`User` (
  `User_id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Is_Admin` TINYINT NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Is_Client` TINYINT NOT NULL,
  PRIMARY KEY (`User_id`),
  UNIQUE INDEX `User_id_UNIQUE` (`User_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bookitdb`.`Restaurante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookitdb`.`Restaurante` (
  `Restaurante_id` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Horario` VARCHAR(45) NOT NULL,
  `User_id` INT NOT NULL,
  PRIMARY KEY (`Restaurante_id`),
  INDEX `fk_Restaurante_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_Restaurante_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `Bookitdb`.`User` (`User_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bookitdb`.`Mesas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookitdb`.`Mesas` (
  `Mesa_Id` INT NOT NULL,
  `Restaurante_id` INT NOT NULL,
  `Sillas` VARCHAR(45) NULL,
  PRIMARY KEY (`Mesa_Id`),
  INDEX `fk_Mesas_Restaurante1_idx` (`Restaurante_id` ASC) VISIBLE,
  CONSTRAINT `fk_Mesas_Restaurante1`
    FOREIGN KEY (`Restaurante_id`)
    REFERENCES `Bookitdb`.`Restaurante` (`Restaurante_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bookitdb`.`Reservas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookitdb`.`Reservas` (
  `Reservas_id` INT NOT NULL AUTO_INCREMENT,
  `User_id` INT NOT NULL,
  `Date` DATE NOT NULL,
  `Hora_Inicio` TIME NULL,
  `Hora_Final` TIME NULL,
  `Is_Accepted` VARCHAR(45) NULL,
  `Mesa_Id` INT NOT NULL,
  PRIMARY KEY (`Reservas_id`),
  INDEX `fk_Pedidos_User_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Reservas_Mesas1_idx` (`Mesa_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Pedidos_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `Bookitdb`.`User` (`User_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reservas_Mesas1`
    FOREIGN KEY (`Mesa_Id`)
    REFERENCES `Bookitdb`.`Mesas` (`Mesa_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;