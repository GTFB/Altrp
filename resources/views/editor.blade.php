<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  {!!  getFavicons() !!}
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Builder</title>

  <!-- Scripts -->
  <script>
  window._token = '{{ csrf_token() }}';
  </script>
  @if( env( 'ALTRP_SETTING_ADMIN_LOGO' ) )
    <script>
      window.admin_logo = {!! env( 'ALTRP_SETTING_ADMIN_LOGO' ) !!};
    </script>
  @endif
  <script>
  let _altrpVersion = '{{ getCurrentVersion() }}';
  </script>
  {{--  <script src="{{ asset( '/modules/editor/editor.js' ) }}" defer></script>--}}
  <script src="{{ altrp_asset( '/modules/editor/editor.js', 'http://127.0.0.1:3000/' ) }}" crossorigin defer></script>

  <script>
    window.ALTRP_DEBUG = {!! json_encode( ! ! get_altrp_setting( 'altrp_debug', false ) ) !!};
    window.altrpMenus = [];
    window.container_width = {{ get_altrp_setting( 'container_width', '1440' ) }};
  </script>
  <link rel="stylesheet" href="{{ asset( '/modules/editor/editor.css?' ) . getCurrentVersion() }}">
  {{--<link rel="dns-prefetch" href="//fonts.gstatic.com">--}}
  <style id="styled" ></style>

  @php
    echo print_statics('style', 'EDITOR_HEAD_STYLE' );
  @endphp
  @php
    echo print_statics('script', 'EDITOR_HEAD_SCRIPTS' );
  @endphp
</head>

<body>
  <div id="editor">

  </div>

  @php
    echo print_statics('style', 'EDITOR_BOTTOM_STYLE' );
  @endphp
  @php
    echo print_statics('script', 'EDITOR_BOTTOM_SCRIPTS' );
  @endphp
</body>
</html>
