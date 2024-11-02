// Function to load feedback from feedback.json (assuming a backend setup)
async function loadFeedback() {
    const response = await fetch('feedback.json');
    const feedbackData = await response.json();
    const feedbackList = document.getElementById('feedbackList');
    feedbackList.innerHTML = '';
    feedbackData.forEach(feedback => {
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');
        feedbackItem.innerHTML = `<strong>${feedback.name}:</strong> <p>${feedback.message}</p>`;
        feedbackList.appendChild(feedbackItem);
    });
}

// Function to submit feedback
document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const feedback = { name, message };

    // Append feedback to the JSON file (in practice, use an API endpoint)
    fetch('feedback.json', {
        method: 'POST', // For demonstration; will not work without a server
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedback)
    })
    .then(() => {
        alert('Feedback submitted successfully!');
        document.getElementById('feedbackForm').reset();
        loadFeedback(); // Reload feedback after submitting
    })
    .catch(error => console.error('Error:', error));
});

// Load feedback on page load
window.onload = loadFeedback;
