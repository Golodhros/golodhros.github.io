var circleBinding = svg.selectAll('circle').data(data);

// UPDATE
circleBinding.style('fill', 'blue');

// EXIT
circleBinding.exit().remove();

// ENTER
circleBinding.enter().append('circle')
    .style('fill', 'green')
  .merge(circleBinding) // ENTER + UPDATE
    .style('stroke', 'black');