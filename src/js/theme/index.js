var dropdown =   require('./dropdown');
var keyboard =   require('./keyboard');
var navigation = require('./navigation');
var sidebar =    require('./sidebar');
var toolbar =    require('./toolbar');

var gitbook = window.gitbook;

function init() {
    // Init sidebar
    sidebar.init();

    // Init keyboard
    keyboard.init();

    // Bind dropdown
    dropdown.init();

    // Init navigation
    navigation.init();

    // Add action to toggle sidebar
    toolbar.createButton({
        index: 0,
        icon: 'fa fa-align-justify',
        onClick: function(e) {
            e.preventDefault();
            sidebar.toggle();
        }
    });

    var config = gitbook.state.config.pluginsConfig['theme-visallo'];
    if ('versions' in config && 'version' in config) {
        var versions = config.versions;
        var version = config.version;
        var prefixRegex = /^\/(versions\/[^\/]+\/)?/;
        toolbar.createButton({
            text: 'Version: ' + version,
            position: 'right',
            className: 'version-selector',
            dropdown: versions.map(function(v) {
                return {
                    text: v,
                    className: version === v ? 'disabled' : '',
                    onClick: function() {
                        location.href = '/versions/' + v + '/' +
                            location.pathname.replace(prefixRegex, '');
                    }
                };
            })
        });
    }
}

gitbook.events.on('start', init);

gitbook.keyboard = keyboard;
gitbook.navigation = navigation;
gitbook.sidebar = sidebar;
gitbook.toolbar = toolbar;
