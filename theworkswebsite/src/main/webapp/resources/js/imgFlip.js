function createImgFlip(hoverId, firstImageId, secondImageId){
	const hover = document.getElementById(hoverId);
	const first = document.getElementById(firstImageId);
	const second = document.getElementById(secondImageId);

	console.log("creating hover events for: " + hoverId);
	
	hover.onmouseenter = evt =>{
		first.style.display = "none";
		second.style.display = "block";
	}
	hover.onmouseleave = evt =>{
		second.style.display = "none";
		first.style.display = "block";
	}
}