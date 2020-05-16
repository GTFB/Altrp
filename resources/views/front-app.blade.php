<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>altrp || FRONT APP</title>

  <!-- Scripts -->

  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link rel="stylesheet" href={{ asset( '/modules/front-app/front-app.css' ) }}/>

</head>
<body>
<div id="front-app">

</div>
<script src="/modules/front-app/front-app.js"></script>
</body>
</html>
