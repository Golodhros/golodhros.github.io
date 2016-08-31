let data = 'randomStringToCreateAnArray'.split('')
            .map((letter, i) => ({letter: letter, i}));


// Selections
let table = d3.select('.js-container').append('table');

let thead = table.append('thead');
let tbody = table.append('tbody');

let columns = ['i', 'letter'];

// append the header row
thead.append('tr')
    .selectAll('th')
    .data(columns)
    .enter()
    .append('th')
        .text(d=>d);

// create a row for each object in the data
let rows = tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr');

// create a cell in each row for each column
let cells = rows.selectAll('td')
                .data((row) => {
                    return columns.map((column) => {
                        return {
                            column,
                            value: row[column]
                        };
                    });
                })
                .enter()
                .append('td')
                .text(({value}) => value);



