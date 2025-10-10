$(document).ready(function() {
    const $grid = $("#characterGrid");
    const itemsPerRow = 10;

    // Generate character grid
    for (let i = 0; i < characters.length; i += itemsPerRow) {
        const row = $('<div>').addClass('row').addClass(i === 0 ? 'row0' : '');
        const rowItems = characters.slice(i, i + itemsPerRow);

        rowItems.forEach(item => {
            const $div = $('<div>').addClass(item.type);
            if (item.class) $div.addClass(item.class);

            if (item.type === "blank") {
                $div.append('<img src="units/blank.png"/>');
            } else if (item.type === "ui" && item.link) {
                $div.append(`<a href="${item.link}"><img src="${item.src}"/></a>`);
            } else {
                $div.append(`<img src="${item.src}" title="${item.name}"/>`);
            }

            row.append($div);
        });

        $grid.append(row);
    }

    // Search functionality
    $("#search").keyup(function() {
        var filter = 0;
        var matchFound = 0;
        $(".unit").children('img').map(function() {
            var searchable = $(this).attr('src').slice(6, -4).toLowerCase(); // chop "units/" and ".png" off
            if (searchable.indexOf($("#search").val().toLowerCase()) < 0) {
                $(this).parent().addClass("noMatch");
                filter += 1;
            } else {
                $(this).parent().removeClass("noMatch");
                matchFound += 1;
            }
        });
        // Grey out gear/random/goback buttons separately
        if (filter > 0) {
            $(".ui").addClass("noMatch");
        } else {
            $(".ui").removeClass("noMatch");
        }
        // Special request for random tile
        if (matchFound == 0 && $("#search").val().indexOf("?") > -1) {
            $(".random").removeClass("noMatch");
        }
    });
});