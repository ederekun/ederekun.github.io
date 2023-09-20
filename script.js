const sectionsArr = [
	{
		id: "nav-welcome",
		location: "./sections/welcome-section.html"
	},
	{
		id: "nav-about",
		location: "./sections/about.html"
	},
	{
		id: "nav-projects",
		location: "./sections/projects.html"
	},
	{
		id: "nav-contact",
		location: "./sections/contact.html"
	},
];

const selectNavButton = (id) => {
	$(".nav-buttons").removeClass("nav-selected");
	$("#" + id).addClass("nav-selected");	
};

const updateURLState = (id) => {
	window.history.pushState({ "nav": id }, "Edrick", "?selected=" + id);
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
	const sectionContent = "#section-content";

	currentSection = new URLSearchParams(window.location.search).get('selected');
	if (currentSection === null)
		currentSection = "nav-welcome";

	updateSection(currentSection, sectionContent);

	$(".nav-buttons").click(function() {
		updateSection($(this).attr("id"), sectionContent);
	});
};

$(document).ready(function() {
	main();
});