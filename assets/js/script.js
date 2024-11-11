document.addEventListener("DOMContentLoaded", (e) => {
    const arrowDOM = document.querySelector('.fa-arrow-up');
    const buttonThemeDOM = document.querySelector('.js-themes');
    const logoDOM = document.querySelectorAll('.js-logo-change');

    const shadowDOM = document.querySelectorAll('.js-shadow-change-light');
    const submitButtonDOM = document.querySelector('.js-submit');
    const textDarkDOM = document.querySelectorAll('.js-text-change-dark');
    const backgroundDarkDOM = document.querySelectorAll('.js-bg-change-dark');
    const textLightDOM = document.querySelectorAll('.js-text-change-light');
    const backgroundLightDOM = document.querySelectorAll('.js-bg-change-light');
    let darkTheme = false;


    const canvasDOM = document.querySelector('#canvas1');
    const ctx = canvasDOM.getContext('2d');
    canvasDOM.width = window.innerWidth;
    canvasDOM.height = window.innerHeight;
    let particlesArray;

    const headerDOM = document.querySelector('header');
    const navDOM = document.querySelector('nav');
    const menuDOM = document.querySelector('menu');
    const footerDOM = document.querySelector('footer');
    /****************************************************
    *                ANIMATION BACKGROUND               *
    ****************************************************/

    // Mouse position
    let mouse = {
        x:null,
        y: null,
        radius: (canvasDOM.height/80) * (canvasDOM.width/80)
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('touch', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    // Create particles
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            if (!darkTheme) {

                ctx.fillStyle = 'rgb(35, 34, 36)';
            }
            else {
                ctx.fillStyle = 'rgb(255, 249, 231)';
            }
            ctx.fill();
        }

        update() {
            if (this.x > canvasDOM.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvasDOM.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvasDOM.width - this.size * 10) {
                    this.x += 10;
                }
                if (mouse.x > this.x && this.x > this.size *10) {
                    this.x -= 10;
                }
                if (mouse.y < this.y && this.y < canvasDOM.height - this.size * 10) {
                    this.y += 10;
                }
                if (mouse.y > this.y && this.y > this.size *10) {
                    this.y -= 10;
                }
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }
    
    // Initializing of particles
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvasDOM.height * canvasDOM.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 5) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = Math.random();
            let directionY = Math.random();
            let color;
            if (!darkTheme) {

                color = 'rgb(35, 34, 36)';
            }
            else {
                color = 'rgb(255, 249, 231)';
            }

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Create a connection between each partiles
    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = 0; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x)
                * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * 
                (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvasDOM.width/9) * (canvasDOM.height/9)) {
                    if (!darkTheme) {
                        ctx.strokeStyle = 'rgb(35, 34, 36)';
                    }
                    else {
                        ctx.strokeStyle = 'rgb(255, 249, 231)';
                    }
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animate particles
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }
    init();
    animate();

    /****************************************************
    *                 MOUSE ANIMATION                  *
    ****************************************************/

     const coords = { x: 0, y: 0 };
     const circles = document.querySelectorAll(".circle");
     
     const mouseColors = [
       "#999",
       "#888",
       "#777",
       "#666",
       "#666",
       "#666",
       "#555",
       "#555",
       "#555",
       "#444",
       "#444",
       "#444",
       "#333",
       "#222",
       "#111",
       "#000",
       "#000",
     ];
     
     circles.forEach(function (circle, index) {
       circle.x = 0;
       circle.y = 0;
       circle.style.backgroundColor = mouseColors[index];
     });
     
     window.addEventListener("mousemove", function(e){
       coords.x = e.clientX;
       coords.y = e.clientY;
       
     });
     
     function animateCircles() {
       
       let x = coords.x;
       let y = coords.y;
       
       circles.forEach(function (circle, index) {
         circle.style.left = x - 12 + "px";
         circle.style.top = y - 12 + "px";
         
         circle.style.scale = (circles.length - index) / circles.length;
         
         circle.x = x;
         circle.y = y;
     
         const nextCircle = circles[index + 1] || circles[0];
         x += (nextCircle.x - x) * 0.3;
         y += (nextCircle.y - y) * 0.3;
       });
      
       requestAnimationFrame(animateCircles);
     }
     
     animateCircles();
     
    /****************************************************
    *                  ANIMATION ARTICLES               *
    ****************************************************/

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('js-show');
            }
            else {
                entry.target.classList.remove('js-show');
            }
        });
    });

     const hiddenElements = document.querySelectorAll('.js-hidden');
     hiddenElements.forEach((e) => observer.observe(e));

    /****************************************************
    *                 ANIMATION SCROLL                  *
    ****************************************************/

      arrowDOM.addEventListener('click', () => {
        window.scrollBy(0,-3000);
      });
      
      window.addEventListener('scroll', () => {
        if (this.scrollY > 200 && this.scrollY < 3000) {
            headerDOM.classList.add('js-header-scroll-hidden');
            footerDOM.classList.add('js-footer-scroll-hidden');
        }
        else {
            headerDOM.classList.remove('js-header-scroll-hidden');
            footerDOM.classList.remove('js-footer-scroll-hidden');
        }
      });

    /****************************************************
    *                 COLOR BACKGROUND                  *
    ****************************************************/

    function themesColors() { // Mode Dark / Light
        submitButtonDOM.classList.toggle('js-submit-light');
        shadowDOM.forEach(element => {
            element.classList.toggle('js-shadow-light');
        });
        backgroundDarkDOM.forEach(element => {
            element.classList.toggle('js-bg-dark');
        });
        backgroundLightDOM.forEach(element => {
            element.classList.toggle('js-bg-light');
        });
        textDarkDOM.forEach(element => {
            element.classList.toggle('js-text-dark');
        });
        textLightDOM.forEach(element => {
            element.classList.toggle('js-text-light');
        });
        if (!darkTheme) {
            darkTheme = true; 
        }
        else {
            darkTheme = false;
        }

        const logoLight = 'assets/images/logo-light.png';
        logoDOM.forEach(element => {
            if (element.getAttribute('src') === logoLight) {
                element.setAttribute('src', 'assets/images/logo-dark.png');
            }
            else {
                element.setAttribute('src', logoLight);
            }
        });
    }

    buttonThemeDOM.addEventListener('click', (e) => {
        themesColors();
    });
});