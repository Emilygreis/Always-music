-- Script para crear la base de datos y la tabla usuarios

-- Crear la base de datos
CREATE DATABASE emily_herrera_always_music_826;

-- Conectar a la base de datos creada
\c emily_herrera_always_music_826;

-- Crear la tabla usuarios
CREATE TABLE usuarios (
    nombre VARCHAR(100),
    rut VARCHAR(20),
    curso VARCHAR(100),
    nivel VARCHAR(100)
);
