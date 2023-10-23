///// RADAR CHART /////

Chart.defaults.font.size = 15;
const ctx = document.getElementById('myChart').getContext('2d');

console.log("Script is running!")

// Datas
const pentagramData = [1.5, 0, 7, 7, 0];
const maxData = [14, 14, 14, 14, 14];
const initialData = [7, 7, 7, 7, 7];

const coffee = [0.04, 3.59, 9.02, 4.98, 0];
const appleCider = [0.3, 5, 10.5, 3.5, 0];
const chickenStock = [0.98, 4, 7.8, 6.2, 0];

const radar_labels = [
    "Salinity (ppm)",
    "Sweet (°Bx)",
    "Sour (pH)",
    "Bitter (pH)",
    "Spiciness (SHU)"
];

//Create our own chart
const myChart = new Chart('myChart', {
    type: 'radar',
    data: {
        labels: radar_labels,
        datasets: [
        //     {
        //     label: 'Flavor Profile',
        //     data: initialData,
        //     fill: true,
        //     pointBackgroundColor: 'blue', // Customize the color for the pentagram points
        //     borderColor: 'blue', // Customize the color for the pentagram lines
        //     borderWidth: 2, // Customize the line width for the pentagram lines
        //     fill: true, // Fill the area inside the pentagram
        //     backgroundColor: 'rgba(0, 0, 255, 0)', // Customize the fill color
        //     pointRadius: 5, // Customize the point radius for the pentagram points
        // },
        {
            label: 'Coffee',
            data: coffee,
            fill: true,
            pointBackgroundColor: 'blue', // Customize the color for the pentagram points
            borderColor: 'blue', // Customize the color for the pentagram lines
            borderWidth: 3, // Customize the line width for the pentagram lines
            fill: true, // Fill the area inside the pentagram
            backgroundColor: 'rgba(0, 0, 255, 0)', // Customize the fill color
            pointRadius: 3, // Customize the point radius for the pentagram points
        },
        {
            label: 'Apple Cider',
            data: appleCider,
            fill: true,
            pointBackgroundColor: 'red', // Customize the color for the pentagram points
            borderColor: 'red', // Customize the color for the pentagram lines
            borderWidth: 3, // Customize the line width for the pentagram lines
            fill: true, // Fill the area inside the pentagram
            backgroundColor: 'rgba(255, 0, 0, 0)', // Customize the fill color
            pointRadius: 3, // Customize the point radius for the pentagram points
        },
        {
            label: 'Chicken Stock',
            data: chickenStock,
            fill: true,
            pointBackgroundColor: 'green', // Customize the color for the pentagram points
            borderColor: 'green', // Customize the color for the pentagram lines
            borderWidth: 3, // Customize the line width for the pentagram lines
            fill: true, // Fill the area inside the pentagram
            backgroundColor: 'rgba(0, 255, 0, 0)', // Customize the fill color
            pointRadius: 3, // Customize the point radius for the pentagram points
        },
        {
            label: 'Compared To',
            data: maxData,
            backgroundColor: 'rgba(255,100,100, 0.1)',
            borderColor: 'rgb(255, 99, 132)',
            borderColor: '#000',
            borderDash: [1, 10],
        },
         {
            label: 'Neutral (distilled water)',
            data: pentagramData,
            backgroundColor: 'rgba(255, 231, 71, 0.3)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgba(255, 231, 71, 0.3)',
            borderColor: '#000',
            borderDash: [2, 10],
            pointHoverBackgroundColor: 'ff5733',
        },

        ]
    },
    options: {
        scales: {
            r: {
                suggestedMin: 0,
                //suggestedMax: 14,
                 ticks: {
                    display: false, // Hide the scale number labels
                },
            }
        },
        elements: {
            pointLabels: {
                fontSize: 20, // Adjust the font size as needed
            },
        },
    }
});

console.log(myChart.data.datasets[0])


//update radar chart with arduino data
function updateRadarChart(newData) {
    if (newData && newData.length === radar_labels.length) {
        myChart.data.datasets[0].data = newData;
        myChart.update();
    } else {
        console.error('Invalid data format:', newData);
    }
}

//Listen for updates from the server
var socket = io();
socket.on('data', function (data) {
    try {
        const parsedData = JSON.parse(data);
        //update radar chart with the new data
        updateRadarChart(parsedData);
    } catch (error) {
        console.error('Error parsing data: ', error);
    }
});