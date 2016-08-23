import Freezer from 'freezer-js';

xtag.register('app-store', {
    lifecycle:{
        created: function(){
            this.provisions = {};
            this.store = new Freezer({
                dialectic:{title:"JS isn't optimal for backend web"}
            });
            var updateChildren = (currentState)=> {
                [].slice.call(this.attributes).forEach(attr=> {
                    [].slice.call(this.childNodes).forEach(child=> {
                        var name = attr.name;
                        child[name] = currentState[name];
                    })
                });
            };
            this.store.on('update', updateChildren);
            this.addEventListener("action",(e)=>{
                this[e.detail.type](this.store.get(),e.detail.data);
            });
            updateChildren(this.store.get());
        }
    },
    methods:{
        testAction: function(state,action){
            state.dialectic.set("message",action.message);
        }
    }
});

