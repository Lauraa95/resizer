(function() {
    if (document.getElementById('custom-toolbar')) return;

    var loadJQuery = function(callback) {
        if (window.jQuery === undefined || window.jQuery.fn.jquery !== '3.5.1') {
            var script = document.createElement('script');
            script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
            script.onload = script.onreadystatechange = function() {
                var state = this.readyState;
                if (!state || state === 'loaded' || state === 'complete') {
                    callback(jQuery.noConflict(true));
                }
            };
            document.getElementsByTagName('head')[0].appendChild(script);
        } else {
            callback(window.jQuery);
        }
    };

    loadJQuery(function($) {
        var style = `
            <style>
                #custom-toolbar {
                    position: fixed;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 9999;
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    border-radius: 4px;
                    padding: 10px;
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                
                #custom-toolbar a {
                    color: white;
                    text-decoration: none;
                    margin: 5px;
                    padding: 5px 10px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }
                
                #custom-toolbar .material-icons {
                    vertical-align: middle;
                    cursor: pointer;
                }

                #custom-toolbar a:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            </style>
        `;
        $("head").append(style);
        
        var toolbarHtml = `
            <div id="custom-toolbar">
                <a href="javascript:void(0);" data-viewport="375x667">iPhone 8</a>
                <a href="javascript:void(0);" data-viewport="390x844">iPhone 13</a>
                <a href="javascript:void(0);" data-viewport="430x932">iPhone 15 Pro Max</a>
                <a href="javascript:void(0);" data-viewport="768x1024">iPad mini</a>
                <a href="javascript:void(0);" data-viewport="1024x1366">iPad Pro</a>
                <a href="javascript:void(0);" data-viewport="1440x900">MacBook 13"</a>
                <a href="javascript:void(0);" data-viewport="1536x960">MacBook 16"</a>
                <a href="javascript:void(0);" data-viewport="360x800">Samsung Galaxy S22</a>
                <a href="javascript:void(0);" data-viewport="360x800">Samsung Galaxy A13 (2022)</a>
                <a href="javascript:void(0);" data-viewport="1920x1080">HDTV 1080p</a>
                <a href="javascript:void(0);" id="zoom-in" class="material-icons">zoom_in</a>
                <a href="javascript:void(0);" id="zoom-out" class="material-icons">zoom_out</a>
            </div>
        `;
        $("body").append(toolbarHtml);

        function setViewport(width, height) {
            var iframe = $('#viewport-iframe');
            if (iframe.length === 0) {
                iframe = $('<iframe>', {
                    id: 'viewport-iframe',
                    css: {
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        border: 'none',
                        zIndex: 9998,
                        overflow: 'auto'
                    }
                }).appendTo('body');
            }
            iframe.css({
                width: width + 'px',
                height: height + 'px',
            });
        }
        
        $('#custom-toolbar a[data-viewport]').click(function() {
            var dimensions = $(this).attr('data-viewport').split('x');
            setViewport(parseInt(dimensions[0]), parseInt(dimensions[1]));
        });

        var zoomLevel = 1;
        
        $("#zoom-in").click(function() {
            zoomLevel += 0.1;
            if (zoomLevel > 2) zoomLevel = 2;
            $("body").css({
                'transform': 'scale(' + zoomLevel + ')',
                'transform-origin': '0 0'
            });
        });

        $("#zoom-out").click(function() {
            zoomLevel -= 0.1;
            if (zoomLevel < 0.5) zoomLevel = 0.5;
            $("body").css({
                'transform': 'scale(' + zoomLevel + ')',
                'transform-origin': '0 0'
            });
        });

        $("head").append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">');
    });
})();
