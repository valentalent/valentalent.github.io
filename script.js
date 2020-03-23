let virus;
const viruses = [];

function preload() {
    virus = loadImage('virus.png');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    const virusesLength = Math.floor(window.innerWidth / 10);
    for (let i = 0; i < virusesLength; i++) {
        viruses.push(new Virus());
        
    }
  }

function draw() {
    background(55, 100, 144);
    viruses.forEach((v, index) => {
        v.update();
        v.draw_virus();
        v.checkViruses(viruses.slice(index))
    });
    
}

class Virus {
    constructor() {
        //Position
        this.pos = createVector(random(width), random(height));
        //Velocity
        this.vel = createVector(random(-8,8), random(-3,3));
        //Size
        this.size = 10;
    }

    // Update movement by adding velocity
    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    // Draw a virus
    draw_virus () {
        //tint(0, 153, 204, 126);
        image(virus, this.pos.x, this.pos.y, 25, 25);
    }

    //Detect edges
    edges() {
        if ( this.pos.x < 0 || this.pos.x > width) {
            this.vel.x*=-1;
        }
        if ( this.pos.y < 0 || this.pos.y > height) {
            this.vel.y*=-1;
        }
    }

    // Connecting viruses
    checkViruses(viruses) {
        viruses.forEach(virus => {
            const d = dist(this.pos.x, this.pos.y, virus.pos.x, virus.pos.y);
            
            if(d<120) {
                stroke('rgba(255, 255, 255, 0.1)');
                line(this.pos.x + 10, this.pos.y + 10, virus.pos.x +10, virus.pos.y + 10);
            }
        });
    }

}