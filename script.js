document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('flexSwitchCheckChecked');
    const body = document.getElementById('bodyTheme');
    const table = document.getElementById('bodyTableTheme');
    const timerElement = document.getElementById('timer');
    // const countdownCircle = document.getElementById('countdownCircle');
    function applyTheme(theme) {
        body.className = theme + '-theme';
        table.className = 'table table-borderless table-striped ' + theme + '-theme';

        const tableCells = document.querySelectorAll('.fiat-crypto-table td, .fiat-crypto-table th');
        tableCells.forEach(cell => {
            cell.style.color = theme === 'light' ? 'black' : 'white';
            cell.style.backgroundColor = theme === 'light' ? '#f8f9fa' : '#191d28';
            cell.style.textAlign = 'center';
        });

        const tableHeaderCells = document.querySelectorAll('.fiat-crypto-table thead th');
        tableHeaderCells.forEach(cell => {
            cell.style.fontSize = '1.4rem';
            cell.style.color = 'grey';
        });
    }
    function startTimer() {
        let countdown = 60;

        function updateAndCheck() {
            timerElement.textContent = countdown;
            // const radius = (countdown / 5) * 50; // Adjust the radius calculation as needed
            // countdownCircle.setAttribute('r', radius);

            if (countdown === 0) {
                countdown = 60;
                startTimer();
            } else {
                countdown--;
                setTimeout(updateAndCheck, 1000);
            }
        }

        updateAndCheck();
    }

    // Call the startTimer function to initiate the countdown
    startTimer();

    themeSwitch.addEventListener('click', function () {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        applyTheme(newTheme);

        localStorage.setItem('theme', newTheme);
    });
    

    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    fetch('http://localhost:3000/api/cryptoData')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            populateTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));


        
});

function populateTable(data) {
    const tableBody = document.querySelector('.fiat-crypto-table tbody');

    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${item.name}</td>
            <td>${item.last}</td>
            <td>${item.buy} / ${item.sell}</td>
            <td>${item.volume}</td>
            <td>${item.base_unit}</td>
        `;

        tableBody.appendChild(row);
    });
}
