document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main .section');
    const navList = document.getElementById('navbar');

    // Build the navigation menu
    sections.forEach((section, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${section.id}`;
        a.textContent = section.querySelector('h1, h2').textContent; // Use section headers as navigation text
        if (index === 0) {
            a.classList.add('active');
        }
        li.appendChild(a);
        navList.appendChild(li);
    });

    const navLinks = document.querySelectorAll('nav ul li a');

    const makeActive = (link) => navLinks[link].classList.add('active');
    const removeActive = (link) => navLinks[link].classList.remove('active');
    const removeAllActive = () => [...navLinks].forEach((link) => link.classList.remove('active'));

    // Check which section is in the viewport
    const sectionInView = () => {
        let currentSectionIndex = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSectionIndex = index;
            }
        });
        return currentSectionIndex;
    };

    // Scroll to section on click
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById(sections[index].id).scrollIntoView({ behavior: 'smooth' });
            removeAllActive();
            makeActive(index);
        });
    });

    // Highlight the current section in the navigation menu
    window.addEventListener('scroll', () => {
        const currentActive = sectionInView();
        if (!navLinks[currentActive].classList.contains('active')) {
            removeAllActive();
            makeActive(currentActive);
        }
    });
});
