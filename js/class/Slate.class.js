class Slate {

    constructor(pen){

        this.position = null // {x:0,y:0}
        this.canvas = document.getElementById('canvas');    // Récupération du <canvas>
        this.context = this.canvas.getContext('2d');    
        this.isDrawing = false;
        this.pen = pen ;

         // Installation des gestionnaires d'évènements de l'ardoise.
         this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
         this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
         this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
         this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    clear() {
        // Effacement de tout le contenu de l'ardoise.
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


      // Méthode de récupération des coordonnées X,Y de la souris relative à l'ardoise
      getMouseLocation(event) {

        // Récupération des coordonnées de l'ardoise.
        const rectangle = this.canvas.getBoundingClientRect();

        // Création d'un objet contenant les coordonnées X,Y de la souris relative à l'ardoise.
        const location = {
            x: event.clientX - rectangle.left,
            y: event.clientY - rectangle.top
        };

        return location;
    }

// Gestionnaire d'évènement d'appui sur un bouton de la souris.
onMouseDown(event) {
    // On peut dessiner sur l'ardoise.
    this.isDrawing = true;

    // Enregistrement de la position actuelle de la souris.
    this.currentLocation = this.getMouseLocation(event);
}

// Gestionnaire d'évènement de sortie de l'ardoise par la souris.
onMouseLeave() {
    // On ne peut plus dessiner sur l'ardoise.
    this.isDrawing = false;
}

// Gestionnaire d'évènement de déplacement de la souris sur l'ardoise.
onMouseMove(event) {

    // Récupération de la position actuelle de la souris.
    const location = this.getMouseLocation(event);

    // Est-ce qu'on peut dessiner sur l'adoise ?
    if (this.isDrawing == true) {

        // Préparation de l'ardoise à l'exécution d'un dessin.
        this.pen.configure(this.context);


        // Début du dessin.
        this.context.beginPath();

        // Dessine un trait entre les précédentes coordonnées de la souris et les nouvelles.
        this.context.moveTo(this.currentLocation.x, this.currentLocation.y);
        this.context.lineTo(location.x, location.y);

        // Fin du dessin.
        this.context.closePath();

        // Applique les changements dans le canvas.
        this.context.stroke();


        // Enregistrement de la nouvelle position de la souris.
        this.currentLocation = location;
    }
}

// Gestionnaire d'évènement de relachement d'un bouton de la souris.
onMouseUp() {
    // On ne peut plus dessiner sur l'ardoise.
    this.isDrawing = false;
}

}