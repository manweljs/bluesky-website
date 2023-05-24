function beforeRefresh() {
    loadingPage.classList.remove("close")
    window.scrollTo({
        top: 0,
    });
}
// window.addEventListener("beforeunload", beforeRefresh);

const initParticles = () => {
    tsParticles.load("tsparticles", {
        detectRetina: false,
        fpsLimit: 30,
        interactivity: {
            detectsOn: "canvas",
            events: {
                onClick: {
                    enable: false,
                    mode: "push"
                },
                onDiv: {
                    elementId: "repulse-div",
                    enable: false,
                    mode: "repulse"
                },
                onHover: {
                    enable: true,
                    mode: "bubble",
                    parallax: {
                        enable: false,
                        force: 2,
                        smooth: 10
                    }
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 50,
                    duration: 1,
                    opacity: 8,
                    size: 15,
                    speed: 1
                },
                connect: {
                    distance: 50,
                    lineLinked: {
                        opacity: 0.5
                    },
                    radius: 60
                },
                grab: {
                    distance: 300,
                    lineLinked: {
                        opacity: 1
                    }
                },
                push: {
                    quantity: 4
                },
                remove: {
                    quantity: 2
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                slow: {
                    active: false,
                    radius: 0,
                    factor: 1
                }
            }
        },
        particles: {
            color: {
                value: ["#4285f4", "#34A853", "#FBBC05", "#EA4335"]
            },
            lineLinked: {
                blink: false,
                color: "#e0e0e0",
                consent: false,
                distance: 50,
                enable: true,
                opacity: 0.8,
                width: 2
            },
            move: {
                attract: {
                    enable: false,
                    rotate: {
                        x: 600,
                        y: 1200
                    }
                },
                bounce: false,
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 1,
                straight: false
            },
            number: {
                density: {
                    enable: false,
                    area: 2000
                },
                limit: 0,
                value: 200
            },
            opacity: {
                animation: {
                    enable: true,
                    minimumValue: 0.3,
                    speed: 2,
                    sync: false
                },
                random: false,
                value: 0.8
            },
            shape: {
                character: {
                    fill: false,
                    font: "Verdana",
                    style: "",
                    value: "*",
                    weight: "400"
                },
                image: {
                    height: 100,
                    replaceColor: true,
                    src: "https://cdn.matteobruni.it/images/particles/github.svg",
                    width: 100
                },
                polygon: {
                    sides: 5
                },
                stroke: {
                    color: "#000000",
                    width: 0
                },
                type: "circle"
            },
            size: {
                animation: {
                    enable: false,
                    minimumValue: 0.1,
                    speed: 10,
                    sync: false
                },
                random: true,
                value: 1
            }
        },
        polygon: {
            draw: {
                enable: false,
                lineColor: "rgba(255,255,255,0.2)",
                lineWidth: 1
            },
            enable: true,
            move: {
                radius: 5
            },
            position: {
                x: 5,
                y: 5
            },
            inlineArrangement: "equidistant",
            scale: .45,
            type: "inline",
            // data:
        },
        background: {
            color: "transparent",
            image: "",
            position: "0 0",
            repeat: "no-repeat",
            size: "cover"
        }
    });
}

initParticles()


// Adjust scroll speed
// Set the scroll speed factor

const scrollSpeed = 4;

// Add an event listener for the 'wheel' event
document.addEventListener('wheel', function (event) {
    // Prevent default scrolling behavior
    event.preventDefault();

    // Calculate the new scroll position
    let delta = event.deltaY;
    let scrollPosition = window.scrollY + (delta * scrollSpeed);

    // Set the new scroll position
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
}, { passive: false });


const loadingPage = document.querySelector(".loading-page")
setTimeout(function () {
    loadingPage.classList.add("close")
}, 1000)

const sections = Array.from(document.querySelectorAll('.sections .section'));
const sectionTops = sections.map(section => section.getBoundingClientRect().top + window.scrollY);


const initPage = () => {
    const navbar = document.querySelector(".navbar")

    const contentBox = document.querySelector("#content-box")
    const contentBoxTop = contentBox.getBoundingClientRect().top + window.scrollY
    const about = document.querySelector("#about")
    const products = document.querySelector("#products")
    const blog = document.querySelector("#blog")
    const contact = document.querySelector("#contact")


    const aboutTop = about.getBoundingClientRect().top + window.scrollY
    const productsTop = products.getBoundingClientRect().top + window.scrollY
    const scrollStart = window.scrollY
    // console.log(productsTop)
    // sections.forEach((section, index) => section.classList.add("set"));

    // sections[6].style.top = sectionTops[6] + "px" // blog
    // sections[7].style.top = sectionTops[7] + "px" // contact
    // sections[8].style.top = sectionTops[8] + "px" //footer
    const productsNav = document.querySelector(".products-nav")

    function handleScroll(zoomAbout, trigerTop) {
        // about
        if (zoomAbout <= 0 && zoomAbout + about.offsetHeight > 0 && fixedTitleContent !== "about") {
            products.classList.remove("fix")
        }

        // products
        const productsSectionVisible = sectionTops[0] - trigerTop <= 0 && sectionTops[5] - trigerTop + sections[5].offsetHeight > 0;
        if (productsSectionVisible && fixedTitleContent !== "products") {
            products.classList.add("fix")
        }

        // blog
        const blogSectionVisible = sectionTops[6] - trigerTop <= 0 && sectionTops[6] - trigerTop + sections[6].offsetHeight > 0;
        if (blogSectionVisible && fixedTitleContent !== "blog") {
            productsNav.classList.remove("active");
            products.classList.remove("fix")
            blog.classList.add("fix")
            contact.classList.remove("fix")


        }

        // contacts
        const contactsSectionVisible = sectionTops[7] - trigerTop <= 0;
        if (contactsSectionVisible && fixedTitleContent !== "contact") {
            blog.classList.remove("fix")
            contact.classList.add("fix")

        }
    }


    window.addEventListener('scroll', function () {


        const trigerTop = Math.abs(document.querySelector(".triger").getBoundingClientRect().top);
        if (trigerTop > 500) {
            navbar.classList.add("min")
            about.classList.add("active-section")
        } else {
            navbar.classList.remove("min")
            about.classList.remove("active-section")


        }

        const children = products.querySelectorAll('.section');
        const zoomAbout = contentBoxTop - trigerTop
        handleScroll(zoomAbout, trigerTop)

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const subChild = child.querySelector('.slide-box');
            const childRect = child.getBoundingClientRect();

            try {
                if (childRect.top <= 0) {
                    child.classList.add("visible")
                    subChild.classList.add("active");
                } else {
                    child.classList.remove("visible")
                    subChild.classList.remove("active");
                }

            } catch (error) {
                console.log('error', error)
            }
        }

        if (zoomAbout <= 0) {
            const title = contentBox.querySelector("#about .title")
            productsNav.classList.add("active")
            about.classList.add("fix")
            let x = Math.abs(zoomAbout) / 350
            if (x > .7) {
                x = .7
            }
            title.style.transform = `scale(${1 + x})`
        } else {
            productsNav.classList.remove("active")
            about.classList.remove("fix")
        }
    });


};


document.addEventListener('DOMContentLoaded', function () {
    initPage()
});

const handleProductNav = (e) => {
    let target = e.target.dataset.product;
    const productIndexs = ["about", "meta-optimise", "squirrel", "optimise", "agency-connect", "recruit-complete", "bluesky-studio"]
    const position = productIndexs.indexOf(target)
    window.scrollTo(0, sectionTops[position]);
}

const fixedTitle = document.getElementById('title-fix');
let fixedTitleContent = ""

const handleNavClick = (e) => {
    const target = e.target.textContent
    console.log(sectionTops)
    const productIndexs = ["Home", "About", "Products", "-", "-", "-", "-", "-", "Blog", "Contact"]
    const position = productIndexs.indexOf(target) - 1
    console.log(position)
    window.scrollTo(0, sectionTops[position]);

}



