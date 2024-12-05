let mediaRecorder;
let audioChunks = [];
let audioBlob;
let recordingTime = 0;
let recordingTimer;
let playingTime = 0;
let playingTimer;
let inRecording = false;
let inPlaying = false;
$(document).ready(function () {

  // 녹음 시작
	$('#record_start').on('click', async function () {
    
	    try {
	    	if(!inRecording){
	    		mediaRecorder = null;
	    		audioBlob = null;
	    		audioChunks = [];
	    		clearInterval(recordingTimer);
	    		clearInterval(playingTimer);
	    		recordingTime = 0;
	    		playingTime = 0;
	    	}
	    	
	    	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	    	mediaRecorder = new MediaRecorder(stream);
	
	    	mediaRecorder.ondataavailable = function (event) {
	    		audioChunks.push(event.data);
	    	};
	      
	    	mediaRecorder.onstart = function () {
	    		recordingTimer = setInterval(function () {
	    			recordingTime+=0.1;
	    			$('.recording_time').text(recordingTime.toFixed(1));
	    		}, 100);
	    	};
	
	    	mediaRecorder.onstop = function () {
	    		audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
	    		const audioUrl = URL.createObjectURL(audioBlob);
	    		$('#audio_preview').attr('src', audioUrl);
	    		clearInterval(recordingTimer);
	    		$('.recording_time').text(recordingTime.toFixed(1));
	    	};
	
	    	mediaRecorder.start();
      
		} catch (error) {
			console.error(error);
		}
	});
  
	$('#record_pause').on('click', function () {
		inRecording = true;
		if (mediaRecorder) {
			mediaRecorder.stop();
		}
	});
	
	$('#record_stop').on('click', function () {
		inRecording = false;
		hide('#record_start');
		hide('#record_pause');
		hide('#record_stop');
		showing('#audio_play');
		showing('#audio_upload');
		showing('#audio_delete');
		
		if (mediaRecorder) {
			mediaRecorder.stop();
		}
	});
  
	$('#audio_preview')[0].addEventListener('timeupdate', function () {
		let currentTime = $('#audio_preview')[0].currentTime; // 현재 오디오 재생 시간
		let duration = recordingTime;       // 오디오 총 길이
		
		if(currentTime==0){
			$('.audio_bar').css('background','white');
			return;
		}
		
		$('.playing_time').text(currentTime.toFixed(1));
		let value = (currentTime / duration) * 100;
		$('.audio_bar').css('background',`linear-gradient(to right, var(--basic) ${value}%, white ${value}%)`);
		
		console.log('currentTime is',currentTime);
		console.log('duration is',duration);
		console.log('value is',value);
	});
	
	$('.audio_bar').on('click', function (e) {
		if($('#audio_preview').attr('src') == '' || $('#audio_preview').attr('src') == null || inRecording){
			return;
		};
		
	    let range = $('#audio_bar'); // 현재 range 요소
	    let offsetX = e.pageX - range.offset().left; // 클릭한 위치가 range 시작점에서 얼마나 떨어져 있는지
	    let width = range.width(); // range 요소의 너비
	    let newValue = (offsetX / width) * 100; // 클릭한 위치에 해당하는 value 계산
	    
	    console.log('nv : ',newValue);
	    
	    range.val(newValue); // range value 업데이트
	    $('#audio_preview')[0].currentTime = (recordingTime * newValue) / 100; // 오디오 재생 시간 업데이트
	    playingTime = (recordingTime * newValue) / 100;
	});

  // 녹음 재생
	$('#audio_play').on('click', function () {
		if(!inPlaying){
			$('#audio_bar').val(0);
			clearInterval(playingTimer);
			playingTime = 0;
		}
		
		hide('#audio_play');
		showing('#audio_pause');
		console.log('record play');
	  
		$('#audio_preview')[0].addEventListener('ended', function() {
			console.log('audio end');
			hide('#audio_pause');
			showing('#audio_play');
			clearInterval(playingTimer);
			$('.playing_time').text(recordingTime.toFixed(1));
			inPlaying = false;
		});
	  
		$('#audio_preview')[0].play();
		
		playingTimer = setInterval(function () {
			playingTime+=0.1;
			if(playingTime==recordingTime){
				return;
			}
			$('.playing_time').text(playingTime.toFixed(1));
		}, 100);
	});
	
	$('#audio_pause').on('click', function () {
		inPlaying = true;
		$('#audio_preview')[0].pause();
		clearInterval(playingTimer);
		hide('#audio_pause');
		showing('#audio_play');
	});
  // 녹음 삭제
	$('#audio_delete').on('click', function () {
		init_recorder();
	});

  // 녹음 전송
	$('#audio_upload').on('click', function () {
		console.log('record upload');
		const formData = new FormData();
		formData.append('audioFile', audioBlob, 'recording.mp3');
		formData.append('mr_code', mr_code);

		$.ajax({
			url: '/msg/audio', // Spring 서버의 업로드 API
			method: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function () {
				alert('녹음 파일이 성공적으로 전송되었습니다!');
				init_recorder();
			},
			error: function () {
				alert('녹음 파일 전송 중 오류가 발생했습니다.');
			},
		});
	});
	
});

function init_recorder(){
	$('#audio_preview').attr('src', '');
	mediaRecorder=null;
	audioChunks = [];
	audioBlob = null;
	clearInterval(recordingTimer);
	clearInterval(playingTimer);
	recordingTime = 0;
	playingTime = 0;
	hide('#audio_play');
	hide('#audio_pause');
	hide('#audio_upload');
	hide('#audio_delete');
	showing('#record_start');
	showing('#record_pause');
	showing('#record_stop');
	$('#audio_bar').val(0);
	$('.playing_time').text('');
	$('.recording_time').text('');
	$('#audio_preview')[0].currentTime = 0;
	$('#audio_preview')[0].duration = 0;
	let inRecording = false;
	let inPlaying = false;
}
