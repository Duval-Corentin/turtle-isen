const SVG = require('svg.js');

class SVGgenerator{ 
	constructor(DOM_element, width, height, code, compilation_type, delay, turtle_display){
		this.instructions = code;
		this.draw = SVG(DOM_element).size(width, height);
        this.animation = 0;
        this.width = width;
        this.height = height;
	}

	//Génère l'image SVG
	generateImage(){
		this.generateCode();
	}

	//Génère le code de l'image SVG
	generateCode(){
		this.background = this.draw.rect(this.width, this.height).fill('#FFFFFF');
		this.instructions.forEach( i => {
			if(i.command == 'BACKGROUND_COLOR') this.generateBackground(i, this.background);
			if(i.command == 'DRAW') 			this.generateDraw(i);
			if(i.command == 'RECTANGLE') 		this.generateRectangle(i);
			if(i.command == 'ELLIPSE') 			this.generateEllipse(i);
			if(i.command == 'CIRCLE') 			this.generateCircle(i);
		});
	}

	generateBackground(i, background){
		if(this.animation) background.animate().fill(i.color)
		else background.fill(i.color);
	}

	//Génère le code des lignes
	generateDraw(i){
		this.line = this.draw.line(i.from.x, i.from.y, i.to.x, i.to.y);
		if(i.options){
			if(i.options.color) this.line.stroke({ color: i.options.color });
			if(i.options.width) this.line.stroke({ width: i.options.width });
			if(i.options.rounded){
				if(i.options.rounded == 0) this.line.stroke({ linecap: 'square' });
				if(i.options.rounded == 1) this.line.stroke({ linecap: 'round' });

			}
		}
	}

	//Génère le code des rectangles
	generateRectangle(i){
		if(this.animation){
			this.rect = this.draw.rect(i.width, i.height).move(i.pos.x - i.width/2, i.pos.y - i.height/2).animate().transform({ rotation: i.angle }).fill('none');
		}else{
			this.rect = this.draw.rect(i.width, i.height).move(i.pos.x - i.width/2, i.pos.y - i.height/2).transform({ rotation: i.angle }).fill('none');
		}
		
		if(i.options){
			if(i.options.fill == 1)
				if(i.options.color) this.rect.fill(i.options.color);
			if(i.options.width) this.rect.stroke({ width: i.options.width});
			if(i.options.rounded){
				if(i.options.rounded == 0) this.rect.radius(0);
				if(i.options.rounded == 1) this.rect.radius(10);
			}
		}
	}

	//Génère le code des ellipses
	generateEllipse(i){
		this.ellipse = this.draw.ellipse(0,0);
		this.ellipse.radius(i.radius_x, i.radius_y).move(i.pos.x - i.radius_x, i.pos.y - i.radius_y).transform({ rotation: i.angle }).fill('none');
		if(i.options){
			if(i.options.fill == 1)
				if(i.options.color) this.ellipse.fill(i.options.color);
			if(i.options.width) this.ellipse.stroke({ width: i.options.width});
		}
	}

	//Génère le code des cercles
	generateCircle(i){
		this.circ = this.draw.circle(2 * i.radius).move(i.pos.x - i.radius, i.pos.y - i.radius).fill('none');
		if(i.options){
			if(i.options.fill == 1)
				if(i.options.color) this.circ.fill(i.options.color);
			if(i.options.width) this.circ.stroke({ width: i.options.width});
		}
	}
	clear(){
		this.draw.size(0, 0);
	}
};

export default {
    install: Vue => {
        Vue.prototype.$SVGgenerator = SVGgenerator;
    }
}