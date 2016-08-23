xtag.register('container-dialectic', {
    mixins: ['action'],
    content: function(){/*
         <div class="Dialectic">
            <h3 class="Dialectic-title"></h3>
             <d-information author="DA" message="nodejs is single threaded and doesn't take advantage of CPU">
                 <d-information author="RA" message="nodejs is single threaded and doesn't take advantage of CPU">
                     <d-information author="DA" message="okay">
                     </d-information>
                 </d-information>
             </d-information>
          </div>
     */},
    accessors: {
        "dialectic": {
            set: function(value) {
                this.querySelector('.Dialectic-title').innerHTML = value.title;
            }
        }
    }
});
