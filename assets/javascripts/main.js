window.noscroll = function(event) {
    event.preventDefault();
}
window.stopscroll = function(event) {
    document.body.addEventListener('touchmove', noscroll, false);
}
window.startscroll = function(event) {
    document.body.removeEventListener('touchmove', noscroll, false);
}

;(function ($, window, document, undefined) {
    var page = (function () {
        return {
            _isVip:false,
            _debug:true,
            _isbegin:false,
            elms:{
                J_texttip:$('#J_texttip'),
                J_img_pri:$('.J_img_pri'),
                J_imgbtn:$('#J_imgbtn'),
                J_imgpo:$('#J_imgpo'),
                J_pops:$('#J_pops'),
                J_close:$('#J_close'),
                J_rule:$('#J_rule'),
                J_prize_one:$('#J_prize_one'),
                J_prize_two:$('#J_prize_two'),
                J_prize_no:$('#J_prize_no'),
                J_rulebtn:$('#J_rulebtn')
            },
            _pids:{},
            bindEvent:function(){
                var _this = this;
                _this.elms.J_imgbtn.click(function(){
                    if(!_this._isVip){
                        window.location.href="http://www.baidu.com";
                    }else{
                        $.ajax({
                            type: 'GET',
                            url: _this._debug?'api/lottery.json':'',
                            data: {} ,
                            dataType: 'json',
                            success: function(res){
                                if(res.code==10000){
                                    if(res.data.prizeid==0){
                                        var rd = Math.floor(Math.random()*5);
                                        var deg = 2160+rd*60+15;
                                    }else{
                                        var deg = 2160+_this._pids[res.data.prizeid]*60+45;
                                    }
                                    _this.elms.J_imgpo.attr('style','transform:rotate('+deg+'deg);-webkit-transform:rotate('+deg+'deg);')
                                    setTimeout(function(){
                                        if(res.data.prizetype==0){
                                            _this.elms.J_pops.show(),_this.elms.J_prize_no.show();
                                        }else if(res.data.prizetype==1){
                                            _this.elms.J_pops.show(),_this.elms.J_prize_one.show();
                                        }else{
                                            _this.elms.J_pops.show(),_this.elms.J_prize_two.show();
                                        }
                                    },5000)
                                }
                            }
                        })
                    }
                });
                $('.J_close').click(function(){
                    _this.elms.J_rule.hide();
                    _this.elms.J_prize_no.hide();
                    _this.elms.J_prize_one.hide();
                    _this.elms.J_prize_two.hide();
                    _this.elms.J_pops.hide();
                });
                _this.elms.J_rulebtn.click(function(){
                    _this.elms.J_pops.show(),_this.elms.J_rule.show();
                });
            },
            bindDate:function(){
                var _this = this;
                $.ajax({
                    type: 'GET',
                    url: _this._debug?'api/index.json':'',
                    data: {} ,
                    dataType: 'json',
                    success: function(res){
                        if(res.code==10000){
                            if(res.code!=10000){return false;}
                            var data = res.data,prize = data.prize,plen = prize.length;
                            if(data.isVip){
                                _this._isVip = data.isVip;
                                _this.elms.J_texttip.html('50积分转1次，可用积分'+data.init).show();
                            }
                            // for(var i=0;i<6;i++){
                            //     if(i>=plen){
                            //         _this.elms.J_img_pri.eq(i).attr('src',prize[i-3].img);
                            //     }else{
                            //         _this.elms.J_img_pri.eq(i).attr('src',prize[i].img);
                            //     }
                            //     if(prize[i]){
                            //         _this._pids[prize[i].id] = i;
                            //     }
                            // }
                            // console.log(_this._pids);
                            
                        }
                    }
                })
            },
            init: function(){
                this.bindDate();
                this.bindEvent();
            }
        };
    })();
    $(function(){
        page.init();
    });
})(jQuery, window, document);



