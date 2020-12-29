(() =>{
    const actions = {
        birdFlies(key) {
            if (key) {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        },
        birdFlies2(key) {
            if (key) {
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
            } else {
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    }
    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; //현재 활성화된 .visible 
    let ioIndex;

    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1 ;
    });

    for (let i = 0; i < stepElems.length; i++) {
        io.observe(stepElems[i]);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }
    
    
    function activeate(action) {
        currentItem.classList.add('visible');
            if (action) {
                actions[action](true);
            }

    }

    function inactivate(action) {
        currentItem.classList.remove('visible');
        if (action) {
            actions[action](false);
        }

    }

    window.addEventListener('scroll', ()=>{

        let step;
        let boundingReact;

        //for (let i = 0; i < stepElems.length; i++) {
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            step = stepElems[i];

            if(!step) continue;
            boundingReact = step.getBoundingClientRect();
            
            if(boundingReact.top > window.innerHeight * 0.1 && boundingReact.top < window.innerHeight * 0.8){
                
                inactivate(currentItem.dataset.action);
                currentItem = graphicElems[step.dataset.index];
                activeate(currentItem.dataset.action);
            }
        }
    });
    activeate();
    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100);
    });
})();

