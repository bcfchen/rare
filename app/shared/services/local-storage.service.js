(function() {
    'use strict';
    angular.module('rare').factory('localStorageService', ["formatterService", '$window', 'transformer', function(formatterService, $window, transformer) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || null);
    },
    getUser: function() {
      return this.getObject("user") ? transformer.transform(this.getObject("user"), User) : new User();
    },
    setUser: function(value) {
      var user = transformer.transform(value, User);
      user.setPhoneNumber(user.phoneNumber);
      return this.setObject("user", user);
    },
    removeUser: function() {
      delete $window.localStorage["user"];
    },
    setUserAddress: function(type, address){
      var user = this.getUser();
      user.setAddress(type, address);
      this.setUser(user);
    },
    getUserAddresses: function(){
      return this.getUser().addresses;
    },
    setUserEmail: function(email){
      var user = this.getUser();
      user.setEmail(email);
      this.setUser(user);
    },
    getUserPhoneNumber: function(){
      var phoneNumber = null;
      if (this.getUser()){
        phoneNumber = this.getUser().phoneNumber;
      }

      return phoneNumber;
    },
    setUserPhoneNumber: function(phoneNumber){
      var currObject = this.getUser();
      currObject.setPhoneNumber(phoneNumber);
      this.setUser(currObject);    
    },
    setUserName: function(name){
      var currObject = this.getUser();
      currObject.setName(name);
      this.setUser(currObject);    
    },
    getAppointments: function(){
      var rawAppointments = this.getObject("appointments");
      var hasAppointments = rawAppointments && rawAppointments.length > 0;
      var appointments = hasAppointments ? transformer.transform(rawAppointments, Appointment) : [];
      return appointments;
    },
    addAppointment: function(appointment){
      var currentAppointments = this.getAppointments();
      currentAppointments.push(appointment);
      return this.setAppointments(currentAppointments);
    },
    setAppointments: function(appointments){
      return this.setObject("appointments", appointments);
    },
    cleanAppointments: function(){
      var appointments = this.getAppointments();
      var cleanedAppointments = [];
      appointments.forEach(function(appointment){
        var currentDate = new moment();
        var apptDate = appointment.schedule.date.replace(/-/g, '/');
        var appointmentDate = new moment(apptDate + " " + appointment.schedule.time);
        if (appointmentDate > currentDate){
          cleanedAppointments.push(appointment);
        }
      });

      this.setAppointments(cleanedAppointments);
    }
  }
  }]);
})();
