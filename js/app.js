var ptsMulti = 0;
var ptsMultiLogro = 74;
var puntosMulti = document.getElementById("puntosMulti");
var movimientosMulti = document.getElementById("movimientosMulti");
var movimientosMultiLogro = document.getElementById("movimientosMultiLogro");
var logrosCard = document.getElementById("logrosCard");
var monedasClasificacion1icono = document.getElementById("monedasClasificacion1icono");
var monedasClasificacion2icono = document.getElementById("monedasClasificacion2icono");
var monedasClasificacion1nombre = document.getElementById("monedasClasificacion1nombre");
var monedasClasificacion2nombre = document.getElementById("monedasClasificacion2nombre");
var monedasClasificacion1logros = document.getElementById("monedasClasificacion1logros");
var monedasClasificacion2logros = document.getElementById("monedasClasificacion2logros");
var monedasClasificacion1monedas = document.getElementById("monedasClasificacion1monedas");
var monedasClasificacion2monedas = document.getElementById("monedasClasificacion2monedas");
var monedasClasificacion1diamantes = document.getElementById("monedasClasificacion1diamantes");
var monedasClasificacion2diamantes = document.getElementById("monedasClasificacion2diamantes");
var monedasClasificacion1puntos = document.getElementById("monedasClasificacion1puntos");
var monedasClasificacion2puntos = document.getElementById("monedasClasificacion2puntos");

const mapData = {
    minX: 1,
    maxX: 14,
    minY: 4,
    maxY: 12,
    blockedSpaces: {
      "7x4": true,
      "1x11": true,
      "12x10": true,
      "4x7": true,
      "5x7": true,
      "6x7": true,
      "8x6": true,
      "9x6": true,
      "10x6": true,
      "7x9": true,
      "8x9": true,
      "9x9": true,
    },
  };

  window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
  
  // Options for Player Colors... these are in the same order as our sprite sheet
  const playerColors = ["blue", "red", "orange", "yellow", "green", "purple"];
  
  //Misc Helpers
  function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  function getKeyString(x, y) {
    return `${x}x${y}`;
  }
  
  function createName() {
    const nombre = randomFromArray([
      "Alex",
      "Miky",
      "Galanillo",
      "Juan",
      "Chechu",
    ]);
    return `${nombre}`;
  }
  
  function isSolid(x,y) {
  
    const blockedNextSpace = mapData.blockedSpaces[getKeyString(x, y)];
    return (
      blockedNextSpace ||
      x >= mapData.maxX ||
      x < mapData.minX ||
      y >= mapData.maxY ||
      y < mapData.minY
    )
  }
  
  function getRandomSafeSpot() {
    //We don't look things up by key here, so just return an x/y
    return randomFromArray([
      { x: 2, y: 4 },
      { x: 1, y: 5 },
      { x: 2, y: 6 },
      { x: 2, y: 8 },
      { x: 2, y: 9 },
      { x: 5, y: 5 },
      { x: 5, y: 8 },
      { x: 5, y: 10 },
      { x: 5, y: 11 },
      { x: 11, y: 7 },
      { x: 13, y: 6 },
      { x: 13, y: 8 },
      { x: 7, y: 6 },
      { x: 7, y: 7 },
      { x: 7, y: 8 },
      { x: 10, y: 8 },
      { x: 11, y: 4 },
    ]);
  }

  function getRandomSafeSpotDiamond() {
    //We don't look things up by key here, so just return an x/y
    return randomFromArray([
      { x: 1, y: 4 },
      { x: 4, y: 8 },
      { x: 12, y: 7 },
      { x: 13, y: 7 },
      { x: 8, y: 8 },
    ]);
  }
  
  
  (function () {
  
    let playerId;
    let playerRef;
    let players = {};
    let playerElements = {};
    let coins = {};
    let diamonds = {};
    let points = {};
    let coinElements = {};
    let diamondElements = {};
  
    const gameContainer = document.querySelector(".game-container");
    const playerNameInput = document.querySelector("#player-name");
    const playerColorButton = document.querySelector("#player-color");
  
  
    function placeCoin() {
      const { x, y } = getRandomSafeSpot();
      const coinRef = firebase.database().ref(`coins/${getKeyString(x, y)}`);
      coinRef.set({
        x,
        y,
      })
  
      const coinTimeouts = [2000, 3000, 4000, 5000];
      setTimeout(() => {
        placeCoin();
      }, randomFromArray(coinTimeouts));
    }

    function placeDiamond() {
      const { x, y } = getRandomSafeSpotDiamond();
      const diamondRef = firebase.database().ref(`diamonds/${getKeyString(x, y)}`);
      diamondRef.set({
        x,
        y,
      })
  
      const diamondTimeouts = [5000, 7000, 8000, 9000];
      setTimeout(() => {
        placeDiamond();
      }, randomFromArray(diamondTimeouts));
    }
  
    function attemptGrabCoin(x, y) {
      const key = getKeyString(x, y);
      if (coins[key]) {
        // Remove this key from data, then uptick Player's coin count
        firebase.database().ref(`coins/${key}`).remove();
        playerRef.update({
          coins: players[playerId].coins + 1,
          points: players[playerId].points + 1,
        })
        ptsMulti++;
        if (ptsMultiLogro < 99) {ptsMultiLogro++;}
        else { logrosCard.innerHTML= `2`;
          ptsMultiLogro=100; document.getElementById("multiLogro").className = "bi bi-check text-primary";}
        puntosMulti.innerHTML= `<h2>Puntos: ${players[playerId].points}<h2>`;
        movimientosMulti.innerHTML += `<i>· ${players[playerId].name} ha conseguido una moneda, recibe 1 pts.</i></br>`
        movimientosMulti.scrollTop = movimientosMulti.scrollHeight;
        movimientosMultiLogro.innerHTML = `${ptsMultiLogro}`;
      }
    }

    function attemptGrabDiamond(x, y) {
      const key = getKeyString(x, y);
      if (diamonds[key]) {
        // Remove this key from data, then uptick Player's coin count
        firebase.database().ref(`diamonds/${key}`).remove();
        playerRef.update({
          diamonds: players[playerId].diamonds + 1,
          points: players[playerId].points + 3,
        })
        puntosMulti.innerHTML= `<h2>Puntos: ${players[playerId].points}<h2>`;
        movimientosMulti.innerHTML += `<i>· ${players[playerId].name} ha conseguido un diamante, recibe 3 pts.</i></br>`
        movimientosMulti.scrollTop = movimientosMulti.scrollHeight;
      }
    }
  
  
    function handleArrowPress(xChange=0, yChange=0) {
      const newX = players[playerId].x + xChange;
      const newY = players[playerId].y + yChange;
      if (!isSolid(newX, newY)) {
        //move to the next space
        players[playerId].x = newX;
        players[playerId].y = newY;
        if (xChange === 1) {
          players[playerId].direction = "right";
        }
        if (xChange === -1) {
          players[playerId].direction = "left";
        }
        playerRef.set(players[playerId]);
        attemptGrabCoin(newX, newY);
        attemptGrabDiamond(newX, newY);
      }
    }
  
    function initGame() {
  
      new KeyPressListener("ArrowUp", () => handleArrowPress(0, -1))
      new KeyPressListener("ArrowDown", () => handleArrowPress(0, 1))
      new KeyPressListener("ArrowLeft", () => handleArrowPress(-1, 0))
      new KeyPressListener("ArrowRight", () => handleArrowPress(1, 0))
  
      const allPlayersRef = firebase.database().ref(`players`);
      const allCoinsRef = firebase.database().ref(`coins`);
      const allDiamondsRef = firebase.database().ref(`diamonds`);
  
      allPlayersRef.on("value", (snapshot) => {
        //Fires whenever a change occurs
        players = snapshot.val() || {};
        monedasClasificacion1icono.innerHTML = `<img src="https://img.icons8.com/color/36/000000/guest-male.png" alt="image">`;
            monedasClasificacion1nombre.innerHTML = `${players[playerId].name}`;
            monedasClasificacion1logros.innerHTML = `<div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"> </div>
          </div>`;
            monedasClasificacion1monedas.innerHTML = `${players[playerId].coins}`;
            monedasClasificacion1diamantes.innerHTML = `${players[playerId].diamonds}`;
            monedasClasificacion1puntos.innerHTML = `${players[playerId].points}`;
        Object.keys(players).forEach((key) => {
          const characterState = players[key];
          let el = playerElements[key];
          if(playerId != key){ if( players[key].points > players[playerId].points ){
            monedasClasificacion1icono.innerHTML = `<img src="https://img.icons8.com/color/36/000000/person-male.png" alt="image">`;
            monedasClasificacion1nombre.innerHTML = `${players[key].name}`;
            monedasClasificacion1logros.innerHTML = `<div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"> </div>
          </div>`;
            monedasClasificacion1monedas.innerHTML = `${players[key].coins}`;
            monedasClasificacion1diamantes.innerHTML = `${players[key].diamonds}`;
            monedasClasificacion1puntos.innerHTML = `${players[key].points}`;

            monedasClasificacion2icono.innerHTML = `<img src="https://img.icons8.com/color/36/000000/guest-male.png" alt="image">`;
            monedasClasificacion2nombre.innerHTML = `${players[playerId].name}`;
            monedasClasificacion2logros.innerHTML = `<div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"> </div>
          </div>`;
          monedasClasificacion2monedas.innerHTML = `${players[playerId].coins}`;
          monedasClasificacion2diamantes.innerHTML = `${players[playerId].diamonds}`;
          monedasClasificacion2puntos.innerHTML = `${players[playerId].points}`;}
            else{
            monedasClasificacion1icono.innerHTML = `<img src="https://img.icons8.com/color/36/000000/guest-male.png" alt="image">`;
            monedasClasificacion1nombre.innerHTML = `${players[playerId].name}`;
            monedasClasificacion1logros.innerHTML = `<div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"> </div>
          </div>`;
            monedasClasificacion1monedas.innerHTML = `${players[playerId].coins}`;
            monedasClasificacion1diamantes.innerHTML = `${players[playerId].diamonds}`;
            monedasClasificacion1puntos.innerHTML = `${players[playerId].points}`;

            monedasClasificacion2icono.innerHTML = `<img src="https://img.icons8.com/color/36/000000/person-male.png" alt="image">`;
            monedasClasificacion2nombre.innerHTML = `${players[key].name}`;
            monedasClasificacion2logros.innerHTML = `<div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"> </div>
          </div>`;
            monedasClasificacion2monedas.innerHTML = `${players[key].coins}`;
            monedasClasificacion2diamantes.innerHTML = `${players[key].diamonds}`;
            monedasClasificacion2puntos.innerHTML = `${players[key].points}`;
            }}
        
          
          // Now update the DOM
          el.querySelector(".Character_name").innerText = characterState.name;
          el.querySelector(".Character_coins").innerText = characterState.points;
          el.setAttribute("data-color", characterState.color);
          el.setAttribute("data-direction", characterState.direction);
          const left = 16 * characterState.x + "px";
          const top = 16 * characterState.y - 4 + "px";
          el.style.transform = `translate3d(${left}, ${top}, 0)`;
        })
      })
      allPlayersRef.on("child_added", (snapshot) => {
        //Fires whenever a new node is added the tree
        const addedPlayer = snapshot.val();
        const characterElement = document.createElement("div");
        characterElement.classList.add("Character", "grid-cell");
        if (addedPlayer.id === playerId) {
          characterElement.classList.add("you");
        }
        characterElement.innerHTML = (`
          <div class="Character_shadow grid-cell"></div>
          <div class="Character_sprite grid-cell"></div>
          <div class="Character_name-container">
            <span class="Character_name"></span>
            <span class="Character_coins">0</span>
          </div>
          <div class="Character_you-arrow"></div>
        `);
        playerElements[addedPlayer.id] = characterElement;
  
        //Fill in some initial state
        characterElement.querySelector(".Character_name").innerText = addedPlayer.name;
        characterElement.querySelector(".Character_coins").innerText = addedPlayer.points;
        characterElement.setAttribute("data-color", addedPlayer.color);
        characterElement.setAttribute("data-direction", addedPlayer.direction);
        const left = 16 * addedPlayer.x + "px";
        const top = 16 * addedPlayer.y - 4 + "px";
        characterElement.style.transform = `translate3d(${left}, ${top}, 0)`;
        gameContainer.appendChild(characterElement);
      })
  
      //Remove character DOM element after they leave
      allPlayersRef.on("child_removed", (snapshot) => {
        const removedKey = snapshot.val().id;
        gameContainer.removeChild(playerElements[removedKey]);
        delete playerElements[removedKey];
      })
  
  
      allCoinsRef.on("child_added", (snapshot) => {
        const coin = snapshot.val();
        const key = getKeyString(coin.x, coin.y);
        coins[key] = true;
  
        // Create the DOM Element
        const coinElement = document.createElement("div");
        coinElement.classList.add("Coin", "grid-cell");
        coinElement.innerHTML = `
          <div class="Coin_shadow grid-cell"></div>
          <div class="Coin_sprite grid-cell"></div>
        `;
  
        // Position the Element
        const left = 16 * coin.x + "px";
        const top = 16 * coin.y - 4 + "px";
        coinElement.style.transform = `translate3d(${left}, ${top}, 0)`;
  
        // Keep a reference for removal later and add to DOM
        coinElements[key] = coinElement;
        gameContainer.appendChild(coinElement);
      })

      allDiamondsRef.on("child_added", (snapshot) => {
        const diamond = snapshot.val();
        const key = getKeyString(diamond.x, diamond.y);
        diamonds[key] = true;
  
        // Create the DOM Element
        const diamondElement = document.createElement("div");
        diamondElement.classList.add("Diamond", "grid-cell");
        diamondElement.innerHTML = `
          <div class="Diamond_shadow grid-cell"></div>
          <div class="Diamond_sprite grid-cell"></div>
        `;
        
        // Position the Element
        const left = 16 * diamond.x + "px";
        const top = 16 * diamond.y - 4 + "px";
        diamondElement.style.transform = `translate3d(${left}, ${top}, 0)`;
  
        // Keep a reference for removal later and add to DOM
        diamondElements[key] = diamondElement;
        gameContainer.appendChild(diamondElement);
      })

      allCoinsRef.on("child_removed", (snapshot) => {
        const {x,y} = snapshot.val();
        const keyToRemove = getKeyString(x,y);
        gameContainer.removeChild( coinElements[keyToRemove] );
        delete coinElements[keyToRemove];
      })

      allDiamondsRef.on("child_removed", (snapshot) => {
        const {x,y} = snapshot.val();
        const keyToRemove = getKeyString(x,y);
        gameContainer.removeChild( diamondElements[keyToRemove] );
        delete diamondElements[keyToRemove];
      })
  
  
      //Updates player name with text input
      playerNameInput.addEventListener("change", (e) => {
        const newName = e.target.value || createName();
        playerNameInput.value = newName;
        playerRef.update({
          name: newName
        })
      })
  
      //Update player color on button click
      playerColorButton.addEventListener("click", () => {
        const mySkinIndex = playerColors.indexOf(players[playerId].color);
        const nextColor = playerColors[mySkinIndex + 1] || playerColors[0];
        playerRef.update({
          color: nextColor
        })
      })
  
      //Place my first coin
      placeCoin();

      placeDiamond();
  
    }
  
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        //You're logged in!
        playerId = user.uid;
        playerRef = firebase.database().ref(`players/${playerId}`);
  
        const name = createName();
        playerNameInput.value = name;
  
        const {x, y} = getRandomSafeSpot();
  
  
        playerRef.set({
          id: playerId,
          name,
          direction: "right",
          color: randomFromArray(playerColors),
          x,
          y,
          coins: 0,
          diamonds: 0,
          points: 0,
        })
  
        //Remove me from Firebase when I diconnect
        playerRef.onDisconnect().remove();
  
        //Begin the game now that we are signed in
        initGame();
      } else {
        //You're logged out.
      }
    })
  
    firebase.auth().signInAnonymously().catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage);
    });
  
  
  })();