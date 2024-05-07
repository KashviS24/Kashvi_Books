let isDragging = false;

// Make images draggable
document.querySelectorAll('.draggable-note-1').forEach(function(image) {
    makeDraggable(image);
});

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;
    element.onmouseup = function() { isDragging = false; };

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        isDragging = true;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

const timeZone1 = "America/New_York";
const timeZone2 = "Asia/Kolkata";

// Initialize the clock with the first time zone
let currentTimeZone = timeZone1;
rotateClockHands(currentTimeZone);

// Add click event listener to the clock
const clock = document.getElementById("clock");
clock.addEventListener('click', function() {
    // Toggle between time zones
    currentTimeZone = (currentTimeZone === timeZone1) ? timeZone2 : timeZone1;

    // Rotate clock hands based on the new time zone
    rotateClockHands(currentTimeZone);

    // Toggle background color
    toggleBackgroundColor(currentTimeZone);
});

// Function to rotate clock hands based on time zone
function rotateClockHands(timeZone) {
    const now = new Date();
    const options = { timeZone: timeZone };

    const hour = now.toLocaleString('en-US', { hour: 'numeric', hour12: false, ...options }) % 12;
    const minute = now.toLocaleString('en-US', { minute: 'numeric', ...options });
    const second = now.toLocaleString('en-US', { second: 'numeric', ...options });

    const hourHand = document.getElementById("hour-hand");
    const minuteHand = document.getElementById("minute-hand");
    const secondHand = document.getElementById("second-hand");

    // Calculate angles for rotation
    const hourAngle = (hour * 30) + (0.5 * minute); // 30 degrees per hour, 0.5 degrees per minute
    const minuteAngle = (minute * 6) + (0.1 * second); // 6 degrees per minute, 0.1 degrees per second
    const secondAngle = second * 6; // 6 degrees per second

    // Apply rotation using CSS transform property
    hourHand.style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
    secondHand.style.transform = `translate(-50%, -100%) rotate(${secondAngle}deg)`;
}

// Function to toggle background color based on time zone
function toggleBackgroundColor(timeZone) {
    const backgroundColor = (timeZone === timeZone1) ? '#7975A3' : '#FFB23F';
    clock.style.transition = 'background-color 0.5s ease';
    clock.style.backgroundColor = backgroundColor;
}

const myHome = document.getElementById("myHome");

// Add click event listener
myHome.addEventListener('click', function() {
    window.location.href = "index.html";
});


// Call the function to update background color initially
updateBackgroundColor();

// Update background color every minute
setInterval(updateBackgroundColor, 60000);