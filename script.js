const textbox = document.getElementById("input");
const area = document.getElementById("area");
const reset = document.querySelector("#btn2");
const bookAnimation = document.querySelector(".bookAnimation");
function log() {
	let input = textbox.value;
	if (input === "") {
		alert("Please fill the input");
		return;
	}
	url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;
	fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			clrscr();
			// console.log(data);
			bookAnimation.dataset.visible = "false";
			if (data.title) {
				$("#area").append('<div class="err text-center"></div>');
				$(".err").append(
					`<h3  class="err-title" >😔<br/>No Definitions Found</h3>`
				);
				$(".err").append(
					`<p class="err-message" >Sorry pal, we couldn't find definitions for the word you were looking for.</p>`
				);
			} else {
				// console.log(
				// 	data.phonetics[0].audio !== " "
				// 		? data.phonetics[0].audio
				// 		: data.phonetics[1].audio
				// );
				$("#word").text(input);

				for (let d of data) {
					$("#area").append('<div class="subarea"></div>');
					for (let m of d.meanings) {
						$("#area > div:last-child").append(`<h4>${m.partOfSpeech}</h4>`);
						$("#area > div:last-child").append('<ul class="ul"></ul>');
						for (let ds of m.definitions) {
							$("#area > div:last-child > .ul").append(
								`<li>${ds.definition}</li>`
							);
						}
						if (m.synonyms.length) {
							$("#area > div:last-child > .ul").append(
								`<ul class="synonyms"></ul>`
							);
							$("#area > div:last-child > .ul > .synonyms").append(
								`<h5>synonyms</h5>`
							);
							for (let synonym of m.synonyms) {
								$("#area > div:last-child > .ul > .synonyms").append(
									`<li>${synonym}</li>`
								);
							}
						}
						if (m.antonyms.length) {
							$("#area > div:last-child > .ul ").append(
								`<ul class="antonyms"></ul>`
							);
							$("#area > div:last-child > .ul > .antonyms").append(
								`<h5>antonyms</h5>`
							);
							for (let antonym of m.antonyms) {
								$("#area > div:last-child > .ul > .antonyms").append(
									`<li>${antonym}</li>`
								);
							}
						}
					}
				}
			}
		});
}

document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();
	log();
});

reset.addEventListener("click", clrscr);

function clrscr() {
	bookAnimation.dataset.visible = "true";

	$(".subarea").remove();
	$("#word").text("");
}

// $("#voice").click(() => document.getElementById("myAudio").play());
