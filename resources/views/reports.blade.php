<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Reports</title>

  <!-- Scripts -->
  <script>
  window._token = '{{ csrf_token() }}';
  </script>
  @if( env( 'ALTRP_SETTING_ADMIN_LOGO' ) )
    <script>
      window.admin_logo = {!! env( 'ALTRP_SETTING_ADMIN_LOGO' ) !!};
    </script>
  @endif
  <style>
    .app-area > .sections-wrapper{
      width: {{ get_altrp_setting( 'container_width', '1440' ) }}px;
    }
    .altrp-section--boxed {
      padding-left: calc( ( 100vw - {{ get_altrp_setting( 'container_width', '1440' ) }}px) / 2 );
      padding-right: calc( ( 100vw - {{ get_altrp_setting( 'container_width', '1440' ) }}px) / 2 );
    }
  </style>
  <script>
  let _altrpVersion = '{{ getCurrentVersion() }}';
  </script>
  {{-- <script src="{{ altrp_asset( '/modules/reports-new/reports.js', 'http://localhost:3005/' ) }}" crossorigin defer></script> --}}

  <link rel="stylesheet" href="{{ asset( '/modules/reports-new/reports.css?' ) . getCurrentVersion() }}">
</head>

<body>
  <div id="reports">

  </div>
  <script src="{{ altrp_asset( '/modules/reports-new/reports.js', 'http://localhost:3005/' ) }}" defer></script>
</body>

</html>
