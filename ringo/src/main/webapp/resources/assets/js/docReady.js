$(document).ready(function() {
	main_show('around');
	get_msg_room_list();
	
	setTimeout(() => {
		login_check();
	}, 100);
	
	window.onclick = function(e) {
		if ($('#join:not(.none)').length > 0) {
	        if (!$(e.target).closest('.modal_content').length && !$(e.target).closest('.modal_button').length) {
	        	hiding('#join');
	        }
	    }
		if ($('#modify:not(.none)').length > 0) {
			if (!$(e.target).closest('.modal_content').length && !$(e.target).closest('.modal_button').length) {
				hiding('#modify');
			}
		}
		if ($('#alert:not(.none)').length > 0) {
			if ( !$(e.target).closest('.alert').length && !$(e.target).closest('.alert_tb').length) {
				hiding('#alert');
				$('#alert').find('.alert_content').empty();
				$('#alert').find('.alert_button').addClass('none');
			}
		}
		if ($('#image_modal:not(.none)').length > 0) {
			if ( !$(e.target).closest('.modal_content').length && !$(e.target).closest('.modal_button').length) {
				hiding('#image_modal');
			}
		}
	}
	
	window.addEventListener('beforeunload', function(event) {
	    if (window.location.hostname !== event.target.location.hostname) {
	        navigator.sendBeacon('/user/logOut', { method: 'POST' });
	    }
	    
	    window.addEventListener('unload', function(event) {
	        if (window.location.hostname !== document.location.hostname) {
	            navigator.sendBeacon('/user/logOut', { method: 'POST' });
	        }
	    });
	});
	
	$(document).on('keydown', function(e) {
	    if(e.keyCode === 27){
	    	if ($('#join:not(.none)').length > 0) {
		    	hiding('#join');
	    	}
	    	if ($('#modify:not(.none)').length > 0) {
	    		hiding('#modify');
	    	}
	    	if ($('#alert:not(.none)').length > 0) {
	    		hiding('#alert');
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
	    
	    /*$(this).find(":not(img)").css("visibility", "hidden");*/
	});
	
	/*$(document).on("dragend", ".draggable", function (e) {
		console.log('drag end!');
	    $(this).find(":not(img)").css("visibility", "visible");
	});*/

	$(document).on("dragover", ".draggable", function (e) {
	    e.preventDefault();
	    $(this).addClass("drag-over");
	});

	$(document).on("dragleave", ".draggable", function () {
	    $(this).removeClass("drag-over");
	});

	$(document).on("drop", ".draggable", function (e) {
	    e.preventDefault();
	    var target;
	    
	    if($(this).closest('.circle_write').length>0){
	    	target = 'circle';
	    }
	    if($(this).closest('.unity_write').length>0){
	    	target = 'unity';
	    }
	    if($(this).closest('.join_modal').length>0){
	    	target = 'join';
	    }
	    
	    $(this).removeClass("drag-over");

	    if (draggedElement !== this) {
	        const draggedClone = $(draggedElement).clone(true);
	        const targetClone = $(this).clone(true);

	        $(draggedElement).replaceWith(targetClone);
	        $(this).replaceWith(draggedClone);
	        
	        setTimeout(() => {
	        	check_file_index(target);
	        }, 500);
	    }

	});
	
	$(document).on('change', '.thumbnail input[type="file"]', function () {
	    check_thumbnail(this);
	});
	
	let isResizing = false;
	let activeContainer = null;
	let activeHandle = null;

	$(document).on('click', '.resize_handle', function (e) {
	    const $thisHandle = $(this);
	    const $thisContainer = $thisHandle.closest('.resizable');

	    if (!isResizing) {
	        $thisContainer.addClass('resizing');
	        $thisHandle.addClass('resizing');
	        isResizing = true;
	        activeContainer = $thisContainer;
	        activeHandle = $thisHandle;

	        $(document).on('mousemove', handleMouseMove);
	        $(document).on('click', handleDocumentClick);
	    } else if (activeHandle[0] === $thisHandle[0]) {
	        handleDocumentClick();
	    }
	    e.stopPropagation();
	});

	function handleMouseMove(e) {
	    if (isResizing && activeContainer) {
	        const offsetX = e.clientX - activeContainer.offset().left;
	        const newWidth = Math.max(100, offsetX);
	        activeContainer.css('width', newWidth + 'px');
	    }
	}

	function handleDocumentClick() {
	    if (isResizing) {
	        isResizing = false;
	        activeContainer.removeClass('resizing');
	        activeHandle.removeClass('resizing');
	        $(document).off('mousemove', handleMouseMove);
	        $(document).off('click', handleDocumentClick);

	        activeContainer = null;
	        activeHandle = null;
	    }
	}

	$(document).on('click', '.col_resize_handle', function (e) {
	    const $thisHandle = $(this);
	    const $thisContainer = $thisHandle.closest('.col_resizable');

	    if (!isResizing) {
	        $thisHandle.addClass('resizing');
	        $thisContainer.addClass('resizing');
	        isResizing = true;
	        activeContainer = $thisContainer;
	        activeHandle = $thisHandle;

	        $(document).on('mousemove', colHandleMouseMove);
	        $(document).on('click', handleColDocumentClick);
	    } else if (activeHandle[0] === $thisHandle[0]) {
	        handleColDocumentClick();
	    }
	    e.stopPropagation();
	});

	function colHandleMouseMove(e) {
	    if (isResizing && activeContainer) {
	        const offsetY = e.clientY - activeContainer.offset().top;
	        const newHeight = Math.max(350, offsetY);
	        activeContainer.css('height', newHeight + 'px');
	    }
	}

	function handleColDocumentClick() {
	    if (isResizing) {
	        isResizing = false;
	        activeContainer.removeClass('resizing');
	        activeHandle.removeClass('resizing');
	        $(document).off('mousemove', colHandleMouseMove);
	        $(document).off('click', handleColDocumentClick);

	        activeContainer = null;
	        activeHandle = null;
	    }
	}
	
    $('.unity_cards').on("wheel", view_check);
    
    let lastlocation = 0;
    let readyToRoad = true;

    $('.unity_cards').on('wheel', function (event) {
    	
        const location = $(this).scrollTop();
        const total = $(this)[0].scrollHeight;
        const current = $(this).outerHeight();
        const maxTop = $(this).scrollTop() < 5 ? true : false;
        const minBottom = Math.abs($(this).scrollTop() + $(this).innerHeight() - $(this)[0].scrollHeight) < 5 ? true : false;
        
        if(!readyToRoad){
        	return;
        }

        const delta = event.originalEvent.deltaY;

        if (delta < 0) {
        	if(!maxTop){
        		get_unity_prev_post(false);
        	}else{
        		get_unity_prev_post(true);
        	}
        } else if (delta > 0) {
        	if(!minBottom){
        		get_unity_next_post(false);
        	}else{
        		get_unity_next_post(true);
        	}
        }
        
        readyToRoad = false;
        setTimeout(() => {
        	readyToRoad = true;
        }, 3000);

        lastlocation = location;
    });
});
