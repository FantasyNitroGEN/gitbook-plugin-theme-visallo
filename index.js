
module.exports = {
    hooks: {
        config: function(config) {
            config.styles = config.styles || config.pluginsConfig['theme-default'].styles;

            if ('VERSION_LIST' in process.env && 'VERSION_CURRENT' in process.env) {
                config.pluginsConfig['theme-visallo'].versions = process.env['VERSION_LIST'].split(/[\s,]+/);
                config.pluginsConfig['theme-visallo'].version = process.env['VERSION_CURRENT'];
            }

            return config;
        }
    }
};


