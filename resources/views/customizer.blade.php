<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Customizer Editor</title>

    <!-- Scripts -->
    <script>
        let _token = '{{ csrf_token() }}';

    </script>
    @if( env( 'ALTRP_SETTING_ADMIN_LOGO' ) )
    <script>
        window.admin_logo = {!! env('ALTRP_SETTING_ADMIN_LOGO') !!};

    </script>
    @endif
    <script>
        let _altrpVersion = '{{ getCurrentVersion() }}';

    </script>
    {{-- <script src="{{ asset( '/modules/editor/editor.js' ) }}" defer></script>--}}
    <script src="{{ altrp_asset( '/modules/customizer/customizer.js', 'http://localhost:3007/' ) }}" crossorigin defer></script>

    <script>
      window.container_width = {{ get_altrp_setting('container_width', '1440') }};

    </script>
    <link rel="stylesheet" href="{{ asset( '/modules/editor/editor.css?' ) . getCurrentVersion() }}">
    {{--<link rel="dns-prefetch" href="//fonts.gstatic.com">--}}
</head>

<body>
    <div id="customizer-editor">

    </div>
</body>

</html>