let alarms = [];
let ringing = false;

const alarmInput = document.getElementById("alarmTimeInput");
const addBtn = document.getElementById("addAlarmBtn");
const listContainer = document.getElementById("alarmsListContainer");
const alarmCount = document.getElementById("alarmCount");
const modal = document.getElementById("alarmModal");
const modalTime = document.getElementById("modalAlarmTime");
const stopBtn = document.getElementById("stopRingBtn");

const alarmSound = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

/* CLOCK */
function updateClock() {
  const now = new Date();

  let hh = now.getHours();
  let mm = String(now.getMinutes()).padStart(2, '0');
  let ss = String(now.getSeconds()).padStart(2, '0');

  let ampm = hh >= 12 ? "PM" : "AM";
  hh = hh % 12 || 12;

  document.getElementById('liveClock').textContent = `${hh}:${mm}:${ss}`;
  document.getElementById('ampmBadge').textContent = ampm;

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  document.getElementById('weekdaySpan').textContent = days[now.getDay()];
  document.getElementById('dateSpan').textContent = now.toLocaleDateString();

  checkAlarms(now.getHours() + ":" + mm);
}

/* ADD ALARM */
function addAlarm() {
  const time = alarmInput.value;
  if (!time) return;

  if (alarms.includes(time)) {
    alert("Alarm already set!");
    return;
  }

  alarms.push(time);
  renderAlarms();
}

/* DISPLAY ALARMS */
function renderAlarms() {
  listContainer.innerHTML = "";

  if (alarms.length === 0) {
    listContainer.innerHTML = "No alarms yet";
    alarmCount.textContent = 0;
    return;
  }

  alarms.forEach((alarm, index) => {
    const div = document.createElement("div");
    div.className = "alarm-list-item";

    div.innerHTML = `
      <span>${alarm}</span>
      <button class="btn" onclick="deleteAlarm(${index})">Delete</button>
    `;

    listContainer.appendChild(div);
  });

  alarmCount.textContent = alarms.length;
}

/* DELETE ALARM */
function deleteAlarm(index) {
  alarms.splice(index, 1);
  renderAlarms();
}

/* CHECK ALARM */
function checkAlarms(currentTime) {
  if (alarms.includes(currentTime) && !ringing) {
    ringing = true;
    modal.classList.add("active");
    modalTime.textContent = currentTime;
    alarmSound.loop = true;
    alarmSound.play();
  }
}

/* STOP ALARM */
stopBtn.onclick = () => {
  modal.classList.remove("active");
  alarmSound.pause();
  alarmSound.currentTime = 0;
  ringing = false;
};

/* CLEAR ALL */
document.getElementById("clearAllAlarms").onclick = () => {
  alarms = [];
  renderAlarms();
};

/* EVENTS */
addBtn.onclick = addAlarm;

/* START CLOCK */
setInterval(updateClock, 1000);
updateClock();