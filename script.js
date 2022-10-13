const textbox = document.getElementById("input");
const area = document.getElementById("area");
const reset = document.querySelector("#btn2");
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
			console.log(data);
			$("#word").text(input);

			// console.log(
			// 	data.phonetics[0].audio !== " "
			// 		? data.phonetics[0].audio
			// 		: data.phonetics[1].audio
			// );

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
						$("#area > div:last-child > .ul").append(`<h5>synonyms</h5>`);
						$("#area > div:last-child > .ul").append(
							`<ul class="synonyms"></ul>`
						);
						for (let synonym of m.synonyms) {
							$("#area > div:last-child > .ul > .synonyms").append(
								`<li>${synonym}</li>`
							);
						}
					}
					if (m.antonyms.length) {
						$("#area > div:last-child > .ul").append(`<h5>antonyms</h5>`);
						$("#area > div:last-child > .ul ").append(
							`<ul class="antonyms"></ul>`
						);
						for (let antonym of m.antonyms) {
							$("#area > div:last-child > .ul > .antonyms").append(
								`<li>${antonym}</li>`
							);
						}
					}
				}
			}
		});
}

reset.addEventListener("click", clrscr);

function clrscr() {
	$(".subarea").remove();
	$("#word").text("");
}

$("#voice").click(() => document.getElementById("myAudio").play());
