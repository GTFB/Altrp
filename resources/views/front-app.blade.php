<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>altrp || FRONT APP</title>

  <!-- Scripts -->

  <script>
    let _token = '{{ csrf_token() }}';
  </script>
  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link rel="stylesheet" href="{{ asset( '/modules/front-app/front-app.css' ) }}"/>
  <!-- Style -->
  <style>
    .app-area > .sections-wrapper{
      width: {{ get_altrp_setting( 'container_width', '1440' ) }}px;
    }
  </style>

</head>
<body>
<div id="front-app">

</div>
<script src="{{ altrp_asset( '/modules/front-app/front-app.js', 'http://localhost:3001/' ) }}" defer></script>
</body>
</html>
