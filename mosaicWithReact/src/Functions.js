export {randomNumber, rgb2hex, randomizeColor};

function randomNumber (min, max) {
	let color = Math.floor (Math.random()*(max - min)) + min;
	return color;
}

function rgb2hex(r,g,b){
	return "#" +
			("0" + parseInt(r,10).toString(16)).slice(-2) +
			("0" + parseInt(g,10).toString(16)).slice(-2) +
			("0" + parseInt(b,10).toString(16)).slice(-2);
}
	
function luminanace(r, g, b) {
	var a = [r, g, b].map(function (v) {
		v /= 255;
		return v <= 0.03928
			? v / 12.92
			: Math.pow( (v + 0.055) / 1.055, 2.4 );
	});
	return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// minimal recommended contrast ratio is 4.5, or 3 for larger font-sizes
function contrast(r1, g1, b1, r2, g2, b2) {
	return (luminanace(r1, g1, b1) + 0.05)
			/ (luminanace(r2, g2, b2) + 0.05);
}


function randomizeColor (baseColor) {
	let rb = parseInt(baseColor.slice(1, 3), 16);
	let gb = parseInt(baseColor.slice(3, 5), 16);
	let bb = parseInt(baseColor.slice(-2), 16);
	let r = Math.floor (Math.random()*256);
	let g = Math.floor (Math.random()*256);
	let b = Math.floor (Math.random()*256);
	let contrastColors = contrast(r, g, b, rb, gb, bb);
	while (contrastColors > 0.7 && contrastColors < 1.3) {
		r = Math.floor (Math.random()*256);
		g = Math.floor (Math.random()*256);
		b = Math.floor (Math.random()*256);
		contrastColors = contrast(r, g, b, rb, gb, bb);
	}
	let color = rgb2hex (r, g, b);
	return color;
}
