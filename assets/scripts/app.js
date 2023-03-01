const API = 'https://randomuser.me/api/';

const fetchData = async urlAPI => {
    let result = await fetch(urlAPI)
    .catch(e => console.error(`Falló la obtención de datos del servidor. Error: Failed to fetch`));
    let data = await result.json();
    let person =  await data.results[0];
    return person; 
};

//Función aspincrona que espera a que termine de hacer 'fetch' y luego renderiza el contenido estático del header. Se ejecuta inmediatamente.

const renderData = async () => {
    const dataFetched =  await fetchData(API);
    const nameTitle = document.querySelector('h1');
    const profilePic = document.getElementById('profile');
    const name = document.querySelector('.name');

    const phone = document.querySelector('#contact-phone');
    const mail = document.querySelector('#contact-mail');
    const location = document.querySelector('#contact-location');

    const footerName = document.querySelector('#footer-name');

    const paintContactInfo = () => {
        phone.innerHTML = `${dataFetched.phone}`;
        mail.innerHTML = `${dataFetched.email}`;
        location.innerHTML = `${dataFetched.location.city}`;
        footerName.innerHTML = `${dataFetched.name.first} ${dataFetched.name.last}`;

    }
    
    const paintName = () => {
        name.innerHTML = `${dataFetched.name.first}`
        nameTitle.innerHTML = 
        `${dataFetched.name.first} <span>${dataFetched.name.last}</span>`;
    }
    const renderPicture = ()=>{
        profilePic.setAttribute('src', `${dataFetched.picture.medium}`);
    }
    console.log(dataFetched) //Mostrar data en consola
    paintName();
    renderPicture();
    paintContactInfo();
};

renderData();

//Función que se utiliza para manejar el evento 'click' del botón del menú

function handleClick (){
    const toggleBtn = document.querySelector('.menu__icon');
    toggleBtn.addEventListener('click', ()=>{
        validateState(toggleBtn);

        const links = document.querySelectorAll('.nav__links');
        links.forEach((e) => {
            e.addEventListener('click', () => {
                const modal = document.querySelector('#modal');
                modal.classList.remove('show');
                modal.innerHTML = ``;
                toggleBtn.setAttribute('name', 'menu-alt-right');

            })
        })
    });
    
};

handleClick();

//Función para validar si la ventana emergente está o no activa
const validateState = (button)=>{
    const modal = document.querySelector('#modal');
    
    const modalContent = ()=>{
        if (modal.classList.contains('show')) {
           
            return `
                <nav>
                    <ul class="nav__links">
                        
                    </ul>
                </nav>
            `
        } else {
            return '';
        }
    };

    const openModal = (content)=>{
        modal.classList.add('show');
        button.setAttribute('name', 'x');
        
        let innerContent = content();
        modal.innerHTML = `${innerContent}`;
        
        const fillUl = ()=>{
            const navLinks = document.querySelector('.nav__links');
            const linksNames = ['perfil', 'skills', 'experiencia', 'contacto'];
            linksNames.map((e) => {
                const newLink = document.createElement('li');
                newLink.innerHTML = `<a href="#${e}"> ${e} </a>`;
                navLinks.appendChild(newLink); 
            });
        }

        fillUl()
    };

    const closeModal = (content)=>{
        modal.classList.remove('show');
        button.setAttribute('name', 'menu-alt-right');
        
        let innerContent = content();
        modal.innerHTML = `${innerContent}`;
    };


    if (modal.classList.contains('show')) {
        closeModal(modalContent);

    } else {
        openModal(modalContent);
    }

};
