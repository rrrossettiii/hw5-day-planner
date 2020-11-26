// Current Day Display;
setInterval(() => {
	$("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
}, 1000);

var currentHour = moment().get("hour");

var schedule = JSON.parse(localStorage.getItem("Work-Day"));
if (!schedule) {
	schedule = ["", "", "", "", "", "", "", "", ""];
}

// Document;
// =============:
$(document).ready(() => {
	blockUpdater();
	// Save Button;
	$(".saveBtn").on("click", function () {
		// - Description & Time values;
		var text = $(this).prev(".description").val();
		var time = $(this).parent().attr("id");
		schedule[time - 9] = text;
		// - Save to Local Storage;
		localStorage.setItem("Work-Day", JSON.stringify(schedule));
	});
});

function blockUpdater() {
	for (let i = 9; i <= 17; i++) {
		$(".timeBlocks").append(createTimeBlocks(i, currentHour, schedule));
	}
}

// Time BLock Builder;
// =============:
function createTimeBlocks(index, currentHour, schedule) {
	thisHour = index;
	tod = "AM";
	if (index > 12) {
		thisHour = index - 12;
	}
	if (index > 11) {
		tod = "PM";
	}
	// - Create time-block div;
	const timeBlock = document.createElement("section");
	timeBlock.classList.add("time-block", "row");
	timeBlock.setAttribute("id", index);
	// - Create hour
	const hour = document.createElement("div");
	hour.classList.add("col-md-1", "hour");
	hour.innerHTML = `${thisHour}:00 <small>${tod}</small>`;
	// - Create textarea;
	const text = document.createElement("textarea");
	text.classList.add("col-md-10", "description");
	text.innerHTML = schedule[index - 9];
	// - Create button;
	const button = document.createElement("button");
	button.classList.add("btn", "saveBtn", "col-md-1");
	button.innerHTML = `<img src="./assets/icons/save.ico" alt="Save Button" />`;
	// Determine present;
	if (index < currentHour) {
		timeBlock.classList.add("past");
	}
	if (index == currentHour) {
		timeBlock.classList.add("present");
	}
	if (index > currentHour) {
		timeBlock.classList.add("future");
	}
	// - Assemble;
	timeBlock.append(hour, text, button);
	return timeBlock;
}
