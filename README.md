# LeerLeer

Este es el repo de leerleer.com, que contine todo lo que hacemos para hacer reviews de libros y ponerlos en youtube.

Esta basado en Marble Seeds, puedes ver el set up basico en https://github.com/latteware/marble-seed

En que estamos trabajando:

= Crear una lista de scheduled reviews
Hacer un scaffold de siguientes reviews
Mostrar eso en una lista en el cliente
Con una forma de agendarlo 

= Crear modulo de ver que reviews ya hicimos
Hacer un scaffold de los que ya hicimos
Hacer en el cliente una lista de eso

= Crear modulo de recomendar siguientes libros
Crear un scaffold
El cliente puede crear uno nuevo, nombre del libro, author, one-liner de por que
Todos puedes votar, te dice quienes han votado
Mostrar ordenados eso en el otro lado

= Crear una forma de recibir notificaciones cuando empezemos a streamear
En tu perfil puedes elegir si quieres o no recibir notificaciones, si no, siempre tiene una barra arriba mienstras estas logeado?

= Hacer una portada donde puedas ver los top 3 de cada cosa y entrar a cada cosa.

Modelos

-> Book
author
title
amazonUrl
audibleUrl

-> ScheduledReviews
book
date

-> Review
book
link

-> Recommended
book
user
one-liner

-> RecommendedVote
Recommended
user

-> RecommendedComment
user
recommended
text
