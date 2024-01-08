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
        document.getElementById('avatar').value.trim() === '' ||
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
        .replace(/\b\p{L}/gu, (char) => char.toUpperCase()); //работает со всеми символами
}

function checkSpam(str) {
    // Замена 'viagra' или 'XXX' на '***' (нечувствительна к регистру)
    return str.replace(/viagra|xxx/gi, "***");
}

function addComment() {
    const avatarInput = document.getElementById("avatar");
    const messageInput = document.getElementById("message");
    const noCheckbox = document.getElementById('noCheckbox');

    if (noCheckbox.checked) {
        let name = "Name_hidden";
        const avatar = avatarInput.value;
        const message = checkSpam(messageInput.value);

        const commentDiv = document.createElement("div");
        commentDiv.innerHTML = `
          <h2>${name}</h2>
          <img src="${avatar}" alt="Аватар">
          <p>${new Date()}</p>
          <p>${message}</p>
        `;

        const commentList = document.getElementById("commentList");
        commentList.appendChild(commentDiv);

        nameInput = "";
        avatarInput.value = "";
        messageInput.value = "";
    }
    else {
        let nameInput = document.getElementById("name");
        if (nameInput.value.trim() == '') {
            nameInput.value = 'User';
        }

        let name = capitalizeName(nameInput.value);
        const avatar = avatarInput.value;
        const message = checkSpam(messageInput.value);

        const commentDiv = document.createElement("div");
        commentDiv.innerHTML = `
          <h2>${name}</h2>
          <img src="${avatar}" alt="Аватар">
          <p>${new Date()}</p>
          <p>${message}</p>
        `;

        const commentList = document.getElementById("commentList");
        commentList.appendChild(commentDiv);

        nameInput.value = "";
        avatarInput.value = "";
        messageInput.value = "";
    }
}


console.log(capitalizeName(" аЛьмиРа пОлянскАя"));
console.log(capitalizeName(" aLmira pOlYanskaYa"));