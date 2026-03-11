var year, month;
var weeks = ['日','月','火','水','木','金','土'];
var schedule = {
             '6/17': [
             '小川幸太',
             '生誕祭 ',
             '18:00〜'
             ],
             '12/29': [
             '仲間大志',
             '生誕祭 '
             ]
           };

$(function() {
	draw( new Date(2026,0, 1) );
});

function draw( now ) {
	year = now.getFullYear();
	month = now.getMonth();
	
	//月ごとのテーマカラー設定して月ごとに背景色変化
	var colors = ["#daa520","#ff7f50",
	             "#ffb6c1","#ff1493",
	             "#7fff00","#ee82ee",
	             "#00bfff","#ffff00",
	             "#ff8c00","#808000",
	             "#d2691e","#8b0000",
	             ]
	$("body").css("background",colors[month]);
	
	
	var title = '<span id="prev-month">＜</span>　';
	title += year + '年' + (month+1) + '月';
	title += '　<span id="next-month">＞</span>';
	$('#title').html(title);
	
	
	var weekHtml = '';
    for (var i = 0; i < weeks.length; i++) {
       weekHtml += '<div class="week">' + weeks[i] + '</div>';
      }
    $('#week-row').html(weekHtml)
	//曜日の行追加
	
	
	var html = '';
	var firstDay = new Date(year, month, 1);
	for(var i=1; i<=42; i++) {
		var day = new Date(year, month, i-firstDay.getDay());
		var m = day.getMonth();
		var d = day.getDate();
		
		var className = 'day';
		if (i%7 == 1) className += ' sunday';
		if (i%7 == 0) className += ' saturday';
		if (m != month) className += ' other-month';
		var s = d;
		for (var sch in schedule) {
	       if (sch == (m+1) + '/' + d) {
		    // 配列なら1行ずつ表示
		   if (Array.isArray(schedule[sch])) {
			for (var j = 0; j < schedule[sch].length; j++) {
				  s += '<div class="schedule-text">' + schedule[sch][j] + '</div>';
	     }
		} 
		     // 文字列ならそのまま表示
		     else {
			      s += '<div class="schedule-text">' + schedule[sch] + '</div>';
		   }
	      }
        }
        
		html += '<div class="' + className + '" ' +
        'data-year="' + year + '" ' +
        'data-month="' + (m+1) + '" ' +
        'data-date="' + d + '">' 
         + s  + '</div>';
	    }	
	$('#calendar').html(html);

	$('#prev-month').on('click', function() {
		draw( new Date(year, month-1, 1) );
	});

	$('#next-month').on('click', function() {
		draw( new Date(year, month+1, 1) );
	});
	
	// 日付クリックでスケジュール表示
	$('.day').on('click', function() {
    var y = $(this).data('year');
    var m = $(this).data('month');
    var d = $(this).data('date');

    var key = m + '/' + d;

    if (schedule[key]) {
        alert(y + '年' + m + '月' + d + '日の予定：\n' + schedule[key]); 
    } else {
        alert(y + '年' + m + '月' + d + '日は予定なし');
    }
    });
}
