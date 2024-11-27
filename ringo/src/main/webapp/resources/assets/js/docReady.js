$(document).ready(function() {
	login_check();
	main_show('around');
	get_coordinates();
	
	$(document).on('mouseenter', '[onclick]', function() {
	    $(this).css('cursor', 'pointer');
	});
	
	window.onclick = function(e) {
		if ($('.join_modal:not(.none)').length > 0) {
	        if (!$(e.target).closest('.modal_content').length && !$(e.target).closest('.modal_button').length) {
	            hiding('.join_modal');
	        }
	    }
	}
	
	$(document).on('keydown', function(e) {
	    if(e.keyCode === 27){
	    	if ($('.join_modal:not(.none)').length > 0) {
		    	hiding('.join_modal');
	    	}
	    }
	});
	
	$('.image_queue_belt, .added_menu_inner').on('wheel', function (event) {
        event.preventDefault();
        const delta = event.originalEvent.deltaY;
        $(this).scrollLeft($(this).scrollLeft() + delta);
    });
	
	$('input[type="checkbox"]').change(function() {
		var target = $(this).closest('.with_checkbox');
		var currentClass = target.attr('class'); 
		
	    if ($(this).is(':checked')) {
	    	if (currentClass.includes('finished_row') || currentClass.includes('unfinished_row')){
	    		set_finished(target,'row');
	    	}
	    	if (currentClass.includes('finished_column') || currentClass.includes('unfinished_column')){
	    		set_finished(target,'column');
	    	}
	    } else {
	    	if (currentClass.includes('finished_row') || currentClass.includes('unfinished_row')){
	    		set_unfinished(target,'row');
	    	}
	    	if (currentClass.includes('finished_column') || currentClass.includes('unfinished_column')){
	    		set_unfinished(target,'column');
	    	}
	    }
	});
	
	$('input[type="radio"]').change(function() {
		var target = $(this).closest('.with_radio');
		var currentClass = target.attr('class');
		
	    if ($(this).is(':checked')) {
	    	if (currentClass.includes('finished_row') || currentClass.includes('unfinished_row')){
	    		set_finished(target,'row');
	    	}
	    	if (currentClass.includes('finished_column') || currentClass.includes('unfinished_column')){
	    		set_finished(target,'column');
	    	}
	    } else {
	    	if (currentClass.includes('finished_row') || currentClass.includes('unfinished_row')){
	    		set_unfinished(target,'row');
	    	}
	    	if (currentClass.includes('finished_column') || currentClass.includes('unfinished_column')){
	    		set_unfinished(target,'column');
	    	}
	    }
	});
	
	$('.with_select select').change(function() {
		var target = $(this).closest('.with_select');
		var currentClass = target.attr('class');
		
		var unselected = target.find('select').filter(function() {
	        return $(this).val() === "";
	    });
		
		var null_selected = target.find('select').filter(function() {
	        return $(this).val() == null;
	    });
		
		 if (unselected.length == 0 && null_selected.length == 0) {
	    	if (currentClass.includes('finished_row') || currentClass.includes('unfinished_row')){
	    		set_finished(target,'row');
	    		set_hint($(this), '* 입력이 완료되었습니다.', 'success_message');
	    	}
	    	if (currentClass.includes('finished_column') || currentClass.includes('unfinished_column')){
	    		set_finished(target,'column');
	    		set_hint($(this), '* 입력이 완료되었습니다.', 'success_message');
	    	}
		 }
	});
	
	let draggedElement = null;

	$(document).on("dragstart", ".draggable", function (e) {
	    draggedElement = this;
	    e.originalEvent.dataTransfer.effectAllowed = "move";
	    
	    $(this).find(":not(img)").css("visibility", "hidden");
	});

	$(document).on("dragend", ".draggable", function () {
	    $(this).find(":not(img)").css("visibility", "visible");
	});

	$(document).on("dragover", ".draggable", function (e) {
	    e.preventDefault();
	    $(this).addClass("drag-over");
	});

	$(document).on("dragleave", ".draggable", function () {
	    $(this).removeClass("drag-over");
	});

	$(document).on("drop", ".draggable", function (e) {
	    e.preventDefault();
	    $(this).removeClass("drag-over");

	    if (draggedElement !== this) {
	        const draggedClone = $(draggedElement).clone(true);
	        const targetClone = $(this).clone(true);

	        $(draggedElement).replaceWith(targetClone);
	        $(this).replaceWith(draggedClone);
	    }

	});
	
	$(document).on('change', '.thumbnail input[type="file"]', function () {
	    check_thumbnail(this);
	});
	
	const $resizeContainer = $('.resizable');
    const $resizeHandle = $('.resize_handle');
    let isResizing = false;

    $resizeHandle.on('mousedown', function(e) {
        isResizing = true;
        $(document).on('mousemove', handleMouseMove);
        $(document).on('mouseup', handleMouseUp);
    });

    function handleMouseMove(e) {
        if (isResizing) {
            const offsetX = e.clientX - $resizeContainer.offset().left;
            const newWidth = Math.max(100, offsetX);
            $resizeContainer.css('width', newWidth + 'px');
        }
    }

    function handleMouseUp() {
        isResizing = false;
        $(document).off('mousemove', handleMouseMove);
        $(document).off('mouseup', handleMouseUp);
    }
	
});
