let virus;
var cnv;
const viruses = [];

function preload() {
    virus = loadImage('virus.png');
}

/*function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    const virusesLength = Math.floor(window.innerWidth / 10);
    for (let i = 0; i < virusesLength; i++) {
        viruses.push(new Virus());
        
    }
  }*/
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y+75);
}

function setup() {
  cnv = createCanvas(window.innerWidth, (window.innerHeight/1.1)-75);
  centerCanvas();
  const virusesLength = Math.floor(window.innerWidth / 12);
    for (let i = 0; i < virusesLength; i++) {
        viruses.push(new Virus());
}
}

function windowResized() {
  centerCanvas();
}

function mousePressed() {
    for (let i = viruses.length - 1; i >= 0; i--) {
      if (viruses[i].spliceViruses(mouseX, mouseY)) {
        viruses.splice(i, 1);
      }
    }
  }

function draw() {
    background(55, 101, 144);
    viruses.forEach((v, index) => {
        v.update();
        v.draw_virus();
        v.checkViruses(viruses.slice(index));
    });

    //Restarting the game
    if(viruses.length==0){
        const virusesLength = Math.floor(window.innerWidth / 12);
        for (let i = 0; i < virusesLength; i++) {
            viruses.push(new Virus());
    }
    }
    
}

class Virus {
    constructor() {
        //Position
        this.pos = createVector(random(width), random(height));
        //Velocity
        this.vel = createVector(random(-5,5), random(-2.5,2.5));
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
        if ( this.pos.x < 0 || this.pos.x+11 > width) {
            this.vel.x*=-1;
        }
        if ( this.pos.y < 0 || this.pos.y+15 > height) {
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

    //For removing clicked virus
    spliceViruses(posx, posy) {
            let d = dist(posx-10, posy-10, this.pos.x, this.pos.y);
            if (d < 15) {
              return true;
            } else {
              return false;
            }
    }  

}