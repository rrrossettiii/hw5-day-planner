// Current Day Display;
setInterval(() => {
	$("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
}, 1000);

var schedule = JSON.parse(localStorage.getItem("day-planner"));
if (!schedule) {
	schedule = ["", "", "", "", "", "", "", "", ""];
}

// Save Button;
$(".saveBtn").on("click", function () {
	// - Description & Time values;
	var text = $(this).siblings(".description").val();
	var time = $(this).parent().attr("id");
	// - Save to Local Storage;
	localStorage.setItem(time, text);
});

// Document;
// =============:
$(document).ready(() => {
	blockUpdater();
});

function blockUpdater() {
	for (let i = 9; i <= 17; i++) {
		$(".timeBlocks").append(createTimeBlocks(i));
	}
}

function createTimeBlocks(index) {
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
	timeBlock.classList.add(`hour-${index}`, "time-block", "row");
	// - Create hour
	const hour = document.createElement("div");
	hour.classList.add("col-md-1", "hour");
	hour.innerHTML = `${thisHour}:00 <small>${tod}</small>`;
	// - Create textarea;
	const text = document.createElement("textarea");
	text.classList.add("col-md-10", "description");
	// - Create button;
	const button = document.createElement("button");
	button.classList.add("btn", "saveBtn", "col-md-1");
	button.innerHTML = "Save";
	// - Assemble;
	timeBlock.append(hour, text, button);
	return timeBlock;
}
