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
        var usersPreferredVersion = gitbook.storage.get('version');
        var currentVersion = (versions.indexOf(usersPreferredVersion) >= 0) ?
            usersPreferredVersion : version;
        var prefixRegex = /^\/(versions\/[^\/]+\/)?/;
        toolbar.createButton({
            text: 'Version: ' + currentVersion,
            position: 'right',
            className: 'version-selector',
            dropdown: versions.map(function(version) {
                return {
                    text: version,
                    className: version === currentVersion ? 'disabled' : '',
                    onClick: function() {
                        gitbook.storage.set('version', version);
                        location.href = '/versions/' + version + '/' +
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
