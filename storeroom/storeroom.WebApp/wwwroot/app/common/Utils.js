Ext.define('Ext.ux.TreePickerEx', {
    extend: 'Ext.form.field.Picker',
    xtype: 'treepickerex',

    uses: [
        'Ext.tree.Panel'
    ],

    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',

    config: {
        /**
         * @cfg {Ext.data.TreeStore} store
         * A tree store that the tree picker will be bound to
         */
        store: null,

        /**
         * @cfg {String} displayField 
         * The field inside the model that will be used as the node's text.
         * Defaults to the default value of {@link Ext.tree.Panel}'s `displayField` configuration.
         */
        displayField: null,

        /**
         * @cfg {Array} columns 
         * An optional array of columns for multi-column trees
         */
        columns: null,

        /**
         * @cfg {Boolean} selectOnTab 
         * Whether the Tab key should select the currently highlighted item. Defaults to `true`.
         */
        selectOnTab: true,

        /**
         * @cfg {Number} maxPickerHeight 
         * The maximum height of the tree dropdown. Defaults to 300.
         */
        maxPickerHeight: 300,

        /**
         * @cfg {Number} minPickerHeight 
         * The minimum height of the tree dropdown. Defaults to 100.
         */
        minPickerHeight: 100
    },

    editable: false,

    /**
     * @event select
     * Fires when a tree node is selected
     * @param {Ext.ux.TreePicker} picker        This tree picker
     * @param {Ext.data.Model} record           The selected record
     */

    initComponent: function () {
        var me = this;

        me.callParent(arguments);

        me.mon(me.store, {
            scope: me,
            load: me.onLoad,
            update: me.onUpdate
        });
    },

    /**
     * Creates and returns the tree panel to be used as this field's picker.
     */
    createPicker: function () {
        var me = this,
            picker = new Ext.tree.Panel({
                baseCls: Ext.baseCSSPrefix + 'boundlist',
                shrinkWrapDock: 2,
                store: me.store,
                floating: true,
                displayField: me.displayField,
                columns: me.columns,
                rootVisible: me.rootVisible,
                minHeight: me.minPickerHeight,
                maxHeight: me.maxPickerHeight,
                manageHeight: false,
                shadow: false,
                listeners: {
                    scope: me,
                    itemclick: me.onItemClick,
                    itemkeydown: me.onPickerKeyDown
                }
            }),
            view = picker.getView();

        if (Ext.isIE9 && Ext.isStrict) {
            // In IE9 strict mode, the tree view grows by the height of the horizontal scroll bar when the items are highlighted or unhighlighted. 
            // Also when items are collapsed or expanded the height of the view is off. Forcing a repaint fixes the problem. 
            view.on({
                scope: me,
                highlightitem: me.repaintPickerView,
                unhighlightitem: me.repaintPickerView,
                afteritemexpand: me.repaintPickerView,
                afteritemcollapse: me.repaintPickerView
            });
        }
        return picker;
    },

    /**
     * repaints the tree view
     */
    repaintPickerView: function () {
        var style = this.picker.getView().getEl().dom.style;

        // can't use Element.repaint because it contains a setTimeout, which results in a flicker effect 
        style.display = style.display;
    },

    /**
     * Handles a click even on a tree node
     * @private
     * @param {Ext.tree.View} view
     * @param {Ext.data.Model} record
     * @param {HTMLElement} node 
     * @param {Number} rowIndex 
     * @param {Ext.event.Event} e
     */
    onItemClick: function (view, record, node, rowIndex, e) {
        this.selectItem(record);
    },

    /**
     * Handles a keypress event on the picker element
     * @private
     * @param {Ext.event.Event} e
     * @param {HTMLElement} el 
     */
    onPickerKeyDown: function (treeView, record, item, index, e) {
        var key = e.getKey();

        if (key === e.ENTER || (key === e.TAB && this.selectOnTab)) {
            this.selectItem(record);
        }
    },

    /**
     * Changes the selection to a given record and closes the picker
     * @private
     * @param {Ext.data.Model} record
     */
    selectItem: function (record) {
        var me = this;
        me.setValue(record.getId());
        me.fireEvent('select', me, record);
        me.collapse();
    },

    /**
     * Runs when the picker is expanded.  Selects the appropriate tree node based on the value of the input element,
     * and focuses the picker so that keyboard navigation will work.
     * @private
     */
    onExpand: function () {
        var picker = this.picker,
            store = picker.store,
            value = this.value,
            node;


        if (value) {
            node = store.getNodeById(value);
        }

        if (!node) {
            node = store.getRoot();
        }

        picker.ensureVisible(node, {
            select: true,
            focus: true
        });
    },

    /**
     * Sets the specified value into the field
     * @param {Mixed} value 
     * @return {Ext.ux.TreePicker} this
     */
    setValue: function (value) {
        var me = this,
            record;

        me.value = value;

        if (me.store.loading) {
            // Called while the Store is loading. Ensure it is processed by the onLoad method. 
            return me;
        }

        // try to find a record in the store that matches the value 
        record = value ? me.store.getNodeById(value) : me.store.getRoot();
        if (value === undefined) {
            record = me.store.getRoot();
            me.value = record.getId();
        } else {
            record = me.store.getNodeById(value);
        }

        // set the raw value to the record's display field if a record was found 
        me.setRawValue(record ? record.get(me.displayField) : '');

        return me;
    },

    getSubmitValue: function () {
        return this.value;
    },

    /**
     * Returns the current data value of the field (the idProperty of the record)
     * @return {Number}
     */
    getValue: function () {
        return this.value;
    },

    /**
     * Handles the store's load event.
     * @private
     */
    onLoad: function () {
        var value = this.value;

        if (value) {
            this.setValue(value);
        }
    },

    onUpdate: function (store, rec, type, modifiedFieldNames) {
        var display = this.displayField;

        if (type === 'edit' && modifiedFieldNames && Ext.Array.contains(modifiedFieldNames, display) && this.value === rec.getId()) {
            this.setRawValue(rec.get(display));
        }
    }

});

/* * GNU General Public License Usage
 * This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.
 *
 * http://www.gnu.org/licenses/lgpl.html
 *
 * @description: This class provide additional format to numbers by extending Ext.form.field.Number
 *
 * @author: Greivin Britton
 * @email: brittongr@gmail.com
 * @version: 2 compatible with ExtJS 4 (And ExtJS 5 - chamacs)
 */
Ext.define('Ext.ux.form.field.Currency', {
    extend: 'Ext.form.field.Number', //Extending the NumberField
    xtype: ['currencyfield'],
    alternateClassName: ['Ext.ux.form.field.Numeric', 'Ext.ux.form.NumericField'],
    currencySymbol: '',
    hideTrigger: true,
    useThousandSeparator: true,
    thousandSeparator: '.',
    decimalSeparator: ',',
    alwaysDisplayDecimals: false,
    fieldStyle: 'text-align: right;',
    // MOD - chamacs
    // @private
    isCurrency: false,
    // MOD - pmiguelmartins
    currencySymbolPos: 'left', // left , right
    // MOD - chamacs
    //fieldStyle: 'text-align: right;',
    // MOD - chamacs
    allowExponential: false,    /**
     * initComponent
     */
    initComponent: function () {
        if (this.useThousandSeparator && this.decimalSeparator == ',' && this.thousandSeparator == ',') {
            this.thousandSeparator = '.';
        } else if (this.allowDecimals && this.thousandSeparator == '.' && this.decimalSeparator == '.') {
            this.decimalSeparator = ',';
        }
        this.decimalPrecision = 2;
        // MOD - chamacs
        this.isCurrency = !Ext.isEmpty(this.currencySymbol);

        this.callParent(arguments);
    },
    /**
     * setValue
     */
    setValue: function (value) {
        var me = this,
            bind, valueBind;

        // This portion of the code is to prevent a binding from stomping over
        // the typed value. Say we have decimalPrecision 4 and the user types
        // 1.23456. The value of the field will be set as 1.2346 and published to
        // the viewmodel, which will trigger the binding to fire and setValue to
        // be called on the field, which would then set the value (and rawValue) to
        // 1.2346. Instead, if we have focus and the value is the same, just leave
        // the rawValue alone
        if (me.hasFocus) {
            bind = me.getBind();
            valueBind = bind && bind.value;
            if (valueBind && valueBind.syncing && value === me.value) {
                return me;
            }
        }

        // MOD - chamacs
        Ext.ux.form.field.Currency.superclass.setValue.apply(this, [value != null ? value.toString().replace('.', this.decimalSeparator) : value]);

        this.setRawValue(this.getFormattedValue(this.getValue()));
    },
    /**
     * getFormattedValue
     */
    getFormattedValue: function (value) {
        if (Ext.isEmpty(value) || !this.hasFormat()) {
            return value;
        } else {
            var neg = null;

            value = (neg = value < 0) ? value * -1 : value;
            value = this.allowDecimals && this.alwaysDisplayDecimals ? value.toFixed(this.decimalPrecision) : value;
            if (this.useThousandSeparator) {
                if (this.useThousandSeparator && Ext.isEmpty(this.thousandSeparator)) {
                    throw ('NumberFormatException: invalid thousandSeparator, property must has a valid character.');
                }
                if (this.thousandSeparator == this.decimalSeparator) {
                    throw ('NumberFormatException: invalid thousandSeparator, thousand separator must be different from decimalSeparator.');
                }

                value = value.toString();

                var ps = value.split('.');
                ps[1] = ps[1] ? ps[1] : null;

                var whole = ps[0];

                var r = /(\d+)(\d{3})/;

                var ts = this.thousandSeparator;

                while (r.test(whole)) {
                    whole = whole.replace(r, '$1' + ts + '$2');
                }

                value = whole + (ps[1] ? this.decimalSeparator + ps[1] : '');
            }

            // MOD - pmiguelmartins - updated by chamacs
            var position1 = this.isCurrency ? this.currencySymbol + ' ' : '';
            var position2 = value;
            if (this.currencySymbolPos === 'right') {
                position1 = value;
                position2 = this.isCurrency ? ' ' + this.currencySymbol : '';
            }
            return Ext.String.format('{0}{1}{2}', position1, (neg ? '-' : ''), position2);
        }
    },
    /**
     * overrides parseValue to remove the format applied by this class
     */
    parseValue: function (value) {
        // MOD - chamacs
        //Replace the currency symbol and thousand separator
        return Ext.ux.form.field.Currency.superclass.parseValue.apply(this, [this.removeFormat(value)]);
    },
    /**
     * Remove only the format added by this class to let the superclass validate with it's rules.
     * @param {Object} value
     */
    removeFormat: function (value) {
        // MOD - chamacs
        if (Ext.isEmpty(value)) {
            return '';
        } else if (!this.hasFormat()) {
            return value;
        } else {
            // MOD - bhaidaya
            value = Ext.String.trim(value.toString().replace(this.currencySymbol, ''));

            value = this.useThousandSeparator ? value.replace(new RegExp('[' + this.thousandSeparator + ']', 'g'), '') : value;
            return value;
        }
    },

    /** * Remove the format before validating the the value.
     * @param {Number} value
     */
    getErrors: function (value) {
        //FIX data binding by antiplaka
        value = arguments.length > 0 ? value : this.processRawValue(this.getRawValue());
        return this.callParent([this.removeFormat(value)]);
    },
    /**
     * hasFormat
     */
    hasFormat: function () {
        return this.decimalSeparator != '.' || (this.useThousandSeparator == true && this.getRawValue() != null) || !Ext.isEmpty(this.currencySymbol) || this.alwaysDisplayDecimals;
    },
    /**
     * Display the numeric value with the fixed decimal precision and without the format using the setRawValue, don't need to do a setValue because we don't want a double
     * formatting and process of the value because beforeBlur perform a getRawValue and then a setValue.
     */
    onFocus: function () {
        this.setRawValue(this.removeFormat(this.getRawValue()));

        this.callParent(arguments);
    },
    /**
     * MOD - Jeff.Evans
     */
    processRawValue: function (value) {
        return this.removeFormat(value);
    }
});


Ext.grid.RowEditor.prototype.cancelBtnText = "Hủy bỏ";
Ext.grid.RowEditor.prototype.saveBtnText = "Cập nhật";


Ext.define('ToggleComponent', {
    extend: 'Ext.slider.Single',

    alias: 'widget.togglebutton',

    config: {
        defaultBindProperty: 'value'
    },
    cls: 'toggleoff',
    width: 32,
    animate: false,
    maxValue: 1,

    initComponent: function () {
        this.callParent();
    },

    getValue: function () {
        var toggleValue = this.thumbs[0].value;
        if (toggleValue === 1) {
            this.removeCls('toggleoff');
            this.addCls('toggleon');
        } else {
            this.removeCls('toggleon');
            this.addCls('toggleoff');
        }
        return this.callParent([0]);
    },

    listeners: {
        afterRender: function (toggle) {
            var toggleValue = toggle.thumbs[0].value;
            if (toggleValue === 1) {
                this.removeCls('toggleoff');
                this.addCls('toggleon');
            }
        }
    }
});