/**
 * A module representing individual knob inputs on a midi device.
 * MidiInputSlider, MidiInputButton, etc derive from this base class.
 * @module BB.BaseMidiInput
 */
define(['./BB', './BB.BaseMidiInput'], 
function(  BB,        BaseMidiInput){

    'use strict';

    BB.BaseMidiInput = BaseMidiInput;

    /**
     * A module for representing individual knob inputs on a midi device. Behaves
     * like MidiInputSlider.
     * @class BB.MidiInputKnob
     * @constructor
     * @extends BB.BaseMidiInput
     * @param {Number} [note] The midi note to assign this input to.
     */
    BB.MidiInputKnob = function(note) {

        BaseMidiInput.call(this, note);
        this.inputType = 'knob';
        this.eventStack.max = [];
        this.eventStack.min = [];
    };

    BB.MidiInputKnob.prototype = Object.create(BaseMidiInput.prototype);
    BB.MidiInputKnob.prototype.constructor = BaseMidiInput;

    /*
     * Register an event for this midi input. Available events include: change, min,
     * and max.
     * @method on
     * @param  {string}   name     The name of the event. Supports "change", "min",
     * and "max" events.
     * @param  {Function} callback Callback to run when the event has fired
     */
    BB.MidiInputKnob.prototype.on = function(name, callback) {

        BaseMidiInput.prototype.on.call(this, name, callback);
        if (name === 'min') {
            this.eventStack.min.push(callback);
        } else if (name === 'max') {
            this.eventStack.max.push(callback);
        } 
    };

    return BB.MidiInputKnob;
});