/*
    JQDesktop
    =========

    JQDesktop jQuery plugin

    Copyright (C) 2013  ilyes kooli

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, version 3.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/gpl.html>
 */


(function($){
    $.jqDesktop = {version:'1.0'};
    var jqDesktopMethods = {
        /**
         * jqDesktop initialisation
         */
        _init: function(options){            
            /*
             * If jqDesktop is called for the first time, append css to document header
             */            
            if($('head#desktopcss').length==0){
                var css = '\
                    .jqdesktop-window-titlebar-buttons button{width:24px;height:22px;}\n\
                    .jqdesktop-taskbar-container{cursor:default;margin-right:2px;max-width:250px;}\n\
                    .jqdesktop-taskbar-container,.jqdesktop-taskbar-icon,.jqdesktop-taskbar-label{float:left}\n\
                    .jqdesktop-taskbar-label{padding-left: 8px;padding-right: 4px;padding-top: 5px;}\n\
		    .jqdesktop-taskbar{background: #fff;}\n\
                    .jqdesktop-icon-container{position: relative;padding: 10px;padding-top: 10px;float:left;}\n\
                    .jqdesktop-icon-shadow{width:100%; height:100%;padding:4px;}\n\
		    .jqdesktop-content{background: url(/assets/blue-sky.jpg) no-repeat;background-size:cover;}\n\
                    .jqdesktop-icon{margin-top: -105%;cursor: default;width:100%;height:100%;padding:2px;}\n\
                    .jqdesktop-icon-image{width:100%;margin-left: 0%;}\n\
                    .jqdesktop-icon-label{margin-top: 5px;font-size:10px; text-align: center;background: none;border: none;width:120%;margin-left: -10%; color:#FFF;}\n\
                    .jqdesktop-icon-selected{border: #ffffff solid thin;}\n\
		    .jqwindow-app{background: url(/assets/appbackground.png);}\n\
                ';
                $('head').append('<style type="text/css">'+css+'</style>');
            }
            var settings = $.extend({}, $.jqDesktop.defaults, options);                
            return this.each(function(){
                var $this = $(this);

                if ($this.data('jqDesktopDesktop')) return; //If plugin is alread initiated abort                                

		if (settings.header === "") {
		  $this.html('');
		  var header = $('<div class="class="jqdesktop-header north ui-widget-content">Header</div>');
		  $this.append(header);
		} else {
		  var header = $(settings.header).addClass('jqdesktop-header north ui-widget-content"');
		}

		if (settings.taskBar === "") {
                  var taskBar = $('<div class="jqdesktop-taskbar south ui-widget-content" style="height:'+settings.taskBarHeight+'px">taskbar</div>').jqTaskBar({desktop:$this});
		   $this.append(taskBar);
		} else {
		   var taskBar = $(settings.taskBar).addClass('jqdesktop-taskbar south ui-widget-content').jqTaskBar({desktop:$this});
	        }

                taskBar.sortable({
                    revert: true
                });

		if (settings.content === "") {
                   var content = $('<div class="jqdesktop-content center ui-widget-content"></div>').css(settings.contentCss);                
		   $this.append(taskBar);
	        } else {
		   var content = $(settings.content).addClass('jqdesktop-content center ui-widget-content').css(settings.contentCss);
		}
	
		if(settings.statusBar === "") {
                  var statusBar = $('<div class="jqdesktop-statusbar north ui-widget-content" style="height:'+settings.statusBarHeight+'px">statusbar</div>');
                } else {
		  var statusBar = $(settings.statusBar).addClass('jqdesktop-statusbar north ui-widget-content');
	 	}

                var data = {
		    header:header,
                    taskBar:taskBar,
                    content:content,
                    statusBar:statusBar,
                    settings:settings,
                    _windows:[],
		    _installApp:[]
                }

                $this.data('jqDesktopDesktop', data);
                $this.addClass('ui-widget-content');

		if (settings.header == "") {
                  $this.jqLayout();       
		} else {
		  $this.layout({
         	     north: { 'size': '45'},
         	     south: { 'size': '35'}
    		  });
	        }

		// Fire the setup callback
      		$.isFunction( settings.done ) && settings.done.call( this );
            });
        },
        
        addWindow: function(jqWindow){
            if (!jqWindow) throw 'jqDesktop.addWindow() requires valid jqWindow instance';
            this.each(function(){
                var $this = $(this);                
                jqWindow.each(function(){           
                    var Window = $(this);                    
                    if (!Window.data('jqDesktopWindow')) throw 'jqDesktop.addWindow() requires valid jqWindow instance';
                    var data = $this.data('jqDesktopDesktop');

                    if ($.inArray(Window, data._windows)>-1) return;
                    data._windows.push(Window);

                    if ($.inArray(Window.attr('id'), data._installApp)>-1) return;
                    data._installApp.push(Window.attr('id'));

                    $(data.content).append(Window);
                    var windowSettings = Window.data('jqDesktopWindow').settings;
                    if (windowSettings.showInTaskBar){
                        data.taskBar.jqTaskBar('addWindow', Window);
                    }                                            
                    $.extend(true,Window.data('jqDesktopWindow'),{desktop:$this});
                    $this.jqDesktop('activateWindow', Window); 
		    if(windowSettings.showDesktopIcon) {
                      $(data.content).append($.jqIcon({window:Window, label:windowSettings.title, icon:windowSettings.icon, width:data.settings.iconWidth,height:data.settings.iconHeight}));
		    }
                    Window.trigger('windowAdded');
                });
            });            
        },
        activateWindow: function(jqWindow){
            this.each(function(){
                var $this = $(this);                
                jqWindow.each(function(){
                    var Window = $(this);   
                    $this.data('jqDesktopDesktop').taskBar.jqTaskBar('activateWindow', Window);                     
                });
            });
        },
        minimizeWindow: function(jqWindow){
            this.each(function(){
                var $this = $(this);                
                jqWindow.each(function(){
                    var Window = $(this);   
                    $this.data('jqDesktopDesktop').taskBar.jqTaskBar('minimizeWindow', Window);
                });
            });            
        },
        unminimizeWindow: function(jqWindow){
            this.each(function(){
                var $this = $(this);                
                jqWindow.each(function(){
                    var Window = $(this);   
                    $this.data('jqDesktopDesktop').taskBar.jqTaskBar('unminimizeWindow', Window);
                });
            });            
        },
        maximizeWindow: function(jqWindow){
            this.each(function(){
                var $this = $(this);                
                jqWindow.each(function(){
                    var Window = $(this);   
                    $this.data('jqDesktopDesktop').taskBar.jqTaskBar('maximizeWindow', Window);
                });
            });            
        },
        restoreWindow: function(jqWindow){
            this.each(function(){
                var $this = $(this);                
                jqWindow.each(function(){
                    var Window = $(this);   
                    $this.data('jqDesktopDesktop').taskBar.jqTaskBar('restoreWindow', Window);
                });
            });            
        },
        closeWindow: function(jqWindow){
            this.each(function(){
                var $this = $(this);                
                jqWindow.each(function(){
                    var Window = $(this); 
                    $this.data('jqDesktopDesktop').taskBar.jqTaskBar('closeWindow', Window);
                });
            });            
        },
        hideWindow: function(jqWindow){
            this.each(function(){
                var $this = $(this);                
                jqWindow.each(function(){
                    var Window = $(this); 
                    $this.data('jqDesktopDesktop').taskBar.jqTaskBar('hideWindow', Window);
                });
            });            
        },
        disposeWindow: function(jqWindow){
            this.each(function(){
                var $this = $(this);                
                jqWindow.each(function(){
                    var Window = $(this); 
                    $this.data('jqDesktopDesktop').taskBar.jqTaskBar('disposeWindow', Window);
                });
            });            
        },
        showWindow: function(jqWindow){
            this.each(function(){
                var $this = $(this);                
                jqWindow.each(function(){
                    var Window = $(this); 
                    $this.data('jqDesktopDesktop').taskBar.jqTaskBar('showWindow', Window);
                });
            });            
        }
    };
    
    /**
     * jqDesktop plugin entry point
     */
    $.fn.jqDesktop = function(method){
        if (jqDesktopMethods[method]){//call a method
            return jqDesktopMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
             return jqDesktopMethods._init.apply( this, arguments );
        }
    }
    
    
    $.jqDesktop.defaults = {
        //Dimensions:
        taskBarHeight:30,
        statusBarHeight:30,
        //
	done: null,
	taskBar: '',
        showTaskBar:true,
	header: '',
	content: '',
        contentCss:{},
        iconWidth:100,
        iconHeight:100
    }
})(jQuery);

