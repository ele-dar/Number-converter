const arabicNumber = document.querySelector('#arabic_number');
const romanNumber = document.querySelector('#roman_number');
const alert = document.querySelector('p');
const arabicDigits = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
const romanDigits = [
	[ '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX' ],
	[ '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC' ],
	[ '', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM' ],
	[ '', 'M', 'MM', 'MMM', `Mↁ`, `ↁ`, `ↁM`, `ↁMM`, `ↁMMM`, `ↁↂ` ]
];

// ARABIC --> ROMAN:

function convert(arabic) {
	let roman = [];
	for (let i = 0; i < romanDigits.length; i++) {
		roman.unshift(romanDigits[i][arabicDigits.indexOf(Math.floor(arabic / 10 ** i) % 10)]);
	}
	return roman.join('');
}

arabicNumber.addEventListener('input', () => {
	if (isNaN(arabicNumber.value)) {
		alert.innerText = `"${arabicNumber.value}" is not a number`;
		romanNumber.value = '';
	} else {
		alert.innerText = '';
		romanNumber.value = convert(arabicNumber.value);
	}
});

// ROMAN --> ARABIC

function revert(roman) {
	let arabic = [];
	roman = roman.toUpperCase();
	loop1: for (let i = 0; i < romanDigits.length; i++) {
		for (let j = 9; j > 0; j--) {
			if (roman.endsWith(romanDigits[i][j])) {
				if (j === 5 && roman.endsWith(romanDigits[i][4])) {
					arabic.unshift(arabicDigits[4]);
					roman = roman.slice(0, roman.length - romanDigits[i][4].length);
				} else {
					arabic.unshift(arabicDigits[j]);
					roman = roman.slice(0, roman.length - romanDigits[i][j].length);
				}
				if (roman === '') break;
				continue loop1;
			}
		}
		if (roman === '') break;
		arabic.unshift('0');
	}
	return arabic.join('');
}

romanNumber.addEventListener('input', () => {
	arabicNumber.value = revert(romanNumber.value);
});
