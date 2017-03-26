// Enter, Update and Exit Pattern


// We have some random info
let data = 'randomStringToCreateAnArray'.split('');

// Selection
// We create the root list element
let list = d3.select('.js-container')
                .append('ul');

let dataJoin = list.selectAll('.item')
// an empty selection, since the list container was empty
// looking for instantiations of data
                      .data(data);
                    // data, which would be bound to a
                    // selection

// when we joined the selection with an array of data,
// it results in three new selections
// that represent the three possible states: enter, update, and exit.

// Since the selection was empty, the update and exit selections are empty,
// while the enter selection contains a placeholder for each new datum.

// Update
dataJoin.attr('class', 'update');

// d3 has a few different
// functions that set stuff
// .text()
// .property()
// .style()
// .attr()

// each one takes a function
// and that function gets data
// from your .data()
// .attr('foo', function(d) {
//   return d.foo;
// })

// Enter
// for every time that we see data
// but we do not see an element
dataJoin.enter()
  .append('li').classed('enter', true)
  // we create an element
.merge(dataJoin)
    // we merge the update and enter groups and apply an operation
    .text(function(d) { return d; });


// Exit
// Remove all elements as needed
dataJoin.exit().remove();


