const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu-list a");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
});

mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
    });
});

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    gsap.to(cursorDot, {
        x: posX,
        y: posY,
        duration: 0
    });

    gsap.to(cursorOutline, {
        x: posX,
        y: posY,
        duration: 0.15
    });
});

const interactables = document.querySelectorAll('a, button, .grid-item, .event-card, .hamburger');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

tl.from(".logo", {
    y: -20,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
})
.from(".nav-links li", {
    y: -20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out",
}, "-=0.5")
.from(".nav-right", { 
    y: -20, 
    opacity: 0, 
    duration: 0.8 
}, "-=0.8")
.from(".hero-content > *", {
    y: 50,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
}, "-=0.5");

gsap.to(".hero-bg img", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
    },
});

gsap.from(".about-text", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none reverse",
    },
});

gsap.from(".about-image", {
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none reverse",
    },
});

gsap.set(".grid-item", { opacity: 0, y: 100 });

ScrollTrigger.batch(".grid-item", {
    start: "top 85%",
    onEnter: (batch) =>
        gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1,
            ease: "back.out(1.5)",
        }),
    onLeaveBack: (batch) =>
        gsap.to(batch, {
            opacity: 0,
            y: 100,
        }),
});

gsap.set(".event-card", { opacity: 0, y: 50 });

ScrollTrigger.batch(".event-card", {
    start: "top 85%", 
    onEnter: (batch) => gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    }),
   
     onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 50 }) 
});
