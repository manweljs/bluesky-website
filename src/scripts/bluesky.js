function beforeRefresh() {
    loadingPage.classList.remove("close")
    window.scrollTo({
        top: 0,
    });
}
window.addEventListener("beforeunload", beforeRefresh);

let particleDistance = 40

const initParticles = (n) => {
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
                distance: n,
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

const theme = ["MO", "SQ", "RC", "AC", "BS", "OP"]
const themeSelect = theme[Math.floor(Math.random() * theme.length)];


const loadingPage = document.querySelector(".loading-page")
loadingPage.classList.add(themeSelect)
setTimeout(function () {
    loadingPage.classList.add("close")
}, 4000)

let mobileAdjustment = 0
if (isMobileDevice()) {
    mobileAdjustment = window.innerHeight / 2
    mobileAdjustment = mobileAdjustment + (mobileAdjustment / 2)
}
const sections = Array.from(document.querySelectorAll('.sections .section'));
const sectionTops = sections.map(section => section.getBoundingClientRect().top + window.scrollY);

console.log(mobileAdjustment)

const initPage = () => {



    const navbar = document.querySelector(".navbar")
    const navbarMobile = document.querySelector(".navbar-mobile")
    const contentBox = document.querySelector("#content-box")
    const contentBoxTop = contentBox.getBoundingClientRect().top + window.scrollY
    const about = document.querySelector("#about")
    const products = document.querySelector("#products")
    const blog = document.querySelector("#blog")
    const contact = document.querySelector("#contact")
    const aboutTop = about.getBoundingClientRect().top + window.scrollY
    const productsTop = products.getBoundingClientRect().top + window.scrollY
    const scrollStart = window.scrollY
    const productsNav = document.querySelector(".products-nav")

    function handleScroll(zoomAbout, trigerTop) {
        const blogTop = blog.getBoundingClientRect().top

        if (blogTop - window.innerHeight <= 0) {
            productsNav.classList.remove("active");
        }

        // about
        if (zoomAbout <= 0 && zoomAbout + about.offsetHeight + mobileAdjustment > 0 && fixedTitleContent !== "about") {
            products.classList.remove("fix")
            productsNav.classList.remove("active");
        }

        // products
        const productsSectionVisible = sectionTops[0] - trigerTop <= 0 && sectionTops[5] - trigerTop + sections[5].offsetHeight > 0;
        if (productsSectionVisible && fixedTitleContent !== "products") {
            products.classList.add("fix")
            productsNav.classList.add("active");
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
            navbarMobile.classList.add("min")
            about.classList.add("active-section")
        } else {
            navbar.classList.remove("min")
            navbarMobile.classList.remove("min")
            about.classList.remove("active-section")
            productsNav.classList.remove("active")

        }

        const children = products.querySelectorAll('.section');
        const zoomAbout = contentBoxTop - trigerTop
        handleScroll(zoomAbout, trigerTop)

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const subChild = child.querySelector('.slide-box');
            const childRect = child.getBoundingClientRect();

            try {
                if (childRect.top - mobileAdjustment <= 0) {
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
            about.classList.add("fix")
            let x = Math.abs(zoomAbout) / 380
            if (x > .5) {
                x = .5
            }

            if (!isMobile) {
                title.style.transform = `scale(${1 + x})`
            }

        } else {

            about.classList.remove("fix")
        }
    });


};


document.addEventListener('DOMContentLoaded', function () {
    initPage()
});

const handleProductNav = (e) => {
    const target = e.target.dataset.product;

    if (isMobileDevice()) {
        let targetById = document.querySelector("#" + target)
        targetById.scrollIntoView()
    } else {

        const productIndexs = ["meta-optimise", "squirrel", "optimise", "agency-connect", "recruit-complete", "bluesky-studio"]
        const position = productIndexs.indexOf(target) + 1
        console.log(sections)

        console.log(sectionTops, position)
        window.scrollTo(0, sectionTops[position]);
    }

}

const fixedTitle = document.getElementById('title-fix');
let fixedTitleContent = ""

const handleNavClick = (e) => {
    const target = e.target.textContent.toLowerCase()
    // console.log(sectionTops)
    // const productIndexs = ["Home", "About", "Products", "-", "-", "-", "-", "-", "-", "Blog", "Contact"]
    // let position = productIndexs.indexOf(target) - 1
    console.log(target)

    let targetElement = document.querySelector("#" + target)

    if (target) {
        targetElement.scrollIntoView()
        window.scrollBy(0, 5)
    }

    handleMenuClick(e)
}


const handleMenuClick = (e) => {
    console.log(e)
    const navMobileMenu = document.querySelector(".navbar-mobile > .nav-menu")
    const brandIcon = navMobileMenu.querySelector('img')
    const isActive = navMobileMenu.classList.contains("active")
    const theme = ["MO", "SQ", "RC", "AC", "BS", "OP"]
    const n = theme[Math.floor(Math.random() * theme.length)];


    if (isActive) {
        navMobileMenu.classList.remove("set")
        setTimeout(() => {
            navMobileMenu.classList.remove("active", "MO", "SQ", "RC", "AC", "BS", "OP")
        }, 800);
    } else {
        navMobileMenu.classList.add("active", n)
        brandIcon.src = `src/images/icons/icon-${n}.svg`
        setTimeout(() => {
            navMobileMenu.classList.add("set")

        }, 100);
    }

}

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

const isMobile = isMobileDevice()

if (isMobile) {
    document.body.classList.add("is-mobile")

    if (window.innerWidth < 600) {
        particleDistance = particleDistance - 15
    }

    initParticles(particleDistance - 10)
} else {
    initParticles(particleDistance)
}