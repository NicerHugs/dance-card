(function() {
  'use strict';

  //thanks to Sasha (http://codepen.io/Boshnik/) for this lovely calendar date picker

  DanceCard.Forms = {};

  DanceCard.Forms.monthNames = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
  };

  DanceCard.Forms.monthNums = _.invert(DanceCard.Forms.MonthNames);

  DanceCard.Forms.Cal = function(id, label) {
    var self = this;

    this.date = {};
    this.markup = {};
    this.date.today = new Date();
    this.date.today = new Date(this.date.today.getUTCFullYear(),this.date.today.getUTCMonth(),this.date.today.getUTCDate());
    this.date.browse = new Date();
    this.markup.row = "row";
    this.markup.cell = "cell";
    this.markup.inactive = "g";
    this.markup.currentMonth = "mn";
    this.markup.slctd = "slctd";
    this.markup.today = "today";
    this.markup.dayArea = "dayArea";
    this.elementTag = id + '-calendar';
    this.targetInput = '#' + id;
    this.init = false;
    this.buildDOM();
    this.selectDate(this.date.today.getFullYear(),this.date.today.getMonth(),this.date.today.getDate());
    this.constructDayArea(null, id);
    this.updateInput(label,'','');

    $(document).ready(function(){
      $(document).click(function(event){
        var el = $('.' + self.elementTag + ' .view'),
            eco = el.offset();
        if(event.pageX<eco.left || event.pageX>eco.left+el.width() || event.pageY<eco.top || event.pageY>eco.top+el.height()) {
          if(!self.init) self.hide(300);
        }
      });
      $('.'+self.elementTag).on('click','.next-month',function(){
        self.setMonthNext();
      });
      $('.'+self.elementTag).on('click','.prev-month',function(){
        self.setMonthPrev();
      });
      $('.'+self.elementTag).on('click','.next-year',function(){
        self.setYearNext();
      });
      $('.'+self.elementTag).on('click','.prev-year',function(){
        self.setYearPrev();
      });

      $('.'+self.elementTag).on('click','.jump-to-next-month',function(){
        self.setMonthNext();
      });
      $('.'+self.elementTag).on('click','.jump-to-previous-month',function(){
        self.setMonthPrev();
      });

      $('.'+self.elementTag).on('click','.'+self.markup.currentMonth,function(){
        var d = self.selectDate(self.date.browse.getUTCFullYear(),self.date.browse.getUTCMonth(),$(this).html());
        self.hide(300);
      });

      $('.'+self.elementTag).on('click','.title',function(){
        self.date.browse = new Date(self.date.today.getTime());
        self.constructDayArea(false);
      });

      $('#' + id).focus(function(){
        self.show(100);
        $(this).blur();
      });

    });

  };

  DanceCard.Forms.Cal.prototype.wd = function(wd) {
    if(wd===0) return 7;
    return wd;
  };

  DanceCard.Forms.Cal.prototype.buildDOM = function() {
    var html = DanceCard.templates.calendar({id: this.targetInput.slice(1)});
    $(html).insertBefore(this.targetInput);
    $(this.targetInput).css('cursor','pointer');
    this.hide(300);
  };

  DanceCard.Forms.Cal.prototype.constructDayArea = function(flipDirection, id) {
    var newViewContent = "",
        wd = this.wd(this.date.browse.getUTCDay()),
        d = this.date.browse.getUTCDate(),
        m = this.date.browse.getUTCMonth(),
        y = this.date.browse.getUTCFullYear(),
        monthBgnDate = new Date(y,m,1),
        monthBgn = monthBgnDate.getTime(),
        monthEndDate = new Date(this.getMonthNext().getTime()-1000*60*60*24),
        monthEnd = monthEndDate.getTime(),
        monthBgnWd = this.wd(monthBgnDate.getUTCDay()),
        itrBgn = monthBgnDate.getTime()-(monthBgnWd-1)*1000*60*60*24,
        i = 1,
        n = 0,
        dayItr = itrBgn;
    newViewContent += "<div class='"+this.markup.row+"'>\n";
    while(n<42) {
      var cls = new Array("C",this.markup.cell);
      if(dayItr<=monthBgn) cls.push(this.markup.inactive,"jump-to-previous-month");
      else if(dayItr>=monthEnd+1000*60*60*36) cls.push(this.markup.inactive,"jump-to-next-month");
      else cls.push(this.markup.currentMonth);
      if(dayItr==this.date.slctd.getTime()+1000*60*60*24) cls.push(this.markup.slctd);
      if(dayItr==this.date.today.getTime()+1000*60*60*24) cls.push(this.markup.today);

      var date = new Date(dayItr);
      newViewContent += "<div class='"+cls.join(" ")+"'>"+date.getUTCDate()+"</div>\n";
      i += 1;
      if(i>7) {
        i = 1;
        newViewContent += "</div>\n<div class='"+this.markup.row+"'>\n";
      }
      n += 1;
      dayItr = dayItr+1000*60*60*24;
    }
    newViewContent += "</div>\n";


    this.changePage(newViewContent,flipDirection);
    $('.'+this.elementTag+' .title .m').html(DanceCard.Forms.monthNames[m]);
    $('.'+this.elementTag+' .title .y').html(y);
    return newViewContent;
  };

  DanceCard.Forms.Cal.prototype.changePage = function(newPageContent,flipDirection) {
    var multiplier = -1,
        mark = "-";
    if(flipDirection) {
      multiplier = 1;
      mark = "+";
    }

    var oldPage = $('.'+this.elementTag+' .'+this.markup.dayArea+' .mArea'),
        newPage = $("<div class='mArea'></div>").html(newPageContent);
    $('.'+this.elementTag+' .'+this.markup.dayArea).append(newPage);
    oldPage.remove();
  };

  DanceCard.Forms.Cal.prototype.selectDate = function(y,m,d) {
    this.date.slctd = new Date(y,m,d);
    this.updateInput(y,m,d);
    this.constructDayArea(false);
    return this.date.slctd;
  };

  DanceCard.Forms.Cal.prototype.updateInput = function(y,m,d) {
    if(m==='') m = '';
    else m = DanceCard.Forms.monthNames[m];
    $(this.targetInput).val(m+" "+d+" "+y);
  };

  DanceCard.Forms.Cal.prototype.getMonthNext = function() {
    var m = this.date.browse.getUTCMonth(),
        y = this.date.browse.getUTCFullYear();
    if(m+1>11) return new Date(y+1,0);
    else return new Date(y,m+1);
  };

  DanceCard.Forms.Cal.prototype.getMonthPrev = function() {
    var m = this.date.browse.getUTCMonth(),
        y = this.date.browse.getUTCFullYear();
    if(m-1<0) return new Date(y-1,11);
    else return new Date(y,m-1);
  };

  DanceCard.Forms.Cal.prototype.setMonthNext = function() {
    var m = this.date.browse.getUTCMonth(),
        y = this.date.browse.getUTCFullYear();
    if(m+1>11) {
      this.date.browse.setUTCFullYear(y+1);
      this.date.browse.setUTCMonth(0);
    } else {
      this.date.browse.setUTCMonth(m+1);
    }
    this.constructDayArea(false);
  };

  DanceCard.Forms.Cal.prototype.setMonthPrev = function() {
    var m = this.date.browse.getUTCMonth(),
        y = this.date.browse.getUTCFullYear();
    if(m-1<0) {
      this.date.browse.setUTCFullYear(y-1);
      this.date.browse.setUTCMonth(11);
    } else {
      this.date.browse.setUTCMonth(m-1);
    }
    this.constructDayArea(true);
  };

  DanceCard.Forms.Cal.prototype.setYearNext = function() {
    var y = this.date.browse.getUTCFullYear();
    this.date.browse.setUTCFullYear(y+1);
    this.constructDayArea(false);
  };

  DanceCard.Forms.Cal.prototype.setYearPrev = function() {
    var y = this.date.browse.getUTCFullYear();
    this.date.browse.setUTCFullYear(y-1);
    this.constructDayArea(true);
  };

  DanceCard.Forms.Cal.prototype.hide = function(duration) {
    $('.'+this.elementTag+' .view').slideUp(duration);
  };

  DanceCard.Forms.Cal.prototype.show = function(duration) {
    var t = this;
    t.init = true;
    $('.'+this.elementTag+' .view').slideDown(duration,function(){
      t.init = false;
    });
  };

})();
