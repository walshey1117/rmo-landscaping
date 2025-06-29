// State management
let stories = [];
let epics = [];

// DOM Elements
const board = document.querySelector('.board');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');
const epicFilter = document.getElementById('epicFilter');
const priorityFilter = document.getElementById('priorityFilter');
const statusChange = document.getElementById('status-change');
const saveStatus = document.getElementById('save-status');

// Initialize the board
async function initializeBoard() {
    try {
        const response = await fetch('stories.json');
        const data = await response.json();
        epics = data.epics;
        stories = epics.reduce((acc, epic) => [...acc, ...epic.stories], []);
        
        // Initialize filters
        initializeFilters();
        
        // Render initial board
        renderBoard();
    } catch (error) {
        console.error('Error loading stories:', error);
    }
}

// Initialize filters
function initializeFilters() {
    // Add epic options
    epics.forEach(epic => {
        const option = document.createElement('option');
        option.value = epic.id;
        option.textContent = epic.title;
        epicFilter.appendChild(option);
    });

    // Add event listeners
    epicFilter.addEventListener('change', renderBoard);
    priorityFilter.addEventListener('change', renderBoard);
}

// Render the board
function renderBoard() {
    const columns = {
        'todo': document.querySelector('#todo .story-list'),
        'in-progress': document.querySelector('#in-progress .story-list'),
        'blocked': document.querySelector('#blocked .story-list'),
        'complete': document.querySelector('#complete .story-list')
    };

    // Clear existing cards
    Object.values(columns).forEach(column => column.innerHTML = '');

    // Filter stories
    let filteredStories = [...stories];
    
    if (epicFilter.value !== 'all') {
        filteredStories = filteredStories.filter(story => story.id.startsWith(epicFilter.value));
    }
    
    if (priorityFilter.value !== 'all') {
        filteredStories = filteredStories.filter(story => story.priority === priorityFilter.value);
    }

    // Render filtered stories
    filteredStories.forEach(story => {
        const card = createStoryCard(story);
        const column = story.status.replace('in-progress', 'in-progress');
        columns[column].appendChild(card);
    });
}

// Create a story card
function createStoryCard(story) {
    const card = document.createElement('div');
    card.className = `story-card priority-${story.priority}`;
    card.innerHTML = `
        <div class="story-header">
            <span class="story-id">${story.id}</span>
            <span class="story-points">${story.points} points</span>
        </div>
        <div class="story-title">${story.title}</div>
    `;

    card.addEventListener('click', () => showStoryDetails(story));
    return card;
}

// Show story details in modal
function showStoryDetails(story) {
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalAcceptance = document.getElementById('modal-acceptance');

    modalTitle.textContent = `${story.id}: ${story.title}`;
    modalDescription.innerHTML = `
        <p><strong>Description:</strong></p>
        <p>${story.description}</p>
        <p><strong>Priority:</strong> ${story.priority}</p>
        <p><strong>Points:</strong> ${story.points}</p>
    `;

    modalAcceptance.innerHTML = `
        <p><strong>Acceptance Criteria:</strong></p>
        <ul class="acceptance-list">
            ${story.acceptance.map(criteria => `<li class="acceptance-item">${criteria}</li>`).join('')}
        </ul>
    `;

    statusChange.value = story.status;
    saveStatus.onclick = () => updateStoryStatus(story, statusChange.value);

    modal.style.display = 'block';
}

// Update story status
function updateStoryStatus(story, newStatus) {
    story.status = newStatus;
    modal.style.display = 'none';
    renderBoard();
    
    // In a real application, you would save this to a backend
    console.log(`Updated ${story.id} status to ${newStatus}`);
}

// Close modal
closeModal.onclick = () => {
    modal.style.display = 'none';
};

// Close modal when clicking outside
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Initialize the board when the page loads
document.addEventListener('DOMContentLoaded', initializeBoard);
