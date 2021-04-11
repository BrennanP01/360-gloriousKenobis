export {randomNumber, randomizeColor};

/*************************************************************
* This function returns a random integer between min and max *
*************************************************************/
function randomNumber (min, max) {
	let color = Math.floor (Math.random()*(max - min)) + min;
	return color;
}

/*****************************************************************
* Starting on integers code (0-255) for red, green and blue,     *
* this function returns a rgb color as a string of               *
* hexadecimal equivalents for red, green and blue preceded for # *
*****************************************************************/
function rgb2hex(r,g,b){
	return "#" +
			("0" + parseInt(r,10).toString(16)).slice(-2) +
			("0" + parseInt(g,10).toString(16)).slice(-2) +
			("0" + parseInt(b,10).toString(16)).slice(-2);
}

/**********************************************************************************
* Relative Luminance (From W3C Web Content Accessibility Guidelines (WCAG) 2.0    *
* The relative brightness of any point in a colorspace,                           *
* normalized to 0 for darkest black and 1 for lightest white                      *
* Note 1:                                                                         *
* For the sRGB colorspace, the relative luminance of a color is defined as:       *
*	L = 0.2126 * R + 0.7152 * G + 0.0722 * B where R, G and B are defined as:     *
*	if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4 *
*	if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4 *
*	if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4 *
* being RsRGB, GsRGB, and BsRGB are defined as:                                   *
*	RsRGB = R8bit/255                                                             *
*	GsRGB = G8bit/255                                                             *
*	BsRGB = B8bit/255                                                             *
**********************************************************************************/
function luminance(r, g, b) {
	var a = [r, g, b].map(function (v) {
		v /= 255;
		return v <= 0.03928
			? v / 12.92
			: Math.pow( (v + 0.055) / 1.055, 2.4 );
	});
	return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/***************************************************************************
* Function to compute the contrast between two colors based on the cocient *
* between the luminance (+ 0.05) of these two colors                       *
***************************************************************************/
// minimal recommended contrast ratio is 4.5, or 3 for larger font-sizes
function contrast(r1, g1, b1, r2, g2, b2) {
	return (luminance(r1, g1, b1) + 0.05)
			/ (luminance(r2, g2, b2) + 0.05);
}

/*******************************************************************************
* Function to calculate a random color with the right contrast with baseColor  *
* Wd get the red, green and blue components for both, the base color and the   *
* random one, and check the contrast between them.                             *
* It iterates until we get a color with the right contrast with the base color *
* Although, according to the literature, the contrast should be > 3 (or > 4.5) *
* Because I do not know whether the color with lower luminance is in the       *
* background or foreground and the contrast is the quotient of two lumunances  *
* I will accept contrast of 4 or 1/4                                           *
*******************************************************************************/
function randomizeColor (baseColor) {
	let rb = parseInt(baseColor.slice(1, 3), 16);
	let gb = parseInt(baseColor.slice(3, 5), 16);
	let bb = parseInt(baseColor.slice(-2), 16);
	let r = Math.floor (Math.random()*256);
	let g = Math.floor (Math.random()*256);
	let b = Math.floor (Math.random()*256);
	let contrastColors = contrast(r, g, b, rb, gb, bb);
	while (contrastColors > (1./4.5) && contrastColors < 4.5) {
		r = Math.floor (Math.random()*256);
		g = Math.floor (Math.random()*256);
		b = Math.floor (Math.random()*256);
		contrastColors = contrast(r, g, b, rb, gb, bb);
	}
	let color = rgb2hex (r, g, b);
	return color;
}
