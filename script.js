const sectionsArr = [
	{
		id: "welcome",
		location: "sections/welcome.html"
	},
	{
		id: "about",
		location: "sections/about.html"
	},
	{
		id: "projects",
		location: "sections/projects.html"
	},
	{
		id: "contact",
		location: "sections/contact.html"
	},
];

// Refers to the id/class of the content section container to be updated
const sectionContent = "#content";

const defaultValues = {
	section: "welcome"
};

const selectNavButton = (id) => {
	$(".nav-buttons").removeClass("nav-selected");
	$("#" + id).addClass("nav-selected");	
};

// Store the root title at init then append section
const storedTitle = document.title;

const updateTitle = (id) => {
	var sectionTitle = $("#" + id).text();
	document.title = `${storedTitle} | ${sectionTitle}`;
};

const updateURLKey = (key, target) => {
	var currentURLKeys = new URLSearchParams(window.location.search);

	if (currentURLKeys.get(key) != target) {
		currentURLKeys.set(key, target);
		window.history.pushState(null, "", "?" + currentURLKeys);
	}
};

const fetchAndSetSection = (location, target) => {
	$(target).animate({ opacity: 0 }, 500, function() {
		$.get(location, function(data) {
			$(target).html(data);
			$(target).animate({ opacity: 1 }, 500);
		});
	});
};

const updateSection = (id, target) => {
	sectionsArr.forEach(element => {
		if (element.id == id) {
			selectNavButton(id);
			updateTitle(id);
			fetchAndSetSection(element.location, target);
		}
	});
};

const loadSection = () => {
	var currentURLKeys = new URLSearchParams(window.location.search);
	var currentSection = currentURLKeys.get("section");

	// Add default section key to URL if not provided
	if (currentSection === null) {
		currentSection = defaultValues.section;
		currentURLKeys.set("section", currentSection);
		window.history.replaceState(null, "", "?" + currentURLKeys);
	}

	updateSection(currentSection, sectionContent);
};

// To prevent refreshing the section unnecessarily when navigating history
var storedCurrentSection;

// Listens for history state pushes and navigations
window.addEventListener("popstate", (event) => {
	var currentURLKeys = new URLSearchParams(window.location.search);
	var currentSection = currentURLKeys.get("section");

	if (storedCurrentSection != currentSection) {
		storedCurrentSection = currentSection;
		updateSection(currentURLKeys.get("section"), sectionContent);
	}
});

$(document).ready(function() {
	loadSection();

	$(".nav-buttons").click(function() {
		// Just update URL section key, it invokes popstate event
		updateURLKey("section", $(this).attr("id"));
	});
});