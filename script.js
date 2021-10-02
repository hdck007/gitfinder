const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const header = document.querySelector('.username');
const bio = document.querySelector('.bio');
const avatar = document.querySelector('.user-avatar');
const tds = document.querySelectorAll('td');
const socials = document.querySelectorAll('.grid-member');

const prop = ['public_repos', 'followers', 'following'];
const propSocial = ['twitter_username', 'blog', 'location', 'company'];

function initialize() {
	header.innerText = 'Username';
	bio.innerText = 'This is a bio';
	avatar.removeChild(avatar.childNodes[0]);
	tds.forEach((element, index) => {
		element.innerText = "0";
	});
	socials.forEach((element, index) => {
		element.innerText = 'Not Available';
	});
}

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const userData = await fetchUser(input.value);
	console.log(userData);
	header.innerText = userData.name;
	bio.innerText = userData.bio;
	show_image(avatar, userData.avatar_url);
	tds.forEach((element, index) => {
		element.innerText = userData[prop[index]];
	});
	socials.forEach((element, index) => {
		element.innerText = userData[propSocial[index]] || 'Not Available';
	});
});

function fetchUser(username) {
	return fetch(`https://api.github.com/users/${username}`)
		.then((response) => response.json())
		.then((data) => {
			return data;
		});
}

function show_image(parentNode, src) {
	var img = document.createElement('img');
	img.src = src;
	img.width = 100;
	img.height = 100;
	img.alt = 'avatar';
	parentNode.appendChild(img);
}
