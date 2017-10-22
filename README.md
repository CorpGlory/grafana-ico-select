# Grafana icon select

## Abstract

Sometimes you want to use an icon similar to your set/map colors/names as in your plugins.
Grafana already has many icons inside. Let's use them.
Grafana already has [many icons inside](https://github.com/CorpGlory/grafana-icon-select/blob/master/icons-list.ts). Let's use them.

The proposition is "icon-select" feature for Grafana. It's supposed to be a new directive or something else.

*It's not possible to install it to Grafana now.* The repo is mostly for developers. 
Before starting to code, [*I have some questions to community*](#questions-to-community)

## Prototype

### Selected state
In "normal" state user see icon and it's name:

<img
  width="268" alt="icon select" 
  src="https://user-images.githubusercontent.com/1022757/31864631-46b99376-b769-11e7-94bf-becd00380bc2.png"
/>

### Input begin
When users click to input, it removes it's content and opens selection box with all possible icons:

<img 
  width="277" alt="select" 
  src="https://user-images.githubusercontent.com/1022757/31864402-71efcd0c-b765-11e7-97d3-f77093686804.png"
/>

### Filter 
User can type a value to filter icons:

<img 
  width="273" alt="filter icons" 
  src="https://user-images.githubusercontent.com/1022757/31864599-aa94f9fe-b768-11e7-822d-6f06aa28032a.png"
/>

## Questions to community
1. Would you use it and how?
2. How to distribute? 
   * Contibute to the main project?
   * Create "app"? 
   * Remove code duplication with `query_part_editor.ts` (extract typeahead feature?)
3. Help me to write nice Angular directive: Model & etc
4. UI/UX suggestions
5. Performance optimizations: the list is really big
   * Create selection list dom element only once?
6. Create a roadmap if we decide to make it
   * create a ploygon for testing
   * collect requirements
