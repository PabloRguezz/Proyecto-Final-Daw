SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bookme
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bookme
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookme` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema proyecto
-- -----------------------------------------------------
USE `bookme` ;

-- -----------------------------------------------------
-- Table `bookme`.`Usuario`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `bookme`.`Usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(120) NULL,
  `password` VARCHAR(254) NULL,
  `nombre` VARCHAR(120) NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookme`.`Servicios`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `bookme`.`Servicios` (
  `id_servicio` INT NOT NULL AUTO_INCREMENT,
  `precio` INT NULL,
  `nombre` VARCHAR(100) NULL,
  `descripcion` VARCHAR(254) NULL,
  PRIMARY KEY (`id_servicio`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookme`.`Calificaciones`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `bookme`.`Calificaciones` (
  `id_Calificacion` INT NOT NULL AUTO_INCREMENT,
  `nota` INT NULL,
  `fecha_subida` DATETIME NOT NULL,
  `descripcion` VARCHAR(254) NULL,
  `id_servicio` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_Calificacion`, `id_servicio`, `id_usuario`),
  INDEX `fk_Calificaciones_Servicios1_idx` (`id_servicio` ASC) VISIBLE,
  INDEX `fk_Calificaciones_Usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_Calificaciones_Servicios1`
    FOREIGN KEY (`id_servicio`)
    REFERENCES `bookme`.`Servicios` (`id_servicio`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Calificaciones_Usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bookme`.`Usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookme`.`Reserva`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `bookme`.`Reserva` (
  `id_Reserva` INT NOT NULL AUTO_INCREMENT,
  `dia_reserva` DATE NOT NULL,
  `hora_reserva` TIME NOT NULL,
  `nombre_servicio` VARCHAR(120) NULL,
  `id_servicio` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_Reserva`, `id_usuario`),
  INDEX `fk_Reserva_Servicios1_idx` (`id_servicio` ASC) VISIBLE,
  INDEX `fk_Reserva_Usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_Reserva_Servicios1`
    FOREIGN KEY (`id_servicio`)
    REFERENCES `bookme`.`Servicios` (`id_servicio`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Reserva_Usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bookme`.`Usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookme`.`Empresa`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `bookme`.`Empresa` (
  `cif_Empresa` VARCHAR(9) NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `tlf_contacto` INT NULL,
  `password` VARCHAR(254) NULL,
  `horario` VARCHAR(254) NULL,
  `ubicacion` VARCHAR(45) NULL,
  `descripcion` VARCHAR(254) NULL,
  PRIMARY KEY (`cif_Empresa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookme`.`Empresa_has_Servicios`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `bookme`.`Empresa_has_Servicios` (
  `cif_Empresa` VARCHAR(9) NOT NULL,
  `id_servicio` INT NOT NULL,
  PRIMARY KEY (`cif_Empresa`, `id_servicio`),
  INDEX `fk_Empresa_has_Servicios_Servicios1_idx` (`id_servicio` ASC) VISIBLE,
  INDEX `fk_Empresa_has_Servicios_Empresa_idx` (`cif_Empresa` ASC) VISIBLE,
  CONSTRAINT `fk_Empresa_has_Servicios_Empresa`
    FOREIGN KEY (`cif_Empresa`)
    REFERENCES `bookme`.`Empresa` (`cif_Empresa`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Empresa_has_Servicios_Servicios1`
    FOREIGN KEY (`id_servicio`)
    REFERENCES `bookme`.`Servicios` (`id_servicio`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
