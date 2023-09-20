const sectionsArr = [
	{
		id: "welcome",
		location: "./sections/welcome.html"
	},
	{
		id: "about",
		location: "./sections/about.html"
	},
	{
		id: "projects",
		location: "./sections/projects.html"
	},
	{
		id: "contact",
		location: "./sections/contact.html"
	},
];

const selectNavButton = (id) => {
	$(".nav-buttons").removeClass("nav-selected");
	$("#" + id).addClass("nav-selected");	
};

const updateURLState = (id) => {
	window.history.pushState(null, "Edrick", "?section=" + id);
}

const fetchAndSetSection = (location, target) => {
	$(target).animate({ opacity: 0 }, 500, function() {
		$.get(location, function(data) {
			$(target).html(data);
		});
		$(target).animate({ opacity: 1 }, 500);
	});
};

const updateSection = (id, target) => {
	sectionsArr.forEach(element => {
		if (element.id == id) {
			selectNavButton(id);
			fetchAndSetSection(element.location, target);
			updateURLState(id);
		}
	});
};

const main = () => {
	var currentSection = null;
	const sectionContent = "#content";

	currentSection = new URLSearchParams(window.location.search).get('section');
	if (currentSection === null)
		currentSection = "welcome";

	updateSection(currentSection, sectionContent);

	$(".nav-buttons").click(function() {
		updateSection($(this).attr("id"), sectionContent);
	});
};

$(document).ready(function() {
	main();
});