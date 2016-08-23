xtag.mixins.action = {
    methods: {
        action: function(type,data){
            xtag.fireEvent(this,"action",{detail:{type,data}});
        }
    }
};

xtag.mixins["attr-sync"] = {
    lifecycle: {
        attributeChanged: function(attrName, oldVal, newVal){
            this[attrName] = newVal;
        }
    }
};