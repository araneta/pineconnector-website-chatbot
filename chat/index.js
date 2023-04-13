var chat = document.createElement('div');
var chatbutton = document.createElement('div');
chatbutton.innerHTML = `
<svg height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 58 58" xml:space="preserve">
<g>
	<path style="fill:#546A79;" d="M29,1.5c-16.016,0-29,11.641-29,26c0,5.292,1.768,10.211,4.796,14.318
		C4.398,46.563,3.254,53.246,0,56.5c0,0,9.943-1.395,16.677-5.462c0.007,0.003,0.015,0.006,0.022,0.009
		c2.764-1.801,5.532-3.656,6.105-4.126c0.3-0.421,0.879-0.548,1.33-0.277c0.296,0.178,0.483,0.503,0.489,0.848
		c0.01,0.622-0.005,0.784-5.585,4.421C22.146,52.933,25.498,53.5,29,53.5c16.016,0,29-11.641,29-26S45.016,1.5,29,1.5z"/>
	<circle style="fill:#FFFFFF;" cx="15" cy="27.5" r="3"/>
	<circle style="fill:#FFFFFF;" cx="29" cy="27.5" r="3"/>
	<circle style="fill:#FFFFFF;" cx="43" cy="27.5" r="3"/>
</g>
</svg>
`;

chatbutton.className = 'sd-chatbutton';
chat.append(chatbutton);
var chatbox = document.createElement('div');
chatbox.className = 'sd-chatbox sd-hidden';
var iframe = document.createElement('iframe');
iframe.src = 'http://144.126.234.34:3000/';
chatbox.appendChild(iframe);
chat.appendChild(chatbox);
chatbutton.addEventListener('click', function () {
	if (chatbox.classList.contains('sd-hidden')) {
		chatbox.style.bottom = window.innerHeight - chatbutton.offsetTop + 10;
		chatbox.classList.remove('sd-hidden');
	} else chatbox.classList.add('sd-hidden');
});

var body = document.getElementsByTagName('body');
body[0].appendChild(chat);
