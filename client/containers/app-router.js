import page from "page";

xtag.register('app-router', {
    lifecycle: {
        created: function(){
            var attrToPath = {};
            var routes = [].slice.call(this.querySelectorAll("route"));
            for(var i in routes){
                const r = routes[i];
                this.createRoute(r.getAttribute("path"),r.getAttribute("component"));
                [].slice.call(r.attributes).forEach(attr=>{;
                    if(attr.name != "path" && attr.name != "component"){
                        if(attrToPath[attr.name]===undefined){
                            attrToPath[attr.name] = [];
                        }
                        attrToPath[attr.name].push(r.getAttribute("path"))
                    }
                });
            }
            this.attrToPath = attrToPath;
            this.createAttributes();
            page();
        }
    },
    methods:{
        createRoute: function(path,component){
            page(path, ()=>{
                this.innerHTML = "";
                var el = document.createElement(component);
                this.currentPath = path;
                this.currentElement = el;
                this.updateCurrentElementProps();
                this.appendChild(el);
            })
        },
        updateCurrentElementProps: function(){
            for(var attr in this.attrToPath){
                if(this.attrToPath[attr].indexOf(this.currentPath)!==-1){
                    this.currentElement[attr] = this[attr];
                }
            }
        },
        createAttributes: function(){
            for(var attr in this.attrToPath){
                this.createAttribute(attr);
            }
        },
        createAttribute: function(name){
            this["_"+name] = this[name];
            Object.defineProperty(this, name, {
                get : ()=>{ return this["_"+name];},
                set: (val)=>{
                    this["_"+name] = val;
                    this.updateCurrentElementProps();
                }
            });
        }
    }
});