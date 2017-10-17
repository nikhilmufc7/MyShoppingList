var shown= "total";

$(document).ready(function(){

	updateCount();

	setFocus();
	

	$("form").submit(function(event){
		
		event.preventDefault();

		var newItem = $.trim($('#newItem').val());
		if (newItem == '') {
			setFocus();
		} else{
			addItem(newItem);
		};
		
	});


	/*--- Check off the items ---*/
	$('#list').on('click', 'li.listitem', checkoff);

	/*--- Delete the item ---*/
	$('#list').on('click', 'div.delete', deleteItem);

	/*--- Show items depending on status ---*/
	$("#do").click(function(){showItems("DO");});
	$("#done").click(function(){showItems("DONE");});	
	$("#total").click(function(){showItems("ALL");});

	/*--- Update counters ---*/
	updateCount();
	
});

	/*--- Delete Function ---*/
	function deleteItem(){
		console.log("Deleting...");
		if($(this).parent().hasClass("checked")) {
			$(this).parent().slideUp('slow', function(){
				$(this).remove();
			});
			console.debug($(this).parent());
			return false;
		} else {
			$(this).parent().slideUp('slow', function(){
				$(this).remove();
			});
			console.debug($(this).parent());
			return false;
		};
		updateCount();
    	$("#list li:visible").each(function( index ) {  
			$(this).css("background-color", ( index % 2 ? "#3498db" : "#2980b9" ));
		});
	}

	/*--- Check off Function ---*/
	function checkoff(){
		console.log("Checking Off...");
		console.debug($(this));	
		$(this).toggleClass("checked");
		$(this).toggleClass("notChecked");
		updateCount();
	}

	/*--- Add the new item to the list and increase the count ---*/
	function addItem(item) {
		updateCount();
		showItems("ALL");
		$('<li class="listitem notChecked"><span class="item">' + item + '</span><div class="delete"></div></li>').hide().prependTo('#list').slideDown('slow');
		console.log("You have now added " + item + "!");
		$("#list li:visible").each(function( index ) {  
			$(this).css("background-color", ( index % 2 ? "#3498db" : "#2980b9" ));
		});
		setFocus();
	}

	/*--- Clear and Set focus to the inputbox ---*/
	function setFocus() {
		$('#newItem').val('');
		document.getElementById("newItem").focus();
	}

	/*--- Update the DO, DONE & TOTAL counts ---*/
	function updateCount() {
		$('#do').text(countNotChecked());
		$('#done').text(countChecked());
		$('#total').text(countNotChecked() + countChecked());
	}
	
	/*--- Show DO, DONE & TOTAL items ---*/
	function showItems(option){
		switch(option){
			case "DO":
				show("DO");
				notShow("DONE");
			break;
			case "DONE":
				show("DONE");
				notShow("DO");
			break;
			default:
				show("DO");
				show("DONE");
		}
		$("#list li:visible").each(function( index ) {  
			$(this).css("background-color", ( index % 2 ? "#3498db" : "#2980b9" ));
		});
	}

	function show(option){
		if (option == "DO"){
			$(" .notChecked" ).css("display","block");
		}
		else{
			$(" .checked" ).css("display","block");
		}
	}

	function notShow(option){
		if (option == "DO"){
			$(" .notChecked" ).css("display","none");
		}
		else{
			$(" .checked" ).css("display","none");
		}
	}

	/*--- Count checked and unchecked items  ---*/
	function countChecked(){
		var numItems = $('.checked').length;
		return numItems;
	} 

	function countNotChecked(){
		var numItems = $('.notChecked').length;
		return numItems;
	}
