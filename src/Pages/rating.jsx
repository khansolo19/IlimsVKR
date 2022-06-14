<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js">
</script>


<div id="rating">
<div class="param">Параметр 1:</div>
<div><div class="stars"></div><p class="progress" id="p1"></p></div>
<div class="rating" id="param1">5.0</div>

<div class="param">Параметр 2:</div>
<div><div class="stars"></div><p class="progress" id="p2"></p></div>
<div class="rating" id="param2">5.0</div>

<div class="param">Параметр 3:</div>
<div><div class="stars"></div><p class="progress" id="p3"></p></div>
<div class="rating" id="param3">5.0</div>


<div class="param">Общая оценка:</div>
<div><div id="sum_stars"></div><p id="sum_progress"></p></div>
<div id="summ">5.00</div>

<input id="el_999" type="submit" value="Отправить!">
<p id="message"></p>
</div>
<style type="text/css">
#rating {
    width: 320px;
    border-radius: 4px;
    box-shadow: 0 0 2px 1px #333333;
    margin: 10px auto;
    padding: 10px;
    text-align: center;
}
#rating div { float: left; }
#rating p { margin: 0; padding: 0; }
.param {
    width: 110px;
    margin: 0 20px 0 0;
    text-align: right;
}
.param, .rating, #summ { line-height: 28px; }
.stars, #sum_stars { background: url(image/stars.png); }
.stars, #sum_stars, .progress, #sum_progress {
    width: 130px;
    height: 28px;
    cursor: pointer;
}
.progress { background: #FFEE00; }
#sum_progress { background: #00EE00; }
.rating, #summ {
    margin: 0 0 0 20px;
    font-weight: bold;
}
</style>
<script type="text/javascript">
$(document).ready(function(){
 function move(e, obj){
    var summ = 0;
    var id = obj.next().attr('id').substr(1);
    var progress = e.pageX - obj.offset().left;
    var rating = progress * 5 / $('.stars').width();
    $('#param'+id).text(rating.toFixed(1));
    obj.next().width(progress);
    $('.rating').each(function(){ summ += parseFloat($(this).text()); });
    summ = summ / $('.rating').length;
    $('#sum_progress').width(Math.round($('.stars').width() * summ / 5));
    $('#summ').text(summ.toFixed(2));
 }

 $('#rating .stars').click(function(e){
    $(this).toggleClass('fixed');
    move(e, $(this));
 });

 $('#rating .stars').on('mousemove', function(e){
    if ($(this).hasClass('fixed')==false) move(e, $(this));
 });

 $('#rating [type=submit]').click(function(){
    summ = parseFloat($('#summ').text());
    jQuery.post('change_rating.php', {
        obj_id: $(this).attr('id').substr(3),
        rating: summ
    }, notice);
 });

 function notice(text){
    $('#message').fadeOut(500, function(){ $(this).text(text); }).fadeIn(2000);
 }
});
</script>