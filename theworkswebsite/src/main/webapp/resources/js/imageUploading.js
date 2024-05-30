var frontUpload = document.getElementById("frontImageUpload");
var backUpload = document.getElementById("backImageUpload");
var othersUpload = document.getElementById("otherImageUpload");
var othersEditDispaly = document.getElementById("otherImageDisplayParent");

createEvents(frontUpload, "frontDisplay");
createEvents(backUpload, "backDisplay");
createMultipleImageEvents(othersUpload, "imageCarouselEdit");

function createEvents(obj, displayId) {
	if (obj) {
		const displayImg = document.getElementById(displayId);

		obj.onchange = evt => {
			const [file] = obj.files;
			if (file && displayImg) {
				// hide editting image if exists
				if (document.getElementById(displayId + "Edit")) {
					document.getElementById(displayId + "Edit").remove();
				}

				// display new image
				displayImg.src = URL.createObjectURL(file);
				displayImg.style.display = "block";
			}
		}


	}
}

function createMultipleImageEvents(obj, uploadDivId) {

	if (obj) {
		const uploadDiv = document.getElementById(uploadDivId).getElementsByClassName("carousel-inner")[0];

		obj.onchange = evt => {
			const files = obj.files;

			if (files && uploadDiv) {
				// remove old newImages
				const oldImages = document.getElementsByClassName("newImage")
				Array.prototype.forEach.call(oldImages, function(oldImage) {
					oldImage.remove()
				});

				for (let i = 0; i < files.length; i++) {
					const file = files.item(i);
					const newUrl = URL.createObjectURL(file);
					const fileListArr = [...obj.files];

					const outputImageHtml = "<p:img " +
						"className='uploadDisplayImage d-block' height='200' width='200' " +
						"src=" + "'" + newUrl + "'";

					const divNode = document.createElement("div")
					if (uploadDiv.childElementCount === 0) {
						divNode.setAttribute("class", "carousel-item active newImage")
					} else {
						divNode.setAttribute("class", "carousel-item newImage")
					}

					const imgNode = document.createElement("img");
					imgNode.setAttribute("class", "upload-display-img newImage");
					imgNode.setAttribute("height", "200");
					imgNode.setAttribute("width", "200");

					imgNode.setAttribute("src", newUrl);

					divNode.appendChild(imgNode);
					uploadDiv.appendChild(divNode);
				}
			}
		}

	}
}




