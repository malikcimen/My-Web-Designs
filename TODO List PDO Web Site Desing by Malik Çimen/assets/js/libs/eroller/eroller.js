/*!
 * Easy Roller v1.0
 * http://22codes.com/
 *
 * requires jQuery JavaScript Library
 * https://jquery.com/
 *
 * Released under Codecanyon Standard license
 * https://codecanyon.net/licenses/standard
 *
 */
;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    'use strict';
    var eRoller = window.eRoller || {};
    eRoller = (function() {
        function eRoller(element, settings) {
            var self = this, dataSettings;
            self.defaults = {
                items: [],
                speed: 10000,
                indicator: true,
                key: 'text',
                align: 'h',
                itemPos: 'left',
                easing: 'default',
				to : 'left',
            };
            dataSettings = $(element).data('eroller') || {};
            self.o = $.extend({}, self.defaults, settings, dataSettings);
            if(typeof self.o.items !== 'object' || (typeof self.o.items === 'object' && self.o.items.length === 0)) return self;
			self.o.direction = ($.trim(self.o.align) === 'vertical' || $.trim(self.o.align) === 'v') ? (self.o.direction !== 'top' ? 'top' : 'bottom') : (self.o.direction !== 'left' ? 'right' : 'left');
			self.initials = {
                items		: self.o.items,
				key			: self.o.key,
                duplicate	: 8,
                groupWidth	: 0,
                groupHeight	: 0,
                firstHalf	: 0,
                gotowinner	: null,
                winnerPos	: null,
                speed	: parseInt(self.o.speed,10) ? parseInt(self.o.speed,10) : 8000,
                coutDur		: null,
                currDur		: 0,
                spinning	: false,
                inProgress	: false,
                timer		: false,
                progress	: false,
                animating	: false,
                to			: $.trim(self.o.direction) === 'bottom' ? '-' : ( $.trim(self.o.direction) === 'left' ? '-' : ''),
                nonce		: null,
                $el			: $(element),
                $container	: null,
                $game		: null,
                winner		: null,
                data		: null,
                originClass	: $(element).attr('class'),
            };
			self.initials.easing = {
				default			: 'cubic-bezier(0, 0, 0.28, 1)',
				linear			: 'cubic-bezier(0, 0, 1, 1)',
				easeInSine		: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
				easeOutSine		: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
				easeInOutSine	: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
				easeInQuad		: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
				easeOutQuad		: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				easeInOutQuad	: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
				easeInCubic		: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
				easeOutCubic	: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
				easeInOutCubic	: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
				easeInQuart		: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
				easeOutQuart	: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
				easeInOutQuart	: 'cubic-bezier(0.77, 0, 0.175, 1)',
				easeInQuint		: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
				easeOutQuint	: 'cubic-bezier(0.23, 1, 0.32, 1)',
				easeInOutQuint	: 'cubic-bezier(0.86, 0, 0.07, 1)',
				easeInExpo		: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				easeOutExpo		: 'cubic-bezier(0.19, 1, 0.22, 1)',
				easeInOutExpo	: 'cubic-bezier(1, 0, 0, 1)',
				easeInCirc		: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
				easeOutCirc		: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
				easeInOutCirc	: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
				easeInBack		: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
				easeOutBack		: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				easeInOutBack	: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			};
            $.extend(self, self.initials);
			self.init()
			setTimeout(function(){
				self.$el.trigger('eroller.init');
			},100);
        }
        return eRoller;
    }());
    eRoller.prototype.destroy = function(args) {
        var self = this;
        if (self.inProgress) {
            self.inProgress = false;
        }
        self.clearAnimation();
        self.$el.html('');
        self.$el.attr('class',self.originClass);
        self.$el.removeClass('eroller');
        $.extend(self.o, self.defaults);
        $.extend(self, self.initials);
        self.$el.off('eroller.start');
        self.$el.off('eroller.stop');
        self.$el.off('eroller.complete');
        self.$el.off('eroller.progress');
        self.$el.off('eroller.clear');
        self.$el.off('eroller.finish');
        self.$el.off('eroller.init');
    };
    eRoller.prototype.option = function(option, newValue) {
        var self = this;
        if ($.inArray(typeof newValue, ['undefined', 'function']) !== -1 || $.inArray(typeof self.o[option], ['undefined', 'function']) !== -1)
            return;
        var allowed = ['easing', 'speed'];
        if ($.inArray(option, allowed) == -1)
            return;
        self.o[option] = newValue;
    };
    eRoller.prototype.init = function() {
        var self = this;
        self.total = self.items.length;

        self.$el.html('');
        self.$game = $('<div class="er-inner"></div>');
        var indicator = $('<div class="er-indicator"></div>');
        self.$container = $('<div class="er-container"></div>');
        var contents = $('<div class="er-contents"></div>');
		self.$el.addClass('eroller');
         self.$container.append(self.$game);
        contents.append( self.$container);
		if(self.o.indicator === true || self.o.indicator === 'true')
			contents.append(indicator);
        self.$el.append(contents);
        var i = 0;
        var has_image = '';
        for (var x = 0; x < (self.total * self.duplicate); x++) {
            i = x % self.total;
			has_image = (typeof self.items[i].img !== 'undefined' || typeof self.items[i].image !== 'undefined' ) ? ' er-has-img' : '';
            self.$game.append('<div class="er-item' + has_image + (typeof self.items[i].class !== 'undefined' ? ' '+self.items[i].class : '') + '" data-class="er-item ' + (typeof self.items[i].class !== 'undefined' ? self.items[i].class : '') + '">'
								
								+ (typeof self.items[i].img !== 'undefined' ? '<img src="' + self.items[i].img + '" />' : ( typeof self.items[i].image !== 'undefined' ? '<div class="cover" style="background-image:url('+self.items[i].image+')"></div>' : '') )
								
								+ (typeof self.items[i][self.o.key] !== 'undefined' ? '<span>'+self.items[i][self.o.key]+'</span>' : '')
								+ '</div>');
        }
		if(self.$game.find('>.er-item').length !== 0){
			var firstHalf = ( ($.trim(self.o.align) === 'vertical' || $.trim(self.o.align) === 'v') ? self.$game.find('>.er-item').eq(0).outerHeight(true) : self.$game.find('>.er-item').eq(0).outerWidth(true) ) / 2;
			self.firstHalf =  ( self.to === '-' ? firstHalf : -firstHalf );
			self.$game.css({
				'-webkit-transform': self.matrix(self.to + self.firstHalf),
				'-moz-transform': self.matrix(self.to + self.firstHalf),
				'-ms-transform': self.matrix(self.to + self.firstHalf),
				'-o-transform': self.matrix(self.to + self.firstHalf),
				'transform': self.matrix(self.to + self.firstHalf)
			});
			self.rollTo(self.to,self.firstHalf);
		}
        for (var x = 0; x < self.total; x++) {
            self.groupWidth		+= self.$game.find('>.er-item').eq(x).outerWidth(true);
            self.groupHeight	+= self.$game.find('>.er-item').eq(x).outerHeight(true);
        }
        self.innerWidth = self.groupWidth * self.duplicate;
        self.innerHeight = self.groupHeight * self.duplicate;
		if($.trim(self.o.align) === 'vertical' || $.trim(self.o.align) === 'v'){
			self.$el.addClass('er-ver to-'+ self.o.direction);
			self.$game.height(self.innerHeight).width('').css('margin-bottom',self.to+( self.innerHeight / 2 )+'px');
		}else{
			self.$el.addClass('er-hor to-'+ self.o.direction);
			self.$game.width(self.innerWidth).height('').css('margin-left',( self.to === '-' ? '' : '-' )+( self.innerWidth / 2 )+'px');;
		}
    };
    eRoller.prototype.start = function(key, value, speed) {
        var self = this;
        if (self.$game === null)
            return;
		self.clearAnimation();
        self.run(key, value, speed);
    };
	eRoller.prototype.stop = function() {
		var self = this;
		var currentPosition = self.getTransform();
		self.clearAnimation();
		self.$game.css({
			'-webkit-transition': 'transform 0 ms ',
			'-moz-transition': 'transform 0 ms ',
			'-ms-transition': 'transform 0 ms ',
			'-o-transition': 'transform 0 ms ',
			'transition': 'transform 0 ms ',
			'-webkit-transform': currentPosition,
			'-moz-transform': currentPosition,
			'-ms-transform': currentPosition,
			'-o-transform': currentPosition,
			'transform': currentPosition,
		});
		self.$el.trigger('eroller.stop',self.data);
	};
    eRoller.prototype.finish = function() {
        var self = this;
        if (self.$game === null)
            return;
        if (self.progress)
            clearInterval(self.progress);
		self.inProgress = false;
		if (self.animating)
            clearInterval(self.animating);
        if (self.timer)
            clearTimeout(self.timer);
		if (self.coutDur)
            clearInterval(self.coutDur);
		self.currDur = 0;
        self.rollTo(self.to,self.gotowinner,0);
        self.$el.trigger('eroller.finish',self.data);
    };
    eRoller.prototype.run = function( key, value, speed ) {
        var self = this;
		if (self.animating)
			clearInterval(self.animating);
        if (self.$game === null)
            return;
        if (self.inProgress === false) {
            self.winner = self.findValue(key, value);
			self.data = jQuery.extend(true,{}, self.items[self.winner]);
            if (typeof self.winner === 'undefined') {
				 self.$el.trigger('eroller.fail');
                return;
            } else {
                self.inProgress = true;
            }
            speed = (parseInt(speed,10) ? parseInt(speed,10) : self.speed);
			self.setCurrentspeed();
			speed -= self.currDur;
            var winnerPos = 0;
			for (var x = 0; x < ( self.to === '' ? ((self.items.length - self.winner)) : self.winner); x++) {
                winnerPos += ($.trim(self.o.align) === 'vertical' || $.trim(self.o.align) === 'v') ? self.$game.find('>.er-item').eq(x).outerHeight(true) : self.$game.find('>.er-item').eq(x).outerWidth(true);
            }
            if($.trim(self.o.align) === 'vertical' || $.trim(self.o.align) === 'v'){
				var _itemSize = self.$game.find('>.er-item').eq(self.winner).outerHeight(true);
				var spaceBefore = parseFloat(self.$game.find('>.er-item').eq(self.winner).css('margin-top').replace(/[^0-9.]/g, "")) + parseFloat(self.$game.find('>.er-item').eq(self.winner).css('border-top-width').replace(/[^0-9.]/g, "")) + 2;
				var spaceAfter = parseFloat(self.$game.find('>.er-item').eq(self.winner).css('margin-bottom').replace(/[^0-9.]/g, "") + parseFloat(self.$game.find('>.er-item').eq(self.winner).css('border-bottom-width').replace(/[^0-9.]/g, ""))) - 2;
				_itemSize =  ( self.to === '-' ? _itemSize : -_itemSize );
			}else{
				var _itemSize = self.$game.find('>.er-item').eq(self.winner).outerWidth(true);
				var spaceBefore = parseFloat(self.$game.find('>.er-item').eq(self.winner).css('margin-left').replace(/[^0-9.]/g, "")) + parseFloat(self.$game.find('>.er-item').eq(self.winner).css('border-left-width').replace(/[^0-9.]/g, "")) + 2;
				var spaceAfter = parseFloat(self.$game.find('>.er-item').eq(self.winner).css('margin-right').replace(/[^0-9.]/g, "") + parseFloat(self.$game.find('>.er-item').eq(self.winner).css('border-right-width').replace(/[^0-9.]/g, ""))) - 2;
				_itemSize =  ( self.to === '-' ? _itemSize : -_itemSize );
			}
			self.gotowinner = winnerPos + (self.o.itemPos === 'center' ? (_itemSize / 2) : self.getRandomInt(spaceBefore, _itemSize - spaceAfter));
            var halfSize = ($.trim(self.o.align) === 'vertical' || $.trim(self.o.align) === 'v') ? (self.innerHeight / 2) : (self.innerWidth / 2);
            self.winnerPos = halfSize + self.gotowinner;
            self.$el.trigger('eroller.start');
			var easing = typeof self.easing[self.o.easing] !== 'undefined' ? self.easing[self.o.easing] : self.easing.default;
			self.rollTo(self.to,self.winnerPos,speed,easing);
			self.progress = setInterval(function() {
                self.$el.trigger('eroller.progress');
            }, 1);
            self.timer = setTimeout(function() {
                clearInterval(self.progress);
                clearInterval(self.coutDur);
				self.currDur = 0;
				self.rollTo(self.to,self.gotowinner,0);
                self.inProgress = false;
                self.$el.trigger('eroller.complete',self.data);
            }, speed);
        }
    };
	eRoller.prototype.clear = function() {
		var self = this;
		self.clearAnimation();
        self.$el.trigger('eroller.clear');
    };
	eRoller.prototype.animate = function(speed) {
        var self = this;
        if (self.$game === null)
            return;
		speed = parseInt(speed,10) ? parseInt(speed,10) : self.speed;
		self.setCurrentspeed();
        var _pos = (self.winnerPos !== null) ? self.winnerPos : self.firstHalf + ( ( ($.trim(self.o.align) === 'vertical' || $.trim(self.o.align) === 'v') ? self.groupHeight : self.groupWidth) * 4 );
		self.rollTo(self.to,_pos,speed);
		self.animating = setInterval(function(){
			self.rollTo(self.to,(self.gotowinner !== null) ? self.gotowinner : self.firstHalf);
			self.$game.animate({  to: 0 }, {
				step: function(now,fx) {
					self.rollTo(self.to,_pos,speed);
				},
			},'linear');
		},speed);
    };
	eRoller.prototype.clearAnimation = function() {
		var self = this;
        if (self.$game === null)
            return;
        if (self.progress)
            clearInterval(self.progress);
		if (self.animating)
            clearInterval(self.animating);
        if (self.timer)
            clearTimeout(self.timer);
		if (self.coutDur)
			clearInterval(self.coutDur);
        self.inProgress = false;
		self.rollTo('',0,0);
    };
	 eRoller.prototype.setCurrentspeed = function() {
		var self = this;
		var start = new Date().getTime() - self.currDur;
		self.coutDur = setInterval(function() {
			var now = new Date().getTime();
			self.currDur = (now - start);
		}, 1);
	};
	eRoller.prototype.matrix = function(value) {
        var self = this;
		if($.trim(self.o.align) === 'vertical' || $.trim(self.o.align) === 'v')
			return 'matrix(1, 0, 0, 1, 0, ' + value + ')';
		else
			return 'matrix(1, 0, 0, 1, ' + value + ',0)';
    };
	eRoller.prototype.getTransform = function() {
		var self = this;
		return self.$game.css("-webkit-transform") || self.$game.css("-moz-transform") || self.$game.css("-ms-transform") || self.$game.css("-o-transform") || self.$game.css("transform");
	};
	eRoller.prototype.rollTo = function(to, pos, speed, easing) {
		var self = this;
		if(!to) to = ''; if(!pos) pos = 0; if(!speed) speed = 0; if(!easing) easing = 'linear';
		self.$game.css({
			'-webkit-transition': 'transform ' + speed + 'ms '+easing,
			'-moz-transition': 'transform ' + speed + 'ms '+easing,
			'-ms-transition': 'transform ' + speed + 'ms '+easing,
			'-o-transition': 'transform ' + speed + 'ms '+easing,
			'transition': 'transform ' + speed + 'ms '+easing,
			'-webkit-transform': self.matrix(to + pos),
			'-moz-transform': self.matrix(to + pos),
			'-ms-transform': self.matrix(to + pos),
			'-o-transform': self.matrix(to + pos),
			'transform': self.matrix(to + pos),
		});
	};
    eRoller.prototype.findValue = function(key, value) {
        var self = this;
        var index = undefined;
        if (typeof self.items !== 'object' && typeof self.items !== 'array')
            return undefined;
        for (var x = 0; x < self.items.length; x++) {
            if (typeof self.items[x][key] === 'undefined')
                break;
            if (self.items[x][key] === value) {
                index = x;
                break;
            }
        }
        return index;
    };
    eRoller.prototype.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    $.fn.eroller = function() {
        var self = this, opt = arguments[0], args = Array.prototype.slice.call(arguments, 1), l = self.length, i, apply, methods = ['option', 'start', 'clear', 'finish', 'destroy', 'stop', 'animate'];
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined') {
                self[i].eroller = new eRoller(self[i],opt);
				self[i].eroller.$el.trigger('eroller.init');
				
            } else if ($.inArray($.trim(opt), methods) !== -1) {
                apply = self[i].eroller[opt].apply(self[i].eroller, args);
            }
            if (typeof apply != 'undefined')
                return apply;
        }
        return self;
    };
}));