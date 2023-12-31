function renderSchedule(start = 0, end = 5) {
	var schedule = document.querySelector("#schedule-wrapper");
	var template = document.querySelector('#schedule-item');
	var item, items = readSchedule();
	console.log(items);

	items.slice(start, end).forEach(function(item) {
		console.log(item);
		var node = template.content.cloneNode(true);
		var p = node.querySelectorAll("p");
		
		p[0].textContent = formatDate(item.date);
		item.services.forEach(function(service) {
			service = formatService(service);
			p[0].appendChild(service);
		});
		time = formatTime(item.date);
		p[0].appendChild(time);
		p[1].innerHTML = item.title;

		schedule.appendChild(node);
	});
}

function readSchedule() {
	var request = new XMLHttpRequest();
	request.open('GET', 'schedule.json', false);
	request.send(null);

	if (request.status === 200) {
		return JSON.parse(request.responseText);
	}	
}

function formatDate(iso8601) {
	var date  = new Date(iso8601);
	var opts = { 
		weekday: 'long', 
		month: 'long', 
		day: 'numeric'
	};

	return date.toLocaleDateString("en-US", opts);
}

function formatTime(iso8601) {
	var date  = new Date(iso8601);
	var opts = { 
		hour12:  false,
		hour:   '2-digit',
		minute: '2-digit'
	};
	var el = document.createElement('time');
	el.textContent = date.toLocaleTimeString("en-US", opts);

	return el;
}

function formatService(service) {
	var el = document.createElement('i');
	el.classList.add('fab');
	el.classList.add('fa-fw');
	el.classList.add('fa-' + service);

	return el;
}
