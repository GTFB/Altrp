
$( document ).ready(function() {
    let $modal = $('.modal');
    let $collapseOne = $('#collapseOne');
    let $collapseTwo = $('#collapseTwo');

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    // Providers
    $('.install_new_provider').on('click', function (e) {
        e.preventDefault();
        var btn = $(this);
        var url = btn.data('url');
        var method = btn.data('method');
        var data = {};
        sendAjaxAndShowModal(method, url, data);
        $modal.modal('show');
    });

    $modal.on('click','.install_provider', function (e) {
        e.preventDefault();
        var btn = $(this);
        var url = btn.data('url');
        var method = btn.data('method');
        var data = $('.data_form').serialize();
        sendAjaxProvider(method, url, data, 'collapseOne');
        $modal.modal('hide');
    });


    // Clients
    $('.add_provider_client').on('click', function (e) {
        e.preventDefault();
        var btn = $(this);
        var url = btn.data('url');
        var method = btn.data('method');
        var data = {};
        sendAjaxAndShowModal(method, url, data);
        $modal.modal('show');
    });

    $modal.on('click', '.save_provider_client', function (e) {
        e.preventDefault();
        var btn = $(this);
        var url = btn.data('url');
        var method = btn.data('method');
        var data = $('.data_form').serialize();
        sendAjax(method, url, data, 'collapseTwo');
        $modal.modal('hide');
    });

    $collapseTwo.on('click', '.edit_provider_client', function (e) {
        e.preventDefault();
        var btn = $(this);
        var url = btn.data('url');
        var method = btn.data('method');
        var data = {};
        sendAjaxAndShowModal(method, url, data);
        $modal.modal('show');
    });

    $collapseTwo.on('click', '.delete_provider_client', function (e) {
        e.preventDefault();
        var conf = confirm('Are you sure?')
        if (!conf) return;
        var btn = $(this);
        var url = btn.data('url');
        var method = btn.data('method');
        var data = {};
        sendAjax(method, url, data, 'collapseTwo');
    });

    $modal.on('click', '.save_provider', function (e) {
        e.preventDefault();
        var btn = $(this);
        var url = btn.data('url');
        var method = btn.data('method');
        var data = $('.data_form').serialize();
        sendAjax(method, url, data, 'collapseTwo');
        $modal.modal('hide');
    });

    function sendAjaxAndShowModal(method, url, data){
        $.ajax({
            type: method,
            url: url,
            data: data,
            cache: false,
            success: function(res){
                $modal = $('.modal');
                $('.modal .modal-content').html(res['content']);
                return true;
            }
        });
        return false;
    }

    function sendAjax(method, url, data, collapseId){
        $.ajax({
            type: method,
            url: url,
            data: data,
            cache: false,
            success: function(res){
                $('#' + collapseId +' .card-body').html(res['content']);
            }
        });
        return false;
    }

    function sendAjaxProvider(method, url, data, collapseId){
        $.ajax({
            type: method,
            url: url,
            data: data,
            cache: false,
            success: function(res){
                $('#' + collapseId +' .card-body').html(res['content']);
                if (!res['disabled']) {
                    $('.add_provider_client').removeAttr('disabled')
                }
            }
        });
        return false;
    }

    $('.close_modal').on('click', function (e) {
        e.preventDefault();
        $modal.modal('hide');
    });


});

