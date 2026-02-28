// Tab switching functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        // Load chart data for specific tabs
        if (tabName === 'placement') loadPlacementDetailChart();
        if (tabName === 'category') loadCategoryChart();
        if (tabName === 'region') loadRegionChart();
    });
});

// Load Summary Data
async function loadSummary() {
    try {
        const response = await fetch('/api/summary');
        const data = await response.json();
        
        document.getElementById('total-transactions').textContent = data.total_transactions;
        document.getElementById('total-revenue').textContent = data.total_revenue;
        document.getElementById('avg-units').textContent = data.avg_units_sold;
        document.getElementById('total-categories').textContent = data.categories;
        
        loadPlacementChart();
    } catch (error) {
        console.error('Error loading summary:', error);
    }
}

// Load Placement Chart
async function loadPlacementChart() {
    try {
        const response = await fetch('/api/revenue-by-placement');
        const data = await response.json();
        
        const ctx = document.getElementById('placementChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Revenue ($)',
                    data: Object.values(data),
                    backgroundColor: '#667eea',
                    borderColor: '#764ba2',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#e2e8f0' }
                    }
                },
                scales: {
                    y: {
                        ticks: { color: '#a0aec0' },
                        grid: { color: '#4a5568' }
                    },
                    x: {
                        ticks: { color: '#a0aec0' },
                        grid: { color: '#4a5568' }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading placement chart:', error);
    }
}

// Load Placement Detail Chart
async function loadPlacementDetailChart() {
    try {
        const response = await fetch('/api/revenue-by-placement');
        const data = await response.json();
        
        const ctx = document.getElementById('placementDetailChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Revenue ($)',
                    data: Object.values(data),
                    backgroundColor: ['#667eea', '#764ba2', '#ed64a6']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#e2e8f0' }
                    }
                },
                scales: {
                    y: {
                        ticks: { color: '#a0aec0' },
                        grid: { color: '#4a5568' }
                    },
                    x: {
                        ticks: { color: '#a0aec0' },
                        grid: { color: '#4a5568' }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading placement detail chart:', error);
    }
}

// Load Category Chart
async function loadCategoryChart() {
    try {
        const response = await fetch('/api/revenue-by-category');
        const data = await response.json();
        
        const ctx = document.getElementById('categoryChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    data: Object.values(data),
                    backgroundColor: ['#667eea', '#764ba2'],
                    borderColor: '#1a202c',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#e2e8f0' }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading category chart:', error);
    }
}

// Load Region Chart
async function loadRegionChart() {
    try {
        const response = await fetch('/api/revenue-by-region');
        const data = await response.json();
        
        const ctx = document.getElementById('regionChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Revenue ($)',
                    data: Object.values(data),
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#e2e8f0' }
                    }
                },
                scales: {
                    y: {
                        ticks: { color: '#a0aec0' },
                        grid: { color: '#4a5568' }
                    },
                    x: {
                        ticks: { color: '#a0aec0' },
                        grid: { color: '#4a5568' }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading region chart:', error);
    }
}

// Load Data Table
document.getElementById('loadDataBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/raw-data');
        const data = await response.json();
        
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = '';
        
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.ProductName}</td>
                <td>${row.Category}</td>
                <td>${row.PlacementLocation}</td>
                <td>${row.RegionID}</td>
                <td>$${row.Revenue.toFixed(2)}</td>
                <td>${row.UnitsSold}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSummary();
});