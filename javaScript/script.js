const calendar = document.getElementById('calendar');
    const eventsList = document.getElementById('events');
    const selectedDateEl = document.getElementById('selected-date');
    const eventInput = document.getElementById('event-input');

    const events = JSON.parse(localStorage.getItem('events')) || {};

    // Generate the calendar days
    const daysInMonth = 30; // Example for a month with 30 days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = document.createElement('div');
      day.classList.add('day');
      day.innerText = i;
      day.onclick = () => selectDate(i);
      calendar.appendChild(day);
    }

    let selectedDate = null;

    function selectDate(day) {
      selectedDate = day;
      document.querySelectorAll('.day').forEach(d => d.classList.remove('active'));
      document.querySelector(`.day:nth-child(${day})`).classList.add('active');
      selectedDateEl.innerText = `Events on Day ${day}`;
      updateEventList();
    }

    function updateEventList() {
      eventsList.innerHTML = '';
      if (events[selectedDate]) {
        events[selectedDate].forEach(event => {
          const li = document.createElement('li');
          li.innerText = event;
          eventsList.appendChild(li);
        });
      }
    }

    function addEvent() {
      if (!selectedDate) {
        alert('Please select a date first!');
        return;
      }

      const eventText = eventInput.value.trim();
      if (eventText === '') {
        alert('Event text cannot be empty!');
        return;
      }

      if (!events[selectedDate]) {
        events[selectedDate] = [];
      }
      events[selectedDate].push(eventText);

      localStorage.setItem('events', JSON.stringify(events));
      eventInput.value = '';
      updateEventList();
    }