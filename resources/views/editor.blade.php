<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Builder</title>

  <!-- Scripts -->
  <script>
  let _token = '{{ csrf_token() }}';
  </script>
  <script>
  let _altrpVersion = '{{ getCurrentVersion() }}';
  </script>
  {{--  <script src="{{ asset( '/modules/editor/editor.js' ) }}" defer></script>--}}
  <script src="{{ altrp_asset( '/modules/editor/editor.js', 'http://localhost:3000/' ) }}" crossorigin defer></script>

  <link rel="stylesheet" href="{{ asset( '/modules/editor/editor.css?' ) . getCurrentVersion() }}">
  {{--<link rel="dns-prefetch" href="//fonts.gstatic.com">--}}

</head>

<body>
  <div id="editor">

  </div>
</body>

</html>