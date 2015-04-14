Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
            models: ['recyclebinentry'],
            autoLoad: true
        }).then({
            success: this._onStoreBuilt,
            scope: this
        });
    },

    _onStoreBuilt: function(store) {
        var modelNames = ['recyclebinentry'],
            context = this.getContext();
        this.add({
            xtype: 'rallygridboard',
            context: context,
            modelNames: modelNames,
            toggleState: 'grid',
            stateful: false,
            plugins: [
                {
                    ptype: 'rallygridboardcustomfiltercontrol',
                    filterControlConfig: {
                        modelNames: modelNames,
                        stateful: true,
                        stateId: context.getScopedStateId('custom-filter-example')
                    }
                }
            ],
            gridConfig: {
                store: store,
                columnCfgs: [
                    'ID',
                    'Name',
                    'DeletionDate',
                    'DeletedBy'
                ]
            },
            height: this.getHeight()
        });
    }
});

