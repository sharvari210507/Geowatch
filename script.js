document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('incidentForm');
    const alertsDiv = document.getElementById('localAlerts');

    // Sample initial alerts (simulating existing local issues)
    let alerts = [
        { type: 'Suspicious Activity', details: 'Unattended bag reported near main gate.', location: '490m away', time: new Date().toLocaleTimeString() },
        { type: 'Road Hazard', details: 'Large pothole on main thoroughfare, right lane.', location: '150m away', time: new Date(Date.now() - 600000).toLocaleTimeString() } // 10 minutes ago
    ];

    function renderAlerts() {
        alertsDiv.innerHTML = ''; // Clear existing alerts
        
        if (alerts.length === 0) {
            alertsDiv.innerHTML = '<p>No active alerts in your 500m radius. Stay safe!</p>';
            return;
        }

        alerts.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'alert-item';
            
            itemDiv.innerHTML = `
                <h3>🚨 ${item.type}</h3>
                <p><strong>Details:</strong> ${item.details}</p>
                <p><strong>Proximity:</strong> ${item.location} | **Reported At:** ${item.time}</p>
                <small>Alert verified and posted to local community.</small>
            `;
            alertsDiv.appendChild(itemDiv);
        });
    }

    // Handle form submission (reporting a new incident)
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const incidentType = document.getElementById('incidentType').value.trim();
        const details = document.getElementById('details').value.trim();
        const reporterID = document.getElementById('reporterID').value.trim(); 

        if (!incidentType || !details) {
            alert('Please select an incident type and provide details.');
            return;
        }

        // --- SECURITY SIMULATION STEP ---
        console.log(`Report received from ${reporterID} for ${incidentType}`);
        // In a real app, this would be authenticated, geotagged, and sent to the server.
        // ---------------------------------
        
        // SIMULATION: Create a new alert and add it to the local display
        const newAlert = {
            type: incidentType,
            details: details,
            location: 'JUST NOW (Simulated 50m away)', 
            time: new Date().toLocaleTimeString()
        };

        alerts.unshift(newAlert); // Add to the beginning
        renderAlerts();

        form.reset();
        document.getElementById('reporterID').value = "USER_947_VERIFIED"; 
        alert(`Your ${incidentType} report has been submitted for verification and hyper-localized alert distribution.`);
    });

    // Initial render when the page loads
    renderAlerts();
});