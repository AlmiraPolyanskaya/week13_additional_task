let lastChecked;
function updateCheckboxes(currentCheckbox) {
    if (lastChecked && lastChecked !== currentCheckbox) {
        lastChecked.checked = false;
    }
    lastChecked = currentCheckbox;
}

function checkFormValidity() {
    const submitButton = document.getElementById('submit');
    if (
        (!document.getElementById('noCheckbox').checked && !document.getElementById('yesCheckbox').checked) ||
        document.getElementById('message').value.trim() === ''
    ) {
        submitButton.disabled = true;
        document.getElementById('errorMessage').innerText = 'Заполните пустые поля';
    }
    else {
        submitButton.disabled = false;
        document.getElementById('errorMessage').innerText = '';
    }
}

window.addEventListener('load', checkFormValidity);
document.getElementById('noCheckbox').addEventListener('change', checkFormValidity);
document.getElementById('yesCheckbox').addEventListener('change', checkFormValidity);
document.getElementById('avatar').addEventListener('input', checkFormValidity);
document.getElementById('message').addEventListener('input', checkFormValidity);


function capitalizeName(name) {
    return name
        .trim()
        .toLowerCase()
        //.replace(/\b\w/g, (char) => char.toUpperCase()); работает только с латиницей
        .replace(/(^|\s)\S/, (char) => char.toUpperCase()); //регулярное выражение, которое должно работать со всеми символами, но почему-то тут с кириллицей не работает! в конце кода console.log для демонстрации
}

function checkSpam(str) {
    return str.replace(/viagra|xxx/gi, "***");
}

function setAvatar() {
    const avatarInput = document.getElementById("avatar");
    const avatar = avatarInput.value;

    const defaultAvatars = [
        './assets/images/1.png',
        './assets/images/2.png',
        './assets/images/3.png',
        './assets/images/4.png',
        './assets/images/5.png'
    ];

    let selectedAvatar;
    if (avatar.trim() !== '') {
        selectedAvatar = avatar.trim();
    }
    else {
        const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
        selectedAvatar = defaultAvatars[randomIndex];
    }

    return selectedAvatar;
}

function addComment() {
    const messageInput = document.getElementById("message");
    const noCheckbox = document.getElementById('noCheckbox');

    if (noCheckbox.checked) {
        let name = "Name_hidden";
        setAvatar();
        const avatar = setAvatar();

        const message = checkSpam(messageInput.value);

        const commentDiv = document.createElement("div");
        commentDiv.classList.add('columns');

        commentDiv.innerHTML = `
        <img src="${avatar}" alt="Аватар">
        <h2>${name}</h2>
        <p>${`${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}  ${new Date().getHours()}ч.${new Date().getMinutes()}мин.`}</p>
        <p>${message}</p>
        `;

        const commentList = document.getElementById("commentList");
        commentList.appendChild(commentDiv);

        document.getElementById("name").value = "";
        document.getElementById("avatar").value = "";
        messageInput.value = "";
    }
    else {
        let nameInput = document.getElementById("name");
        if (nameInput.value.trim() == '') {
            nameInput.value = 'Username';
        }

        let name = capitalizeName(nameInput.value);
        setAvatar();
        const avatar = setAvatar();

        const message = checkSpam(messageInput.value);

        const commentDiv = document.createElement("div");
        commentDiv.classList.add('columns');

        commentDiv.innerHTML = `
        <img src="${avatar}" alt="Аватар">
        <h2>${name}</h2>
        <p>${`${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}  ${new Date().getHours()}ч.${new Date().getMinutes()}мин.`}</p>
        <p>${message}</p>
        `;

        const commentList = document.getElementById("commentList");
        commentList.appendChild(commentDiv);

        nameInput.value = "";
        document.getElementById("avatar").value = "";
        messageInput.value = "";
    }
    lastChecked.checked = false;
    checkFormValidity();
}



console.log(capitalizeName(" аЛьмиРа пОлянскАя"));
console.log(capitalizeName(" aLmira pOlYanskaYa"));


