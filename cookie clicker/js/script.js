let cookies = 0;
let cookiespersecond = 0;
setInterval(updateCookiesPerSecond, 1000);
function handleClick() {
    cookies += 1;
    document.getElementById("cookiescount").innerText = "Cookies: "+ cookies.toFixed(0);
}
setItem("Cursor", 15, 0.1);
setItem("Grandma", 100, 1);
setItem("Farm", 1100, 10);
setItem("Mine", 12000, 100);
setItem("Factory", 130000, 1000);
setItem("Bank", 1400000, 10000);
setItem("heitor", 15000000, 100000);
function setItem(itemName, initialCost, increment) {
    // Cria o container do item
    const storeItem = document.createElement("div");
    storeItem.className = "storeItem";
    storeItem.id = itemName;

    // Define o atributo onclick inicial
    storeItem.setAttribute("onclick", `buyItem('${itemName}', ${initialCost}, ${increment})`);

    // Cria o conteúdo do item
    storeItem.innerHTML = `
        <div class="itemInfo">
            <img src="./imgs/${itemName}.png" alt="${itemName}" width="75" height="75" draggable="false">
            <div class="itemNameCost">
                <h1>${itemName}</h1>
                <p id="${itemName}Cost">Cost: ${initialCost}</p>
            </div>
        </div>
        <p id="${itemName}Amount">Amount: 0</p>
    `;

    // Adiciona o item à loja
    document.querySelector(".storeItens").appendChild(storeItem);
}
function buyItem(itemName, cost, increment) {
    if (cookies >= cost) {
        cookies -= cost;
        cookiespersecond += increment;
        document.getElementById("cookiescount").innerText = "Cookies: " + cookies.toFixed(0);

        // Update the cost and increment dynamically
        let currentCost = parseFloat(document.getElementById(`${itemName}Cost`).innerText.split(": ")[1]);
        let currentAmount = parseInt(document.getElementById(`${itemName}Amount`).innerText.split(": ")[1]);

        currentCost = Math.ceil(currentCost * 1.1); // Increase cost exponentially and round up
        currentAmount += 1; // Increment the amount by 1

        document.getElementById(`${itemName}Cost`).innerText = `Cost: ${currentCost}`;
        document.getElementById(`${itemName}Amount`).innerText = `Amount: ${currentAmount}`;
        document.getElementById("cookiespersecond").innerText = "Cookies per second: " + cookiespersecond.toFixed(1);

        // Update the onclick attribute dynamically
        document.getElementById(itemName).setAttribute(
            "onclick",
            `buyItem('${itemName}', ${currentCost}, ${increment})`
        );
    } else {
        alert("Not enough cookies!");
    }
}
function updateCookiesPerSecond() {
    cookies += cookiespersecond;
    document.getElementById("cookiescount").innerText = "Cookies: " + Math.floor(cookies);
}
