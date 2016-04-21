$(document).ready(function () {
    $('div#page-extras').fadeIn('slow');
    $('#page-extras #loader').fakeLoader({
        timeToHide: 8000,
        spinner: 'spinner4',
        bgColor: 'rgba(1,1,1,.8)',
        zIndex: '888'
    });
    $(document.body).mCustomScrollbar({
        theme: 'dark',
        scrollButtons: {
            enable: true
        },
        mouseWheel: {
            scrollAmount: 250
        },
        callbacks: {
            whileScrolling: function () {
                if (this.mcs.topPct >= 2) {
                    parlementTable.fixedHeader.enable(true);
                    $('#toTopContainer').stop().show('fast');
                } else {
                    $('#toTopContainer').stop().hide('fast');
                    parlementTable.fixedHeader.enable(false);
                }
            }
        }
    });
    $data = $.parseJSON($json);
    $html = '';
    $.each($data.leden, function ($index, $element) {
        $mem = ' <tr>' +
                '<td>' +
                $element.first_name +
                '</td>' +
                '<td>' +
                $element.last_name +
                '</td>' +
                '<td>' +
                $element.seatNumb +
                '</td>' +
                '<td data-order="' + $element.party + '" data-search="' + $element.party + '">' +
                '<img src="' + getPartyLogo($element.party) + '" height="25" width="50" alt="' + $element.party + '"/>' +
                '</td>' +
                '<td>' +
                '<a href="'+ $element.link +'?iframe=true&width=100%&height=100%" rel="prettyPhoto[iframes]" class="img-link">'+
                '<img src="' + getProfilePic($element.first_name, $element.last_name, $element.party) + '" height="50" width="50" alt="Foto van ' + $element.first_name + ' ' + $element.last_name + '"/>' +
                '</a>'+
                '</td>' +
                '</tr>';
        $html += $mem;
    });
    $('#parlement tbody').append($html);
    createParlementTable();
    $('#toTopContainer a').on('click', function (event) {
        event.preventDefault();
        $(document.body).mCustomScrollbar('scrollTo', 'top');
        parlementTable.fixedHeader.enable(false);
    });
    $('.dataTables_filter input').addClear({
        onClear: function () {
            $('.dataTables_filter input').val('').keyup();
        },
        closeSymbol: '<i class="fa fa-close clearBtn"></i>'
    });
    $("a[rel^='prettyPhoto']").prettyPhoto();

});

function getPartyLogo($party) {
    $src = 'images/partylogos/' + getStriped($party) + '.png';
    return $src;
}

function getProfilePic($first, $last, $party) {
    $fullname = getStriped($first + $last);
    $partyStrip = getStriped($party);
    $src = 'images/profilepics/' + $partyStrip + '/' + $fullname + '.jpg';
    return $src;
}

function getStriped($str) {
    $strReturn = $str.toLowerCase().replace(/ /g, '');
    return $strReturn;
}

function createParlementTable() {
    parlementTable = $('#parlement').DataTable({
        fixedHeader: true,
        'lengthMenu': [[25, 50, 75, 100, -1], [25, 50, 75, 100, 'Alles']],
        'iDisplayLength': -1,
        'dom': "<'row'<'col-sm-6'l><'col-sm-6'p>>" +
                "<'row'<'col-sm-12 first-search'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>" +
                "<'row'<'col-sm-1'f>>",
        colReorder: true,
        'order': [[0, 'asc']],
        responsive: true,
        'aoColumns': [
            null, //first name
            null, //last name
            null, //seatnumb
            null, //party
            {'bSortable': false}//pic            
        ]
    });
}
$(window).load(function () {
    setTimeout(function () {
        hideLoading();
    }, 2000);
});
function hideLoading() {
    $('#page-extras').fadeOut('slow');
    $('.first-search input').focus();
}

   