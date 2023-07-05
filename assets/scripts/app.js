const Portfolio = function() {
	function makeWords() {
		var words = [
			{
				text: "coding",
				weight: 12.3
			}, {
				text: "CSS",
				weight: 8
			}, {
				text: "Python",
				weight: 14
			}, {
				text: "Django",
				weight: 3
			}, {
				text: "Go",
				weight: 7
			}, {
				text: "JavaScript",
				weight: 10
			}, {
				text: "PostgreSQL",
				weight: 9
			}, {
				text: "C#",
				weight: 15
			}, {
				text: "ReactJS",
				weight: 8
			}, {
				text: "Linux",
				weight: 4
			}
		];
		return words;
	}

	function makeWordCloud(words) {
		$('.teaching-domains').jQCloud(words, {delay: 60});
	}

	function displayWordCloud() {
		var count = 1;
		$(window).on('scroll', function() {
			var y_scroll_pos = window.pageYOffset;
			var scroll_pos_test = 1900; // set to whatever you want it to be
			var words = makeWords();
			if (y_scroll_pos > scroll_pos_test && count <= 1) {
				makeWordCloud(words);
				count++;
			}
		});
	}

	function designForm() {
		$("#my-modal form").addClass("my-form");
	}

	function typeAnimation() {
		Typed.new("#writing-text", {
			strings: [
				"am a Software Engineer.", "love everything about code.","transform your vision into code.", "solve problems."
			],
			// Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
			stringsElement: null,
			// typing speed
			typeSpeed: 1,
			contentType: 'text',
			callback: function() {
				$("#writing-text").css({"color": "#fff", "background-color": "#C8412B"});
			},
			preStringTyped: function() {},
			onStringTyped: function() {}
		});
	}

	return {
		displayWordCloud: displayWordCloud,
		typeAnimation: typeAnimation
	}

}();


Portfolio.displayWordCloud();
Portfolio.typeAnimation();
