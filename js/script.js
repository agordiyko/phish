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