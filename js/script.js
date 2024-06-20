// Seleção dos elementos HTML
const pokemonNameElement = document.querySelector('.pokemon__name');
const pokemonNumberElement = document.querySelector('.pokemon__number');
const pokemonImageElement = document.querySelector('.pokemon__image');
const formElement = document.querySelector('.form');
const inputElement = document.querySelector('.input__search');
const buttonPrevElement = document.querySelector('.btn-prev');
const buttonNextElement = document.querySelector('.btn-next');

// Variável para armazenar o número do Pokémon atual
let currentPokemonId = 1;

// Função assíncrona para buscar dados de um Pokémon na API
const fetchPokemon = async (pokemonId) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    return null;
  }
}

// Função assíncrona para renderizar os dados de um Pokémon na tela
const renderPokemon = async (pokemonId) => {
  // Limpa os campos e prepara para o carregamento
  pokemonNameElement.textContent = 'Loading...';
  pokemonNumberElement.textContent = '';
  pokemonImageElement.src = ''; // Limpa a imagem anterior

  try {
    const pokemonData = await fetchPokemon(pokemonId);

    if (pokemonData) {
      // Atualiza os elementos com os dados do Pokémon
      pokemonImageElement.style.display = 'block';
      pokemonNameElement.textContent = pokemonData.name;
      pokemonNumberElement.textContent = pokemonData.id;
      pokemonImageElement.src = pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default;
      inputElement.value = '';
      currentPokemonId = pokemonData.id;
    } else {
      // Exibe mensagem de Pokémon não encontrado
      pokemonImageElement.style.display = 'none';
      pokemonNameElement.textContent = 'Not found :c';
    }
  } catch (error) {
    // Exibe mensagem de erro em caso de falha na requisição
    console.error('Error rendering Pokemon:', error);
    pokemonNameElement.textContent = 'Error :(';
  }
}

// Event listener para o formulário de busca
formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = inputElement.value.trim().toLowerCase();
  if (searchTerm) {
    // Verifica se o termo de busca é um número ou um nome válido de Pokémon
    const pokemonId = isNaN(searchTerm) ? searchTerm : parseInt(searchTerm);
    renderPokemon(pokemonId);
  }
});

// Event listener para o botão de navegação "Prev"
buttonPrevElement.addEventListener('click', () => {
  if (currentPokemonId > 1) {
    renderPokemon(currentPokemonId - 1);
  }
});

// Event listener para o botão de navegação "Next"
buttonNextElement.addEventListener('click', () => {
  renderPokemon(currentPokemonId + 1);
});

// Inicializar renderização do primeiro Pokémon ao carregar a página
renderPokemon(currentPokemonId);
