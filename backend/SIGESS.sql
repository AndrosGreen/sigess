-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema SIGESS
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `SIGESS` ;

-- -----------------------------------------------------
-- Schema SIGESS
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SIGESS` DEFAULT CHARACTER SET utf8 ;
USE `SIGESS` ;

-- -----------------------------------------------------
-- Table `SIGESS`.`Alumnos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SIGESS`.`Alumnos` ;

CREATE TABLE IF NOT EXISTS `SIGESS`.`Alumnos` (
  `noControl` CHAR(9) NOT NULL,
  `nombre` VARCHAR(40) NOT NULL,
  `apPaterno` VARCHAR(40) NOT NULL,
  `apMaterno` VARCHAR(40) NOT NULL,
  `correo` VARCHAR(60) NOT NULL,
  `clave` CHAR(32) NOT NULL,
  `telefono` CHAR(10) NULL,
  `carrera` VARCHAR(30) NOT NULL,
  `programa` VARCHAR(40) NOT NULL,
  `encargado` VARCHAR(120) NOT NULL,
  `institucion` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`noControl`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SIGESS`.`Asignaciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SIGESS`.`Asignaciones` ;

CREATE TABLE IF NOT EXISTS `SIGESS`.`Asignaciones` (
  `idAsignacion` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `inicioRecibos` DATE NOT NULL,
  `finRecibos` DATE NOT NULL,
  PRIMARY KEY (`idAsignacion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SIGESS`.`AsignacionesAlumnos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SIGESS`.`AsignacionesAlumnos` ;

CREATE TABLE IF NOT EXISTS `SIGESS`.`AsignacionesAlumnos` (
  `estado` ENUM('P', 'A', 'R') NOT NULL,
  `nota` VARCHAR(255) NULL,
  `idAsignacion` INT NOT NULL,
  `noControl` CHAR(9) NOT NULL,
  PRIMARY KEY (`idAsignacion`, `noControl`),
  INDEX `fk_AsignacionesAlumnos_Asignaciones1_idx` (`idAsignacion` ASC) VISIBLE,
  INDEX `fk_AsignacionesAlumnos_Alumnos1_idx` (`noControl` ASC) VISIBLE,
  CONSTRAINT `fk_AsignacionesAlumnos_Asignaciones1`
    FOREIGN KEY (`idAsignacion`)
    REFERENCES `SIGESS`.`Asignaciones` (`idAsignacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_AsignacionesAlumnos_Alumnos1`
    FOREIGN KEY (`noControl`)
    REFERENCES `SIGESS`.`Alumnos` (`noControl`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SIGESS`.`Admins`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SIGESS`.`Admins` ;

CREATE TABLE IF NOT EXISTS `SIGESS`.`Admins` (
  `idAdmin` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(120) NOT NULL,
  `area` VARCHAR(30) NOT NULL,
  `correo` VARCHAR(60) NOT NULL,
  `clave` CHAR(32) NOT NULL,
  `esRevisor` ENUM('T', 'F') NOT NULL,
  PRIMARY KEY (`idAdmin`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SIGESS`.`Requisitos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SIGESS`.`Requisitos` ;

CREATE TABLE IF NOT EXISTS `SIGESS`.`Requisitos` (
  `idRequisito` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  `revisadoPor` INT NOT NULL,
  `detalleARevisar` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idRequisito`, `revisadoPor`),
  INDEX `fk_REQUISITOS_ADMINS1_idx` (`revisadoPor` ASC) VISIBLE,
  CONSTRAINT `fk_REQUISITOS_ADMINS1`
    FOREIGN KEY (`revisadoPor`)
    REFERENCES `SIGESS`.`Admins` (`idAdmin`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `SIGESS`.`AlumnosRequisitos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SIGESS`.`AlumnosRequisitos` ;

CREATE TABLE IF NOT EXISTS `SIGESS`.`AlumnosRequisitos` (
  `noControl` CHAR(9) NOT NULL,
  `idRequisito` INT NOT NULL,
  `cumple` ENUM('P', 'A', 'R') NOT NULL,
  PRIMARY KEY (`noControl`, `idRequisito`),
  INDEX `fk_ALUMNOS_has_REQUISITOS_REQUISITOS1_idx` (`idRequisito` ASC) VISIBLE,
  INDEX `fk_ALUMNOS_has_REQUISITOS_ALUMNOS1_idx` (`noControl` ASC) VISIBLE,
  CONSTRAINT `fk_ALUMNOS_has_REQUISITOS_ALUMNOS1`
    FOREIGN KEY (`noControl`)
    REFERENCES `SIGESS`.`Alumnos` (`noControl`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ALUMNOS_has_REQUISITOS_REQUISITOS1`
    FOREIGN KEY (`idRequisito`)
    REFERENCES `SIGESS`.`Requisitos` (`idRequisito`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SIGESS`.`AlumnosPreRegistro`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SIGESS`.`AlumnosPreRegistro` ;

CREATE TABLE IF NOT EXISTS `SIGESS`.`AlumnosPreRegistro` (
  `noControl` CHAR(9) NOT NULL,
  `clave` CHAR(32) NOT NULL,
  PRIMARY KEY (`noControl`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SIGESS`.`DocumentosAlumnos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SIGESS`.`DocumentosAlumnos` ;

CREATE TABLE IF NOT EXISTS `SIGESS`.`DocumentosAlumnos` (
  `nombre` VARCHAR(50) NOT NULL,
  `documento` LONGTEXT NULL,
  `idDocumentoAlumno` INT NOT NULL AUTO_INCREMENT,
  `idAsignacion` INT NOT NULL,
  `noControl` CHAR(9) NOT NULL,
  PRIMARY KEY (`idDocumentoAlumno`, `idAsignacion`, `noControl`),
  INDEX `fk_DocumentosAlumnos_AsignacionesAlumnos1_idx` (`idAsignacion` ASC, `noControl` ASC) VISIBLE,
  CONSTRAINT `fk_DocumentosAlumnos_AsignacionesAlumnos1`
    FOREIGN KEY (`idAsignacion` , `noControl`)
    REFERENCES `SIGESS`.`AsignacionesAlumnos` (`idAsignacion` , `noControl`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SIGESS`.`DocumentosAdmin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SIGESS`.`DocumentosAdmin` ;

CREATE TABLE IF NOT EXISTS `SIGESS`.`DocumentosAdmin` (
  `nombre` VARCHAR(50) NOT NULL,
  `documento` LONGTEXT NOT NULL,
  `idDocumentoAdmin` INT NOT NULL AUTO_INCREMENT,
  `idAsignacion` INT NOT NULL,
  PRIMARY KEY (`idDocumentoAdmin`, `idAsignacion`),
  INDEX `fk_DocumentosAdmin_Asignaciones1_idx` (`idAsignacion` ASC) VISIBLE,
  CONSTRAINT `fk_DocumentosAdmin_Asignaciones1`
    FOREIGN KEY (`idAsignacion`)
    REFERENCES `SIGESS`.`Asignaciones` (`idAsignacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- begin attached script 'script'
insert into Alumnos values
('S18120183', 'Daniel', 'Cerna', 'Torres', 'cernadaniel32@gmail.com', MD5('KKCK'), '4451091780', 'Sistemas computacionales', 'Training dojo', 'Luis German Gutierrez Torres', 'ITSUR');
insert into Admins values
(1, 'Jorge', 'Admin', 'pidielpez@gmail.com', md5('JuasJuas'), 'F'),
(2,'GEMA','Idiomas','gema@gmail.com','bf012e2220ad9dbb07740f2519057746','T');
insert into AlumnosPreRegistro values
('S18120160', md5('MAMR'));

INSERT INTO `requisitos` VALUES (1,'Ingles',2,'Acreditado nivel 5');
INSERT INTO `alumnosrequisitos` VALUES ('S18120183', 1, 'P');
create table documentosPrueba(
	id int primary key auto_increment,
    nombre varchar(60),
    archivo longtext
);
-- end attached script 'script'
