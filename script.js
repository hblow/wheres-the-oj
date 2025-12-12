$(document).ready(function() {
    const $grid = $("#characterGrid");
    const itemsPerRow = 9;

    for (let i = 0; i <= characters.length; i += itemsPerRow) {
        const row = $('<div>').addClass('row').addClass(i === 0 ? 'row0' : '');
        const rowItems = characters.slice(i, i + itemsPerRow);

        rowItems.forEach(item => {
            const $div = $('<div>').addClass(item.type);
            if (item.class) $div.addClass(item.class);

            if (item.type === "blank") {
                $div.append('<img src="unit/blank.png"/>');
            } else if (item.type === "ui" && item.link) {
                $div.append(`<a href="${item.link}"><img src="${item.src}"/></a>`);
            } else {
                $div.append(`<img src="${item.src}" title="${item.Name}"/>`);
            }

            row.append($div);
        });

        $grid.append(row);
    }

    $("#search").on('keydown', function() {
        var filter = 0;
        var matchFound = 0;
        $(".unit").children('img').each(function() {
            var searchable = $(this).attr('src').slice(5, -3).toLowerCase();
            if (searchable.indexOf($("#search").val().toLowerCase()) < 0) {
                $(this).parent().addClass("nomatch");
                filter += 1;
            } else {
                $(this).parent().removeClass("nomatch");
                matchFound += 1;
            }
        });
        if (filter > 0) {
            $(".ui").addClass("noMatch");
        } else {
            $(".ui").removeClass("noMatch");
        }
        if (matchFound == 0 && $("#search").val().indexOf("?") > -1) {
            $(".Random").removeClass("noMatch");
        }
    });
});