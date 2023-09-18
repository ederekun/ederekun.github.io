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
		if (element.id == id) {
			$(".nav-buttons").removeClass("nav-selected");
			$("#" + id).addClass("nav-selected");	
			fetchAndUpdateSection(element.location, target);
		}
	});	
};

const main = () => {
	const defaultSection = "nav-welcome";
	const sectionContainer = "#section-container";

	updateSection(defaultSection, sectionContainer);

	$(".nav-buttons").click(function() {
		updateSection($(this).attr("id"), sectionContainer);
	});
};

$(document).ready(function() {
	main();
});