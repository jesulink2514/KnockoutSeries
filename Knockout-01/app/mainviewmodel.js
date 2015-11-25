/// <reference path="e:\Documents\Visual Studio 2015\Projects\Knockout-01\Knockout-01\Scripts/md5.js" />
/// <reference path="e:\documents\visual studio 2015\Projects\Knockout-01\Knockout-01\Scripts/knockout-3.4.0.js" />

var URL_BASE_PROFILE = "http://www.gravatar.com/avatar/";

function mainViewModel() {
    var self = this;

    this.developer = ko.observable(new developer());
    
    this.developers = ko.observableArray([]);

    this.add = function () {
        self.developers.push(self.developer());
        self.developer(new developer());
    };

    this.eliminar = function (developer) {
        self.developers.remove(developer);
    };

    this.task = ko.observable(new task());
    this.tasks = ko.observableArray([]);
    this.priorities = ko.observableArray([
        { text: 'Baja', value: 'bg-warning' },
        { text: 'Normal', value: 'bg-success' },
        { text: 'Alta', value: 'bg-danger' }]);

    this.addTask = function () {
        self.tasks.push(self.task());
        self.task(new task());
    };

    this.pendientes = ko.computed(function () {
        return ko.utils.arrayFilter(this.tasks(), function (t) {
            return !t.done();
        });
    }, this);
}

function developer() {    
    this.name = ko.observable('Jesus Angulo');
    this.email = ko.observable('jesus.angulo@outlook.com');
    this.profile = ko.computed(function () {
        var hash = md5(this.email());
        return URL_BASE_PROFILE + hash;
    }, this);
}

function task() {
    this.name = ko.observable('');
    this.priority = ko.observable(null);
    this.done = ko.observable(false);
}