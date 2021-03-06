let virus;
let pill;
var cnv;
let viruses = [];
let pills = [];
const virusesLength = Math.floor(window.innerWidth / 12);

function preload() {
    virus = loadImage('virus.png');
    pill = loadImage('pill.png');
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
  cnv = createCanvas(window.innerWidth, window.innerHeight/1.2);
  centerCanvas();
 
    for (let i = 0; i < virusesLength; i++) {
        viruses.push(new Virus());

    }
  const pillsLength = Math.floor(window.innerWidth / 120);
    for (let i = 0; i < pillsLength; i++) {
        pills.push(new Pill());
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

    for (let i = pills.length - 1; i >= 0; i--) {
      if (pills[i].spliceViruses(mouseX, mouseY)) {
        pills.splice(i, 1)
        for (let i = 0; i < (viruses.length/10); i++) {
            viruses.push(new Virus(createVector(mouseX,mouseY)));
        }
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

    pills.forEach((p, index) => {
        p.update();
        p.draw_virus();
    });

    //Restarting the game
    if(viruses.length==0){
        alert("Congrats!\nYou destroyed COVID-19 :)\nPress OK to restart the game..." );
        viruses= [];
        pills= [];
        const virusesLength = Math.floor(window.innerWidth / 12);
        for (let i = 0; i < virusesLength; i++) {
            viruses.push(new Virus());
    
        }
      const pillsLength = Math.floor(window.innerWidth / 120);
        for (let i = 0; i < pillsLength; i++) {
            pills.push(new Pill());
        }
    }
    if(viruses.length>virusesLength*1.75){
        alert("COVID-19 has overtaken :(\nDon't destroy the pills!\nPress OK to restart the game..." );
        viruses=[];
        pills=[];
        const virusesLength = Math.floor(window.innerWidth / 12);
        for (let i = 0; i < virusesLength; i++) {
            viruses.push(new Virus());
    
        }
      const pillsLength = Math.floor(window.innerWidth / 120);
        for (let i = 0; i < pillsLength; i++) {
            pills.push(new Pill());
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

    set position (position){
        this.pos = position;
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
        if ( this.pos.x  < 0 || this.pos.x +20 > width) {
            this.vel.x*=-1;
        }
        if ( this.pos.y  < 0 || this.pos.y +10 > height) {
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

class Pill extends Virus {
//draw pill
draw_virus () {
    //tint(0, 153, 204, 126);
    image(pill, this.pos.x, this.pos.y, 25, 12);
}
}