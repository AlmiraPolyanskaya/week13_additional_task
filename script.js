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
    const nameInput = document.getElementById("name");
    const avatarInput = document.getElementById("avatar");
    const messageInput = document.getElementById("message");

    const name = capitalizeName(nameInput.value);
    const avatar = avatarInput.value;
    const message = checkSpam(messageInput.value);

    const commentDiv = document.createElement("div");
    commentDiv.innerHTML = `
      <h2>${name}</h2>
      <img src="${avatar}" alt="Аватар">
      <p>${message}</p>
    `;

    const commentList = document.getElementById("commentList");
    commentList.appendChild(commentDiv);

    nameInput.value = "";
    avatarInput.value = "";
    messageInput.value = "";
}


console.log(capitalizeName(" аЛьмиРа пОлянскАя"));
console.log(capitalizeName(" aLmira pOlYanskaYa"));