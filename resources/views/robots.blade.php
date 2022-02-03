<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Robots Editor</title>

    <!-- Scripts -->
    <script>
        window._token = '{{ csrf_token() }}';

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
    <script src="{{ altrp_asset( '/modules/robots/robots.js', 'http://localhost:3006/' ) }}" crossorigin defer></script>

    <script>
      window.container_width = {{ get_altrp_setting('container_width', '1440') }};

    </script>
    <link rel="stylesheet" href="{{ asset( '/modules/editor/editor.css?' ) . getCurrentVersion() }}">
    {{--<link rel="dns-prefetch" href="//fonts.gstatic.com">--}}

  @php
    echo print_statics('style', 'ROBOT_HEAD_STYLE' );
  @endphp
  @php
    echo print_statics('script', 'ROBOT_HEAD_SCRIPTS' );
  @endphp
</head>

<body>
    <div id="robots-editor">

    </div>

    @php
      echo print_statics('style', 'ROBOT_BOTTOM_STYLE' );
    @endphp
    @php
      echo print_statics('script', 'ROBOT_BOTTOM_SCRIPTS' );
    @endphp
</body>
</html>
