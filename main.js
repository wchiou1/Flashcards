
$(function(){
    
});
var completeString = "";
var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
        $('#main_background').find('*').not('input').remove();
        var rawtext = reader.result;
        var text = rawtext.replace(/[^\x00-\x7F]/g, "");
        completeString = text;
        console.log(completeString);
        // var questions = completeString.split(/\n-| -/g);
        var group_count = 0;
        var groups = completeString.split("\n>");
        groups.forEach(function(group_string,index){
            var group = $(`<div id="`+group_count+`" class="group"></div>`);
            var group_title = $(`<div class="group-header"><span class="progress">[<span class="checked">0</span>/<span class="total"></span>]</span> <span class="title"></span></div>`);
            var group_body = $(`<div class="baseAbsolute animated"><div class="group-body hidden"></div></div>`);
            var group_title_text = group_string.substring(0,group_string.indexOf('\n')+1);
            var group_body_text = group_string.substring(group_string.indexOf('\n')+1);
            group_title.find('.title').text(group_title_text);
            group.append(group_title);
            group.append(group_body);
            $('#main_background').append(group);
            var questions = group_body_text.split(/\n-/g);
            console.log(questions);
            var count = 0;
            questions.forEach(function(string,index){
                //string = string.trim();
                var title_text = string.substring(0,string.indexOf('\n')+1).trim();
                var body_text = string.substring(string.indexOf('\n')+1).trim();
                if(title_text.replace(/ /g,'').length==0)
                    return;
                if(string.indexOf('\n')==-1||body_text.replace(/ /g,'').length==0){
                    title_text = string;
                    body_text = "No Answer Detected";
                }
                var card = $(`<div id="`+group_count+`_`+count+`" class="card"><input type="checkbox" class="check"></input></div>`);
                var title = $(`<div class="question"></div>`);
                var answer_button = $(`<button class="show-answer no-display">SHOW ANSWER</button>`);
                title.text(title_text);
                var body = $(`<div class="baseAbsolute animated"><div class="answer hidden"></div></div>`);
                body.find('.answer').html(body_text.replace(/[^\S ]{2}/g,"<br>"));
                card.append(title)
                    .append(answer_button)
                    .append(body)
                    .append(`<textarea class="textarea"></textarea>`);
                group.find('.group-body').append(card);
                count++;
            });
            group.find('.total').text(count);
            group_count++;
            group_body.find('.group-body').closest('.baseAbsolute').css('height',"0px");
        });
        $('.question').on('click',function(e){
            var answer = $(this).closest('.card').find('.answer');
            if(answer.hasClass('hidden')){
                answer.removeClass('hidden');
                answer.closest('.baseAbsolute').css('height',answer.height()+"px");
            }
            else{
                answer.addClass('hidden');
                answer.closest('.baseAbsolute').css('height',"0px");
            }
            
        });
        $('.group-header').on('click',function(e){
            var group = $(this).closest('.group');
            var group_body = group.find('.group-body');
            if(group_body.hasClass('hidden')){
                group_body.removeClass('hidden');
                group_body.closest('.baseAbsolute').css('height',group_body.height()+"px");
            }
            else{
                group_body.addClass('hidden');
                group_body.closest('.baseAbsolute').css('height',"0px");
            }
        });
        $('input.check').on('click',function(e){
            var group = $(this).closest('.group');
            var count = group.find("input.check:checked").length;
            group.find('.group-header .checked').text(count);
            group.find('.group-header .progress').removeClass('amber green');
            var total = parseInt(group.find('.group-header .total').text());
            if(count==total){ 
                group.find('.group-header .progress').addClass('green');
            }
            else if(count>0){
                group.find('.group-header .progress').addClass('amber');
            }

        });
    };
    reader.readAsText(input.files[0]);

    
};