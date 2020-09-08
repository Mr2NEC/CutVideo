window.onload = function(){
	addForm();
	document.getElementById('btnAddForm').addEventListener('click',addForm);
}
var counter = 0;
function addForm () {
	var newForm = document.createElement("form");
	var input1 = document.createElement("input");
	var input2 = document.createElement("input");
	var input3 = document.createElement("input");
	var input4 = document.createElement("input");
	var input5 = document.createElement("input");
	var button1 = document.createElement("button");
	newForm.appendChild(input1);
	newForm.appendChild(input2);
	newForm.appendChild(input3);
	newForm.appendChild(input4);
	newForm.appendChild(input5);
	newForm.appendChild(button1);
	
	document.body.insertBefore(newForm, document.getElementById('btnAddForm'));
	//document.body.appendChild(newForm);
	newForm.id="newForm" + counter;
	input1.type="date";
	input1.id="inputDate" + counter;
	input2.setAttribute("type","text");
	input2.setAttribute("id","inputHour" + counter);
	input3.type="text";
	input3.id="inputMinutes" + counter;
	input4.type="text";
	input4.id="inputSeconds" + counter;
	input5.type="text";
	input5.id="inputLength" + counter;
	button1.id="buttonDelete" + counter;
	button1.innerHTML="x";
	counter ++;
}

