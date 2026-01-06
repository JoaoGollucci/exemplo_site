// Importando o script do Google Analytics 4
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-6XW8NF67DB'); // Substitua 'GA_MEASUREMENT_ID' pelo seu ID de acompanhamento real

// Menu Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Evento GA4 para click no hamburger
    gtag('event', 'button_click', {
        'element_id': 'hamburger',
        'element_text': 'Menu',
        'page_location': window.location.href
    });
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        // Evento GA4 para click em link de navegação
        gtag('event', 'link_click', {
            'link_url': link.getAttribute('href'),
            'link_text': link.textContent,
            'page_location': window.location.href
        });
    });
});

// Formulário de Contato
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simular envio do formulário
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Dados do formulário:', data);
    
    // Ocultar formulário e mostrar mensagem de sucesso
    contactForm.style.display = 'none';
    successMessage.classList.add('show');
    
    // Evento GA4 para submissão de formulário
    gtag('event', 'form_submission', {
        'form_id': contactForm.getAttribute('id'),
        'form_name': contactForm.getAttribute('name'),
        'page_location': window.location.href
    });
    
    // Resetar formulário após 5 segundos e mostrar novamente
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        successMessage.classList.remove('show');
    }, 5000);
});

// Smooth Scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Evento GA4 para click em link com scroll suave
            gtag('event', 'link_click', {
                'link_url': this.getAttribute('href'),
                'link_text': this.textContent,
                'page_location': window.location.href
            });
        }
    });
});

// Animação ao scroll (fade in elements)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
    // Evento GA4 para scroll da página
    // Nota: Este evento pode ser muito frequente, considere limitar sua frequência ou remover
    gtag('event', 'page_scroll', {
        'scroll_depth': currentScroll,
        'page_location': window.location.href
    });
});