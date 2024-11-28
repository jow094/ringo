$(document).ready(function() {
	login_check();
	main_show('around');
	get_coordinates();
	
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
	
    const $unityPosts = $('.unity_cards');

    $unityPosts.on("scroll", function () {
    	$('.post_row').removeClass('looking');
    	
        const scrollTop = $unityPosts.scrollTop();
        const scrollBottom = scrollTop + $unityPosts.outerHeight();

        $unityPosts.find(".card").each(function () {
            const $card = $(this);
            const cardOffsetTop = $card.offset().top - $unityPosts.offset().top + scrollTop;
            const cardOffsetBottom = cardOffsetTop + $card.outerHeight();

            if (cardOffsetBottom > scrollTop && cardOffsetTop < scrollBottom) {
                const postCode = $card.data("post_code");
                console.log(postCode);

                $('.post_row').each(function () {
                    const $listItem = $(this);
                    console.log($listItem.data("post_code"));
                    if ($listItem.data("post_code") == postCode) {
                        $listItem.addClass("looking");
                    }
                });
            } else {
                const postCode = $card.data("post_code");
                $('.post_row').each(function () {
                    const $listItem = $(this);
                    if ($listItem.data("post_code") === postCode) {
                        $listItem.removeClass("looking");
                    }
                });
            }
        });
        
        $('.post_row').css('margin', '0px');
        $('.looking').first().css('margin-top', '5px');
        $('.looking').last().css('margin-bottom', '5px');
    });
    



});
