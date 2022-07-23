const accordionWrapper = document.getElementById('accordionExample');


const createTemplate = data => {
    return `
        <div class="accordion-item" bis_skin_checked="1">
            <div id="collapse1" class="accordion-collapse collapse" aria-labelledby="heading1"
                data-bs-parent="#accordionExample" bis_skin_checked="1">
                <div class="accordion-body" bis_skin_checked="1">
                    <strong>A-запись:</strong> ${data.dns_a}
                </div>
            </div>
            <div id="collapse1" class="accordion-collapse collapse" aria-labelledby="heading1"
                data-bs-parent="#accordionExample" bis_skin_checked="1">
                <div class="accordion-body" bis_skin_checked="1">
                    <strong>MX-запись:</strong> ${data.dns_mx}
                </div>
            </div>
            <div id="collapse1" class="accordion-collapse collapse" aria-labelledby="heading1"
                data-bs-parent="#accordionExample" bis_skin_checked="1">
                <div class="accordion-body" bis_skin_checked="1">
                    <strong>NS-запись:</strong> ${data.dns_ns}
                </div>
            </div>
            <h2 class="accordion-header" id="heading1">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1"><a
                        id="linkid" href="${data.domain}" target="_blank">${data.domain}</a>
                        <div class="accordion__holder">
                            <div class="result__wrap">
                                <span class="result__show result__host">
                                    <?xml version="1.0" ?>
                                    <svg style="enable-background:new 0 0 50 50;" version="1.1" viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <g id="Layer_1">
                                            <path d="M25,39c13.036,0,23.352-12.833,23.784-13.379L49.275,25l-0.491-0.621C48.352,23.833,38.036,11,25,11   S1.648,23.833,1.216,24.379L0.725,25l0.491,0.621C1.648,26.167,11.964,39,25,39z M25,13c10.494,0,19.47,9.46,21.69,12   C44.473,27.542,35.509,37,25,37C14.506,37,5.53,27.54,3.31,25C5.527,22.458,14.491,13,25,13z"/>
                                            <path d="M25,34c4.963,0,9-4.038,9-9s-4.037-9-9-9s-9,4.038-9,9S20.037,34,25,34z M25,18c3.859,0,7,3.14,7,7s-3.141,7-7,7   s-7-3.14-7-7S21.141,18,25,18z"/>
                                        </g>
                                        <g/>
                                    </svg>
                                </span>
                                <div class="result__inform tabs__wrapper">
                                    <div id="tab-${data.id}-1"
                                        class="tabs-content__item tabs-content__item--active result__hold ">
                                        <a  href="http://${data.domain}" class="result__image">
                                            <img src="${data.photo_1}"
                                                alt="${data.domain}">
                                        </a>
                                    </div>
                                    <div id="tab-${data.id}-2" class="tabs-content__item result__hold">
                                        <a href="https://${data.domain}" class="result__image">
                                            <img src="${data.photo_2}"
                                                alt="${data.domain}">
                                        </a>
                                    </div>
                                    <div class="result-triggers">
                                        <a href="#tab-${data.id}-1"
                                            class="result-triggers__item result__link result-triggers__item--active">HTTP</a>
                                        <a href="#tab-${data.id}-2" class="result-triggers__item result__link">HTTPS</a>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion__arrow">
                                <?xml version="1.0" ?>
                                <!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                                <svg fill="#000" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <rect fill="none" height="50" width="50"/>
                                    <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 "/>
                                </svg>
                            </div>
                        </div>
                </button>
            </h2>
            <div id="collapse1" class="accordion-collapse collapse show" aria-labelledby="heading1"
                data-bs-parent="#accordionExample" bis_skin_checked="1">
            </div>
        </div>
    `
}

axios
    .get('../data/info.json')
    // .get('/phish/data/info.json')
    .then(response => {
        data = response.data
        if (data) {
            data.forEach(item => {
                accordionWrapper.innerHTML += createTemplate(item);
            })
        }
        handleAccordion();
        console.log("response", data);
    })
    .catch(error => {
        console.log("error", error);
    })

function handleAccordion() {
        const resultHostElems = document.querySelectorAll('.result__host');
        const mouseHoverShow = () => {
        for (let item of resultHostElems) {
    
            const wrap = item.closest('.result__wrap');
            const elem = wrap.querySelector('.result__inform');
    
            //Mouse hover effect
            item.addEventListener('mouseenter', () => {
                elem.style.display = 'block';
            })
            item.addEventListener('mouseleave', () => {
                elem.style.display = 'none';
            })
            elem.addEventListener('mouseenter', () => {
                elem.style.display = 'block';
            })
            elem.addEventListener('mouseleave', () => {
                elem.style.display = 'none';
            })
    
            const triggerElems = wrap.querySelectorAll('.result-triggers__item');
            const contentElems = wrap.querySelectorAll('.tabs-content__item');
    
    
            //Tabs functions
            triggerElems.forEach((item) => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
    
                    const id = e.target.getAttribute('href').replace('#', '');
                    triggerElems.forEach((child) => {
                        child.classList.remove('result-triggers__item--active');
                    });
                    contentElems.forEach((child) => {
                        child.classList.remove('tabs-content__item--active');
                    });
                    item.classList.add('result-triggers__item--active');
                    document.getElementById(id).classList.add('tabs-content__item--active');
                })
            });
        }
    }
    
    mouseHoverShow();
    
    const accordionButtons = document.querySelectorAll('.accordion-button');
    for (let item of accordionButtons) {
        item.addEventListener('click', (e) => {
            const accordion = item.closest('.accordion');
            const accordionCollapse = accordion.querySelectorAll('.accordion-collapse');
            for (let elem of accordionButtons) {
                elem.classList.remove('collapsed');
            }
            item.classList.add('collapsed');
            for (let elem of accordionCollapse) {
                elem.classList.remove('show');
            }
            const accordionItem = item.closest('.accordion-item');
            const accordionCollapseElems = accordionItem.querySelectorAll('.accordion-collapse');
            for (let elem of accordionCollapseElems) {
                elem.classList.add('show');
            }
        })
    }
};








