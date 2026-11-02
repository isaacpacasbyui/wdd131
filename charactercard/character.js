const character = {
  name: "Aiden the Guardian",
  class: "Warrior",
  level: 1,
  health: 100,
  image: "images/character.jpg",

  attacked: function () {
    if (this.health === 0) {
      return `${this.name} has died. Reset to play again.`;
    }

    this.health = Math.max(0, this.health - 20);

    if (this.health === 0) {
      return `${this.name} has died. Reset to begin a new adventure.`;
    }

    return `${this.name} was attacked and lost 20 health points!`;
  },

  levelUp: function () {
    if (this.health === 0) {
      return `${this.name} cannot level up after dying.`;
    }

    this.level += 1;

    return `${this.name} reached level ${this.level}!`;
  }
};

// Select the HTML elements.
const card = document.querySelector(".card");
const nameElement = document.querySelector("#character-name");
const classElement = document.querySelector("#character-class");
const levelElement = document.querySelector("#character-level");
const healthElement = document.querySelector("#character-health");
const imageElement = document.querySelector("#character-image");
const healthBar = document.querySelector("#health-bar");
const messageElement = document.querySelector("#message");

const attackButton = document.querySelector("#attack-button");
const levelButton = document.querySelector("#level-button");
const resetButton = document.querySelector("#reset-button");

// Display the current object values.
function renderCharacter(message) {
  nameElement.textContent = character.name;
  classElement.textContent = character.class;
  levelElement.textContent = character.level;
  healthElement.textContent = character.health;

  imageElement.src = character.image;
  imageElement.alt = character.name;

  healthBar.value = character.health;
  healthBar.textContent = `${character.health}%`;
  messageElement.textContent = message;

  const isDead = character.health === 0;

  card.classList.toggle("is-dead", isDead);
  attackButton.disabled = isDead;
  levelButton.disabled = isDead;
}

// Call the object's methods when the buttons are clicked.
attackButton.addEventListener("click", function () {
  const message = character.attacked();
  renderCharacter(message);
});

levelButton.addEventListener("click", function () {
  const message = character.levelUp();
  renderCharacter(message);
});

// Restore the starting values.
resetButton.addEventListener("click", function () {
  character.level = 1;
  character.health = 100;

  renderCharacter("A new adventure begins!");
});

// Initial display.
renderCharacter("Ready for an adventure!");