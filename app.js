const getElement = id => document.getElementById(id);

const Button = getElement('submit');
const Btn = getElement('edit');
const form = getElement('form');
const table = getElement('table');
const tbody = getElement('tbody');
const First = getElement('prenom');
const second = getElement('nom');
const emailAdress = getElement('email');
const Phone = getElement('telephone');
const hidden = getElement('hidden');

let users = JSON.parse(localStorage.getItem('users')) || [];

const addUser = users => {
    tbody.innerHTML = '';
    users?.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.prenom}</td>
            <td>${user.nom}</td>
            <td>${user.email}</td>
            <td>${user.telephone}</td>
            <td style="cursor: pointer"><button class="btn border bg-warning" onclick="edit(${user.id})">Modifier</button></td>
            <td style="cursor: pointer"><button class="btn border bg-danger text-light" onclick="deleteUser(${user.id})">Supprimer</button></td>
        `;
        tbody.appendChild(row);
    });
};

const edit = id => {
    Button.style.display = 'none';
    Btn.style.display = 'block';
    const selectedUser = users.find(user => user.id === id);
    First.value = selectedUser.prenom;
    second.value = selectedUser.nom;
    emailAdress.value = selectedUser.email;
    Phone.value = selectedUser.telephone;
    hidden.value = selectedUser.id;
};

const deleteUser = id => {
    users = users.filter(user => user.id !== id);
    addUser(users);
    localStorage.setItem('users', JSON.stringify(users));
};

form.addEventListener('submit', e => {
    e.preventDefault();

    if (hidden.value) {
        const selectedUser = users.find(user => user.id === Number(hidden.value));
        const updatedUsers = users.map(user => (user.id === selectedUser.id ? {
            ...user,
            prenom:First.value,
            nom: nomInput.value,
            email: emailAdress.value,
            telephone: Phone.value
        } : user));
        
        users = updatedUsers;
        addUser(users);
        localStorage.setItem('users', JSON.stringify(users));

        Button.style.display = 'block';
        Btn.style.display = 'none';
        form.reset();
        hidden.value = '';

        return;
    }

    const newUser = {
        id: Math.random(),
        prenom: First.value,
        nom: second.value,
        email: emailAdress.value,
        telephone: Phone.value
    };

    users.push(newUser);
    addUser(users);
    localStorage.setItem('users', JSON.stringify(users));
    form.reset();
    hidden.value = '';
});
