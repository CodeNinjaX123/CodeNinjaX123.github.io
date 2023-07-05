class carouselWrapper extends HTMLElement {
    constructor() {
        super();
        
        this.a = document.createElement('div');
        this.a.setAttribute('class', 'carousel-wrapper-body');
        this.appendChild(this.a);
        this.a.style.borderRadius = `${this.a.clientHeight * 0.2}px`;

        this.b = document.createElement('div');
        this.b.setAttribute('class', 'left arrow');
        this.a.appendChild(this.b);
    }

    connectedCallback() {

    }
}

customElements.define("carousel-wrapper", carouselWrapper);




const topsection = {
    body: document.getElementById('top-section'),
    spacer: document.getElementById('top-section-spacer'),
    contact: document.getElementsByClassName('top-section-button contact')[0],
    about: document.getElementsByClassName('top-section-button about')[0],
    experience: document.getElementsByClassName('top-section-button experience')[0],
    search: document.getElementsByClassName('top-section-search')[0],
    signin: document.getElementsByClassName('top-section-button signin')[0],
    searchresults: document.getElementById('top-section-search-results')
};

let mouse = {
    scroll: {
        x: window.scrollX,
        y: window.scrollY,
        pastX: window.scrollX,
        pastY: window.scrollY,
        deltaX: 0,
        deltaY: 0,
        trend: []
    }
};

function updateDimensions() {
    topsection.searchresults.style.width = `${topsection.search.clientWidth}px`;
    topsection.spacer.style.height = `${topsection.body.clientHeight + 10}px`;
}

window.onload = function() {
    updateDimensions();
};
window.onresize = function() {
    updateDimensions();
};

topsection.search.addEventListener('click', function(event) {
    topsection.searchresults.style.height = "75vh";
});

document.addEventListener('click', function(event) {
    if(topsection.searchresults.matches(':hover') === false && topsection.searchresults.matches(':active') === false && topsection.search.matches(':hover') === false && topsection.search.matches(':active') === false) {
        topsection.searchresults.style.height = "0vh";
        topsection.search.style.textAlign = "center";
        topsection.search.style.boxShadow = "0 0 0px grey";
    } else {
        topsection.search.style.textAlign = "left";
        topsection.search.style.boxShadow = "0 0 50px grey";
    }
});

document.addEventListener('scroll', function(event) {
    mouse.scroll.y = window.scrollY;
    mouse.scroll.x = window.scrollX;
    mouse.scroll.deltaX = mouse.scroll.x - mouse.scroll.pastX;
    mouse.scroll.deltaY = mouse.scroll.y - mouse.scroll.pastY;
    mouse.scroll.pastX = window.scrollX;
    mouse.scroll.pastY = window.scrollY;
    mouse.scroll.trend.push({x: mouse.scroll.deltaX, y: mouse.scroll.deltaY});
    mouse.scroll.trend = mouse.scroll.trend.slice(-5);
    
    if(mouse.scroll.deltaY < 0) {
        topsection.body.style.transform = `translateY(0%)`;
        topsection.spacer.style.transform = topsection.body.style.transform;
    } else if(mouse.scroll.deltaY > 0) {
        topsection.body.style.transform = `translateY(-100%)`;
        topsection.spacer.style.transform = topsection.body.style.transform;
    }
    
});