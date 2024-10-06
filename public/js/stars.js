let constellations;
let stars = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    initializeConstellations();
    for (let i = 0; i < 400; i++) {
        stars.push(new Star());
    }
}

let xAdjustmentFactorWidescreen = 0.5;
let xAdjustmentFactorMobile = 1.0; 
let yAdjustmentFactor = 0.9; 

function initializeConstellations() {
    const originalConstellations = [
        { name: "Orion", stars: [[0.25, 0.4], [0.35, 0.55], [0.5, 0.5], [0.45, 0.4]] },
        { name: "Big Dipper", stars: [[0.65, 0.25], [0.75, 0.3], [0.85, 0.35], [0.75, 0.4], [0.7, 0.35]] },
        { name: "Cassiopeia", stars: [[0.8, 0.75], [0.75, 0.8], [0.7, 0.85]] },
        { name: "Scorpius", stars: [[0.4, 0.85], [0.5, 0.8], [0.6, 0.85], [0.55, 0.9]] },
        { name: "Taurus", stars: [[0.25, 0.55], [0.27, 0.6], [0.23, 0.65]] },
        { name: "Hercules", stars: [[0.5, 0.45], [0.52, 0.5], [0.53, 0.47]] },
        { name: "Lyra", stars: [[0.8, 0.45], [0.85, 0.5], [0.81, 0.48]] },
        { name: "Pegasus", stars: [[0.1, 0.75], [0.15, 0.8], [0.05, 0.85]] },
        { name: "Andromeda", stars: [[0.45, 0.7], [0.5, 0.75], [0.4, 0.78]] },
        { name: "Phoenix", stars: [[0.15, 0.65], [0.2, 0.6], [0.25, 0.55]] },
    ];


    const aspectRatio = windowWidth / windowHeight;

    constellations = originalConstellations.map(constellation => {
        return {
            name: constellation.name,
            stars: constellation.stars.map(star => {
                const adjustedX = (star[0] - 0.5) * (aspectRatio > 1.78 ? xAdjustmentFactorWidescreen : xAdjustmentFactorMobile) + 0.5;
                const adjustedY = star[1] * yAdjustmentFactor; 
                return [adjustedX, adjustedY];
            })
        };
    });
}


        function draw() {
            background(18, 18, 18);
            for (let star of stars) {
                star.update();
                star.show();
            }
            drawConstellations();
        }

        function drawConstellations() {
            stroke(255, 150);
            strokeWeight(1);
            let prev_starX;
            let prev_starY;
            for (const constellation of constellations) {
                for (let i = 0; i < constellation.stars.length; i++) {
                    const [starX, starY] = constellation.stars[i];
                    fill(255);
                    noStroke();
                    ellipse(starX * width, starY * height, 3); 
                    stroke(255);
                    strokeWeight(0.1);
                    line(prev_starX * width, prev_starY * height, starX * width, starY * height);
                    prev_starX = starX;
                    prev_starY = starY;
                }
                prev_starX = undefined;
                prev_starY = undefined;
                const lastStar = constellation.stars[constellation.stars.length - 1];
                fill(255); 
                textSize(10);
                textAlign(CENTER, CENTER);
                text(constellation.name, lastStar[0] * width, lastStar[1] * height - 10); // Draw the name above the last star
            }
        }

        class Star {
            constructor() {
                this.position = createVector(random(width), random(height));
                this.size = random(1, 3); 
                this.brightness = random(100, 255);
                this.brightnessChange = random(2, 4);
            }

            update() {
                this.brightness += this.brightnessChange;
                if (this.brightness > 255 || this.brightness < 100) {
                    this.brightnessChange *= -1;
                }
            }

            show() {
                fill(255, this.brightness);
                noStroke();
                ellipse(this.position.x, this.position.y, this.size);
            }
        }

        function windowResized() {
            resizeCanvas(windowWidth, windowHeight);
        }