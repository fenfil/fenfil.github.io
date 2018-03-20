window.onload = function() {
	$('#white').click(function() {
		$('body').removeClass('b');
		$('body').addClass('w');
	});

	$('#black').click(function() {
		$('body').removeClass('w');
		$('body').addClass('b');
	});
}