frontUpload = document.getElementById("frontImageUpload");
backUpload = document.getElementById("backImageUpload");
othersUpload = document.getElementById("otherImageUpload");

function createEvents(obj, removeId, displayId) {
	if (obj) {
		const removeButton = document.getElementById(removeId);
		const displayImg = document.getElementById(displayId);

		obj.onchange = evt => {
			const [file] = obj.files;
			if (file && removeButton) {
				// hide editting image if exists
				if (document.getElementById(displayId + "Edit")) {
					document.getElementById(displayId + "Edit").remove();
				}

				// display new image
				displayImg.src = URL.createObjectURL(file);
				displayImg.style.display = "block";
				removeButton.style.display = "block";
			}
		}

		if (removeButton) {
			removeButton.onclick = evt => {
				document.getElementById(displayId).style.display = "none";
				//console.log(displayImg)
				obj.value = "";
				removeButton.style.display = "none";
			}
		}
	}
}

function createMultipleImageEvents(obj, uploadDivId, removeButtonId) {
	const removeButton = document.getElementById(removeButtonId);

	if (obj && removeButton) {
		const uploadDiv = document.getElementById(uploadDivId);

		removeButton.onclick = evt => {
			uploadDiv.innerHTML = "";
			console.log("remove");
			obj.value = "";
			removeButton.style.display = "none";
		}

		obj.onchange = evt => {
			const files = obj.files;

			if (files && uploadDiv) {
				uploadDiv.innerHTML = "";
				removeButton.style.display = "block"
				for (let i = 0; i < files.length; i++) {
					const file = files.item(i);
					console.log(file);
					const newUrl = URL.createObjectURL(file);
					const fileListArr = [...obj.files];


					const outputImageHtml = "<p:img " +
						"className='uploadDisplayImage d-block' height='200' width='200' " +
						"src=" + "'" + newUrl + "'";
					const removeButtonHtml = '<button name="backRemoveUpload" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only text-center" style="display: block; margin-left: auto; margin-right: auto;" type="submit"> ' +
						"<span class='ui-button-text ui-c'>Remove</span> </button>";

					const divNode = document.createElement("div")
					if (i == 0) {
						divNode.setAttribute("class", "carousel-item active")
					} else {
						divNode.setAttribute("class", "carousel-item")
					}

					const imgNode = document.createElement("img");
					imgNode.setAttribute("class", "uploadDisplayImage d-block w-100");
					imgNode.setAttribute("height", "200");
					imgNode.setAttribute("width", "200");

					imgNode.setAttribute("src", newUrl);

					const spanNode = document.createElement("span");
					spanNode.setAttribute("class", "ui-button-text ui-c");
					spanNode.innerHTML = "Remove";

					divNode.appendChild(imgNode);
					uploadDiv.appendChild(divNode);


				}

				const carousel = new bootstrap.Carousel('#imageCarousel', {
					interval: 2500,
				});
				carousel.cycle();
			}
		}

	}
}

createEvents(frontUpload, "frontRemoveUpload", "frontDisplay");
createEvents(backUpload, "backRemoveUpload", "backDisplay");
createMultipleImageEvents(othersUpload, "otherImagesDisplay", "otherRemoveUpload");


