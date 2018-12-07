const SVG = require('svg.js');

Array.prototype.next = function() {
    return this[++this.current];
};
Array.prototype.prev = function() {
    return this[--this.current];
};
Array.prototype.current = 0;

class SVGgenerator{ 
	constructor(DOM_element, width, height, code, compilation_type, delay, turtle_display){
		this.instructions = code;
		this.draw = SVG(DOM_element).size(width, height);
        if(compilation_type == 'Statique') this.animation = 0;
        if(compilation_type == 'Animé') this.animation = 1;
        this.width = width;
        this.height = height;
        this.turtleWidth = width * 0.05;
        this.turtleHeight = height * 0.05;
        this.delay = delay;
        this.turtle_display = turtle_display;
        this.array = [];
        this.angle = 0;
	}

	//Génère l'image SVG
	generateImage(){
		this.generateCode();
	}

	//Génère le code de l'image SVG
	generateCode(){
		//Initialisation d'un rectangle qui servira de fond d'écran
		this.background = this.draw.rect(this.width, this.height).fill('#FFF1E2');

		//Choix de l'icône de la tortue
		//if(this.turtle_display && this.animation == 1) this.turtle = this.draw.image('https://png2.kisspng.com/sh/9abc6a8ac9fac73c5026d623ead60bd2/L0KzQYm3WME1N5JBjpH0aYP2gLBuTgNmaV55jeR9bHWwgrb3lPltbV5ohNt5LXH1hH7rkvF4cZ9sRaMDYnXkhcXwhwVtNaRqeZ99dYL3fLa0gBxqeF5miuY2Y3zsgH7okwR0NZJyiJ8AYke1dIWAhfQ2bZQ7UJCENEW3Q4mCV8E2O2U3TaQ6NUi7R4e5TwBvbz==/kisspng-sea-turtle-reptile-clip-art-drawing-18beautiful-sea-turtle-clip-art-clip-arts-amp-5b72d47ed5ec68.9454389715342521588762.png').size(this.turtleWidth,this.turtleHeight).center(0,0);
		if(this.turtle_display && this.animation == 1) this.turtle = this.draw.image('https://svgsilh.com/svg/1646214.svg').size(this.turtleWidth,this.turtleHeight).center(0,0);

		this.instructions.forEach( i => { this.array.push(i); });

		if(this.array[0].command == 'BACKGROUND_COLOR') this.generateBackground(this.turtle, this.background, this.array, 0);
		if(this.array[0].command == 'DRAW') 			this.generateDraw(this.turtle, this.background, this.array, 0);
		if(this.array[0].command == 'RECTANGLE') 		this.generateRectangle(this.turtle, this.background, this.array, 0);
		if(this.array[0].command == 'ELLIPSE') 			this.generateEllipse(this.turtle, this.background, this.array, 0);
		if(this.array[0].command == 'CIRCLE') 			this.generateCircle(this.turtle, this.background, this.array, 0);
	}

	//Gère la couleur de fond
	generateBackground(turtle, background, queue, index){
		var current = queue[index];
		background.animate(1000, '-', this.delay).fill(current.color).after( () => {
						if(queue[++index] != undefined) {
							if(queue[index].command == 'BACKGROUND_COLOR') 	this.generateBackground(turtle, background, queue, index);
							if(queue[index].command == 'DRAW') 				this.generateDraw(turtle, background, queue, index);
							if(queue[index].command == 'RECTANGLE') 		this.generateRectangle(turtle, background, queue, index);
							if(queue[index].command == 'ELLIPSE') 			this.generateEllipse(turtle, background, queue, index);
							if(queue[index].command == 'CIRCLE') 			this.generateCircle(turtle, background, queue, index);
						}
					});

		//Rend l'animation statique si elle n'est pas demandée
		if(!this.animation) background.finish();
	}

	//Génère le code des lignes
	generateDraw(turtle, background, queue, index){
		var current = queue[index];
		var next;

		//Définition des variables utiles à la position et la rotation de la tortue
		this.angle = Math.atan(Math.abs((current.to.y - current.from.y))/Math.abs((current.to.x - current.from.x))) * 360/(2 * Math.PI);
		this.distance = Math.sqrt((current.to.x - current.from.x)*(current.to.x - current.from.x) + (current.to.y - current.from.y)*(current.to.y - current.from.y));
		console.log(this.angle);
		console.log(current.angle);

		//On rentre dans le IF seulement si la tortue est affichée et que l'animation est demandée
		if(this.turtle_display && this.animation == 1) {

			next = turtle.center(current.from.x, current.from.y)
				.animate(1000, '-', this.delay).rotate(this.angle)		//Positionnement dans le bon angle
				.animate(1000, '-', this.delay).dmove(this.distance, 0) //Le repère tourne avec la tortue, il ne faut donc pas modifier les coord en y
				.during( () => { 
					//Création et animation de la ligne pendant que la tortue suit son chemin
					this.line = this.draw.line(current.from.x, current.from.y, current.from.x, current.from.y).stroke({ color: current.options.color, width: current.options.width})
									.animate(1000, '-', this.delay).plot(current.from.x, current.from.y, current.to.x, current.to.y);
				});
		} else {
			//Dessine la ligne sans se soucier de la tortue
			this.line = this.draw.line(current.from.x, current.from.y, current.from.x, current.from.y).stroke({ color: current.options.color, width: current.options.width});
			if(current.options.rounded == 0) { this.line.stroke({ linecap: 'square' }) } else this.line.stroke({ linecap: 'round' });
			next = this.line.animate(1000, '-', this.delay).plot(current.from.x, current.from.y, current.to.x, current.to.y);
		}

		next.after( () => {
			if(queue[++index] != undefined) {
				if(queue[index].command == 'BACKGROUND_COLOR') 	this.generateBackground(turtle, background, queue, index);
				if(queue[index].command == 'DRAW') 				this.generateDraw(turtle, background, queue, index);
				if(queue[index].command == 'RECTANGLE') 		this.generateRectangle(turtle, background, queue, index);
				if(queue[index].command == 'ELLIPSE') 			this.generateEllipse(turtle, background, queue, index);
				if(queue[index].command == 'CIRCLE') 			this.generateCircle(turtle, background, queue, index);
			}
		});

		//Rend l'animation statique si elle n'est pas demandée
		if(!this.animation) this.line.finish();
	}

	//Génère le code des rectangles
	generateRectangle(turtle, background, queue, index){
		var current = queue[index];
		var next;

		//Crée un rectangle avec les bonnes propriétés
		this.rect = this.draw.rect(0,0).center(current.pos.x, current.pos.y).stroke({ width: current.options.width});
		if(current.options.fill == 0)    { this.rect.fill('none') } else this.rect.fill(current.options.color);
		if(current.options.rounded == 0) { this.rect.radius(0)	} else this.rect.radius(10);

		//Anime le rectangle
		next = this.rect.animate(1000, '-', this.delay)
						.center(current.pos.x, current.pos.y)
						//.rotate(this.angle + current.angle, current.pos.x, current.pos.y)
						.attr({ width: current.width, height:current.height });

		next.after( () => {
			if(queue[++index] != undefined) {
				if(queue[index].command == 'BACKGROUND_COLOR') 	this.generateBackground(turtle, background, queue, index);
				if(queue[index].command == 'DRAW') 				this.generateDraw(turtle, background, queue, index);
				if(queue[index].command == 'RECTANGLE') 		this.generateRectangle(turtle, background, queue, index);
				if(queue[index].command == 'ELLIPSE') 			this.generateEllipse(turtle, background, queue, index);
				if(queue[index].command == 'CIRCLE') 			this.generateCircle(turtle, background, queue, index);
			}
		});

		//Rend l'animation statique si elle n'est pas demandée
		if(!this.animation) next.move(current.pos.x - current.width/2, current.pos.y - current.height/2).finish();
	}

	//Génère le code des ellipses
	generateEllipse(turtle, background, queue, index){
		var current = queue[index];
		var next;

		this.angle += current.angle;

		//Rentre dans le IF seulement si une animation est demandée et que l'angle est égal à 0
		if(this.animation == 1 && this.angle == 0) {
			//Création de l'instance ellipse qui n'est pas une ellipse mais un chemin de points
			this.ellipse = this.draw.path().attr({ stroke:'none', fill:'none' });
			//Création de l'instance ellipsePolyline qui servira à afficher les points composants l'ellipse
			this.ellipsePolyline = this.draw.polyline().stroke({ width: current.options.width });
			if(current.options.fill == 0) { this.ellipsePolyline.fill('none') } else this.ellipsePolyline.fill(current.options.color);
			
			//Création du chemin de l'ellipse
			var carac = ["M",current.pos.x,current.pos.y,
						"m",-current.radius_x,0,
						"a",current.radius_x,current.radius_y,
						0,1,0,2*current.radius_x, 0,
						"a",current.radius_x,current.radius_y,
						0,1,0,-2*current.radius_x, 0];
		    this.ellipse.attr({d:carac.join(" ")});

			var pathLength = this.ellipse.node.getTotalLength();
			var PrePnt = this.ellipse.node.getPointAtLength(0);

		    var pointsList = this.ellipsePolyline.node.points;
		    if(pointsList.length > 0) pointsList.removeItem(0);

		    //Création point par point de l'ellipse et déplacement de la tortue dessus
			next = this.ellipsePolyline.animate(1000, '-', this.delay).during( pos => {
			   	if(pos > 0) {
			   		//Ajout d'un nouveau à l'ellipse
	                var length = pathLength*pos;
					var Pnt = this.ellipse.node.getPointAtLength(length);
	                var Pnt1 = this.draw.node.createSVGPoint()
	                Pnt1.x = Pnt.x
	                Pnt1.y = Pnt.y
	                pointsList.appendItem(Pnt1)

	                //Calcul de position et d'angle de la tortue 
	                //Et affichage
	                if(this.turtle_display && this.animation) {
			            var x0 = PrePnt.x;
			            var y0 = PrePnt.y;
			            var x1 = Pnt.x;
			            var y1 = Pnt.y;

			            var x = (x0+x1)/2;
			            var y = (y0+y1)/2;
			            turtle = turtle.center(x, y);

			            var xX = x1-x0;	
			            var yY = y0-y1;
			            var angle = Math.abs(Math.asin(yY/Math.sqrt(yY*yY+xX*xX))*180/Math.PI);
			            var MyAngle;
			            if(xX >=0 && yY >=0) MyAngle = 270 + (90-angle);
			            if(xX >=0 && yY <=0) MyAngle = angle;
			            if(xX <=0 && yY <=0) MyAngle = 90 + (90-angle);
			            if(xX <=0 && yY >=0) MyAngle = 180 + angle;

			            if(MyAngle&&pos>0) turtle = turtle.attr({transform:"rotate("+MyAngle+" "+x+" "+y+")" })
			            PrePnt = Pnt;
				    }
	            }
            })
		//Rentre dans le ELSE seulement si une animation est demandée ou non et que l'angle est différent de 0
		} else {
			//Création de l'ellipse
			this.ellipse = this.draw.ellipse(0,0).center(current.pos.x, current.pos.y).stroke({ width: current.options.width});
			if(current.options.fill == 0) { this.ellipse.fill('none') } else this.ellipse.fill(current.options.color);

			//Animation de l'ellipse
			next = this.ellipse.animate(1000, '-', this.delay).radius(current.radius_x, current.radius_y);
			
		}

		next.after( () => {
			if(queue[++index] != undefined) {
				if(queue[index].command == 'BACKGROUND_COLOR') 	this.generateBackground(turtle, background, queue, index);
				if(queue[index].command == 'DRAW') 				this.generateDraw(turtle, background, queue, index);
				if(queue[index].command == 'RECTANGLE') 		this.generateRectangle(turtle, background, queue, index);
				if(queue[index].command == 'ELLIPSE') 			this.generateEllipse(turtle, background, queue, index);
				if(queue[index].command == 'CIRCLE') 			this.generateCircle(turtle, background, queue, index);
			}
		});

		//Rend l'animation statique si elle n'est pas demandée
		if(!this.animation) next.finish();
	}

	//Génère le code des cercles
	generateCircle(turtle, background, queue, index){
		var current = queue[index];
		var next;

		//Rentre dans le IF seulement si une animation est demandée
		if(this.animation == 1) {
			//Création de l'instance circ qui n'est pas un cercle mais un chemin de points
			this.circ = this.draw.polyline().stroke({ width: current.options.width });
			if(current.options.fill == 0) { this.circ.fill('none') } else this.circ.fill(current.options.color);

			//Affichage de la tortue au début de l'animation
			if(this.turtle_display) turtle = turtle.center(current.pos.x, current.pos.y + current.radius).flip('y', current.pos.y);

			//Crée une liste de points qui serviront à tracer le cercle
		    var pointsList = this.circ.node.points
		    if(pointsList.length > 0) pointsList.removeItem(0);

		    //Animation du cercle
		    next = this.circ.animate(1000, '-', this.delay).during(pos => {
		    	//Création des coordonnées du nouveau point
	            var x = current.radius * Math.cos(Math.PI/2 + pos * 2*Math.PI) + current.pos.x;
	            var y = current.radius * Math.sin(Math.PI/2 + pos * 2*Math.PI) + current.pos.y;

	            //Rotation de la tortue autour du centre du cercle en suivant les contours
	            if(this.turtle_display) turtle = turtle.flip('y', current.pos.y).rotate(-pos*360, current.pos.x, current.pos.y);
	            //Ajout du point aux points composants le cercle
	            var Pnt1 = this.draw.node.createSVGPoint();
	            Pnt1.x = x;
	            Pnt1.y = y;
	            pointsList.appendItem(Pnt1)
	        });
		} else {
			//Création du cercle statique
			this.circ = this.draw.circle(2 * current.radius).move(current.pos.x - current.radius, current.pos.y - current.radius).stroke({width: current.options.width});
			if(current.options.fill == 0) { this.circ.fill('none') } else this.circ.fill(current.options.color);
			//Création d'une animation inutile pour pouvoir utiliser la méthode .after() en sortie du IF
			next = this.circ.animate(0, "-", 0);
		}

		next.after( () => {
			if(queue[++index] != undefined) {
				if(queue[index].command == 'BACKGROUND_COLOR') 	this.generateBackground(turtle, background, queue, index);
				if(queue[index].command == 'DRAW') 				this.generateDraw(turtle, background, queue, index);
				if(queue[index].command == 'RECTANGLE') 		this.generateRectangle(turtle, background, queue, index);
				if(queue[index].command == 'ELLIPSE') 			this.generateEllipse(turtle, background, queue, index);
				if(queue[index].command == 'CIRCLE') 			this.generateCircle(turtle, background, queue, index);
			}
		});

		//Rend l'animation statique si elle n'est pas demandée
		if(!this.animation) next.finish();
	}

	//Nettoie l'écran
	clear(){
		this.draw.size(0, 0);
	}
};

export default {
    install: Vue => {
        Vue.prototype.$SVGgenerator = SVGgenerator;
    }
}