# README

 Some Angular 2 Pain points

 1. click callback fires BEFORE model changes, so need to use ngModelChange..., however need to declare ngModelChange AFTER 2-way data binded ngModel
 2. IDE TS plugin sometimes gets borked
 3. can't iterate (*ngFor) through object of the box, need to make a pipe to convert object to array. Even the new Map datastructure.

TODO
 - prompt user for API key, cache for a few weeks instead of hardcoding
