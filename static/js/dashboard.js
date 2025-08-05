let tempData =[];
let labels = [];

const ctx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: tempData,
                    borderColor: 'red',
                    fill: false
                }
            ]
        },
        options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

function updateTemperature() {
    fetch('/temperature')
    .then(response => response.json())
    .then(data => {
        console.log("Fetched data:", data);
        const now = new Date().toLocaleTimeString();
        if (labels.length > 5) {
            labels.shift();
            tempData.shift();
        }
        labels.push(now);
        tempData.push(data.temperature);

        lineChart.update();

        const temp = data.temperature;
        const safeTemp = data.safe_temperature;
        const runTime = data.run_time;
        const maxRun = data.max_run_time;
        document.getElementById("temp").innerText = temp + "°C";
        const status = document.getElementById("status");
        if (temp >= safeTemp) {
            status.innerText = "Overheating!";
            status.classList.add("overheat");
        } else {
            status.innerText = "Safe";
            status.classList.remove("overheat");
        }
        document.getElementById("limits").innerText =`Safe Temp Limit: ${safeTemp}°C, Max Runtime: ${maxRun} hrs`;
        document.getElementById("runtime").innerText =`Current Runtime: ${runTime.toFixed(2)} hrs`;
    });
}

setInterval(updateTemperature, 5000); // every 10 seconds
window.onload = updateTemperature;