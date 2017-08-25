const dataKey = "trackingAppItems";

var app = new Vue({
    el: '#app',
    data: {
        items: JSON.parse(window.localStorage.getItem(dataKey)) || [],
        newItem: {
            number: null,
            desc: null
        },
        trackUrl: "#"
    },
    mounted: function() {
        this.refreshData();
    },
    methods: {
        addItem: function(event) {
            event.preventDefault();

            if (this.newItem.desc && this.newItem.number) {
                app.$data.items.push({
                    number: app.$data.newItem.number,
                    desc: app.$data.newItem.desc
                });

                app.$data.newItem.number = null;
                app.$data.newItem.desc = null;

                this.refreshData();
            }
        },
        removeItem: function(item) {
            event.preventDefault();
            var index = app.$data.items.indexOf(item);
            app.$data.items.splice(index, 1);

            this.refreshData();
        },
        refreshData: function() {
            var numbers = "";
            this.items.forEach(function(item) {
                numbers += "," + item.number;
            }, this);
            numbers = numbers.substr(1, numbers.length - 1)
            this.trackUrl = "http://www.17track.net/tr/track?nums=" + numbers;
            window.localStorage.setItem(dataKey, JSON.stringify(this.items));
        }
    }
});