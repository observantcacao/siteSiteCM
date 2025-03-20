# Activité scratch Site web (Crea-lite)
projet ou je vais créer un createur de site web avec des petit carré que les utilisateurs vont pouvoir prendre et glissé afin de créer un site web (comme scratch)
il y aura aussi des autres petit carré pour faire du css comme des couleurs les flex etc...

## déroulement
des personne pourrons venir, quelqu'un leur explique le jeu et les élément rapidement, ils seront ensuite demandé de recréer des page simple avec l'éditeur disponible 

### fin
le site peut lui rendre un code afin qu'il puisse completer son mot croisé 

## Journal de bord
### <u>23.01.25</u> 
pour commencer j'ai fini les userStory pour me permettre de me focaliser sur mes première tâche le design du site il faut que j'ai accès à un endroit pour edit (ou l'on vas placer les pièces), un endroit qui affiche le résultat des pièce posé et les pièce elle même pour cela je me suis inspiré de scratch directement, en plaçant les pièces tout a gauche de l'écran ensuite l'éditeur et tout a droite il y a la visualisation des éléments placé, au final il ressemblera a [cela](https://www.figma.com/board/3SdVKQSNF73kZjlfRFt0TI/Crea-lite-maquette?node-id=0-1&t=6mvrIqvB06JyFfUH-1) (sans les bord rond),

je suis ensuite partie chercher de quoi faire mes pièce, j'était partie de base pour des pièce de puzzle mais cela me semble plutot moche ensuite je me suis dit que des petites brique avec des logo dedans pourrais aider, pour l'instant je me base sur des div avec un logo a la fin avec du texte dedans je pense que cela reste simple mais pour l'instant je me base dessus.

j'ai donc biens fini mon visuel et commencer a fait les éléments que l'on pourra placer, la prochaine fois si je peux je souhaiterais deja commencer a réfléchir au système des pièces meme si je pense deja avoir une petite idée en tête. j'ai d'ailleur trouver quelque source pour apprend a déplacer les éléments que j'ai poser en html, les voicies :
- [Drag & Drop with Javascript in 4 minutes](https://www.youtube.com/watch?v=ymDjvycjgUM)
- [How to Create Drag & Drop Using HTML CSS And JavaScript...](https://www.youtube.com/watch?v=4AHot187Lj0)
- [W3S How to Create a Draggable HTML Element](https://www.w3schools.com/howto/howto_js_draggable.asp)

pour les trouver je suis allé sur [click and drag piece js html](https://www.google.com/search?q=click+and+drag+piece+js+html&sca_esv=25faab50f0835e7e&rlz=1C1GCEA_enCH1124CH1124&ei=xveRZ6r2HvLZ7_UP2aCUoAk&ved=0ahUKEwiq8YLYsIuLAxXy7LsIHVkQBZQQ4dUDCBE&uact=5&oq=click+and+drag+piece+js+html&gs_lp=Egxnd3Mtd2l6LXNlcnAiHGNsaWNrIGFuZCBkcmFnIHBpZWNlIGpzIGh0bWwyBRAhGKABMgUQIRigATIFECEYnwUyBRAhGJ8FSLQNUO4BWOALcAF4AJABAJgBZqABswWqAQM2LjK4AQPIAQD4AQGYAgmgAscFwgIJEAAYsAMYCBgewgILEAAYgAQYsAMYogTCAgYQABgWGB7CAggQABiABBiiBMICCBAAGBYYChgemAMAiAYBkAYDkgcDNy4yoAeuHQ&sclient=gws-wiz-serp)

---
### <u>30.01.25</u> 
j'ai repris les liens que j'ai récuperer la dernière fois et je les ai regarder j'ai aussi ajouté certaine tâche afin de casser certaine grande tâche en plus petites, certains n'était pas très utile car je voulais savoir comment déplacé librement les éléments je suis donc partie sur le site de W3School. jai reussi a faire en sorte que la pièce ce déplace quand on la prend avec la souris et qu'elle disparraise quand on la glisse a gauche (la partie grise d'ou elle viens),
#### problème !
jai eu une erreur quand on glisse un élément a droite jai voulu qu'il ce remette dans la zone de travail du centre mais le tout premier element ce bug et n'est plus accesible

---
### <u>06.02.25</u>
absent

---
### <u>13.02.25</u>
j'ai essaié de résoudre le bug de la dernière fois de tous les moyen possible je me retrouve donc avec un code modifié et tripouillé par chat meme si j'ai garder l'original je vais me garder ce bug pour plus tard, je pense que le problème proviens du fais que pour je ne sais pas quel raison si l'élément de droite est posé a droite il ne garde pas ses evenement. C'est en tout cas ce que j'ai remarquer, j'éspère pouvoir fix ce bug. Jai aussi commencé a faire le fais que l'élément que l'on dépose s'affiche.

--- 
### <u>20.02.25</u>
#### problème
j'ai commencer la journée avec une erreur ? dès que je déposais une pièce au centre elle perdait son "dragable" éléments du coup jai du retourner sur une ancienne version afin de pouvoir réparer tout ca. j'ai enlever le fais que la pièce revienne  

quand on dépose les pièces au milieux elle ce décale vers la droite.  
#### solution
jai tout simplement décidé d'enlever la possibilité de faire déplacé la pièces de la droite vers le milieux et fait en sorte qu'elle ce supprime simplement.

j'ai aussi ajouté le fais qu'on vois le texte de la pièces que l'on veut a droite et la ensuite le fais que cela pose le bonne éléments tel qu'un input ou autres...  je compte aussi réfléchir a comment faire la partie css possible car a part quelque idée je n'en sais pas grand choses.  afin que le code sois plus compréhensible j'ai retirer le code mort que je gardais au cas ou, et je l'ai stocké sur mon ordinateur

--- 
### <u>06.03.25</u>
reprise après la semaine de vacances je commence par devoir réparé le bug de la dernière fois ou la pièces ce décale sur la droite, pour le faire j'ai changé sa position de absolute a fixed est cela a tout réglé car la pièces était affecté par le css et plus maintenant.  
j'ai mis le fais que les pièces n'affiche plus juste du texte mais leur élément propre (par rapport au nom)

---
### <u>13.03.25</u>
ski

---
### <u>20.03.25</u>
je commence la journée avec mon disque qui ne marche pas, pas très motivant mais après avoir remis quelque nécéssité je me suis remis au travail, 
en début de journée j'avais un problème ou les pièces que je glissais vers le bas disparraissais dès que je les lachais, j'ai regler le soucis tout simplement en changeant cette ligne :
> ```
> else if (elemRect.bottom < 0 || elemRect.top > event.clientY) {
>       ...
>}

par c'elle la 

> ```
> else if (elemRect.bottom < 0 || elemRect.top > window.innerHeight) {
>       ...
>}

cela a tout réparé.  
après ce debugage dès le matin je me suis lancer dans des petites animations a mettre pour le déplacement des pièces, l'ordinateur sur lequel je suis est devenu vraiment lent pour je ne sais quel raison et j'ai du redémarrer mon ordinateur plusieurs fois, meme pendant que j'écrivais ce texte je vais donc me contenter de ce que j'ai fais aujourd'hui et essayer de progresser doucement