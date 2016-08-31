let data = 'randomStringToCreateAnArray'.split('');

let list = d3.select('.js-container')
                .append('ul');

// Selection

// returns a new empty selection, since the list container was empty.
// The parent node of this selection is the list container
let itemBinding = list.selectAll('.item')
                      .data(data);
// joined to an array of data, resulting in three new selections
// that represent the three possible states: enter, update, and exit.

// Since the selection was empty, the update and exit selections are empty,
// while the enter selection contains a placeholder for each new datum.

// The update selection is returned by selection.data

// Update
itemBinding.attr('class', 'update');

// Enter
itemBinding.enter()
  .append('li').classed('enter', true)
.merge(itemBinding)
  .text(function(d) { return d; });


// Exit
// Remove all elements as needed
itemBinding.exit().remove();


// data is not a property of the selection, but a property of its elements
d3.select('.js-container').datum(2);

// data is fixed on the DOM, selections can change