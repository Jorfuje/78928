/*const listUsers = async () => {
    const response = await fetch("https://192.168.100.9/");
    const users = await response.json();

    let tableBody = ``;
    users.forEach((user, index) => {
        tableBody += `<tr>
        <td class='centered'>${user.estado}</td>
        <td class='centered'>${user.temperatura}</td>
        <td class='centered'>${user.humedad}</td>
        </tr>`;
    });
    document.getElementById("tableBody_Users").innerHTML = tableBody;
    tableBody_Users.innerHTML = tableBody;
};

window.addEventListener("load", function () {
    listUsers();
});
*/

let auxBoton = document.getElementById("boton");
auxBoton.addEventListener('click', (e) => {
    e.preventDefault();
    consultar();
})

function consultar(){
    fetch('http://192.168.100.9')
    .then(res => res.json())
    .then(data => {
        addRow(data)
        console.log(data)
    });
}

function addRow(data) {
    let aux = document.getElementById("tabla");
    let auxRow = aux.insertRow(-1);
    let auxCell = auxRow.insertCell(0);
    let auxCell2 = auxRow.insertCell(1);
    let auxCell3 = auxRow.insertCell(2);
    let auxCell4 = auxRow.insertCell(3);
    let auxCell5 = auxRow.insertCell(4);
    let auxCell6 = auxRow.insertCell(5);
    auxCell.textContent = data.estado;
    auxCell2.textContent = data.humedad;
    auxCell3.textContent = data.temperaturaC;
    auxCell4.textContent = data.temperaturaF;
    auxCell5.textContent = data.indiceCalorC;
    auxCell6.textContent = data.indiceCalorF;
}

