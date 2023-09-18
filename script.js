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

const fetchAndUpdateSection = (location, target) => {
	$(target).hide("fast", function() {
		$.get(location, function(data) {
			$(target).html(data);
		});
		$(target).show("fast");
	});
};

const updateSection = (id, target) => {
	sectionsArr.forEach(element => {
		if (element.id == id)
			fetchAndUpdateSection(element.location, target);
	});	
};

const main = () => {
	const defaultSection = "./sections/welcome-section.html";
	const sectionContainer = "#section-container";

	fetchAndUpdateSection(defaultSection, sectionContainer);

	$(".nav-buttons").click(function() {
		updateSection($(this).attr("id"), sectionContainer);
	});
};

$(document).ready(function() {
	main();
});