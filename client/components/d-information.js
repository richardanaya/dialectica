xtag.register('d-information', {
    lifecycle: {
        created: function(){
            var content = document.createElement("div")
            content.innerHTML = multiline(function(){/*
             <div class="Information">
             <span class="Information-author"></span><span class="Information-message"></span<span class="Information-edit"></span>
             <div class="Information-children"></div>
             </div>
             */});
            while(this.childNodes.length > 0) {
                content.querySelector('.Information-children').appendChild(this.childNodes[0]);
            }
            this.innerHTML = "";
            this.appendChild(content);
        }
    },
    accessors: {
        "author": {
            attribute: {},
            set: function(value) {
                this.querySelector(".Information-author").innerHTML = value+":";
            }
        },
        "message": {
            attribute: {},
            set: function(value) {
                this.querySelector(".Information-message").innerHTML = value;
            }
        }
    }
});

