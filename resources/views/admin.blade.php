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
  <script src="/modules/admin/admin.js" defer></script>

  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">

</head>
<body>
<div id="admin">

</div>
</body>
</html>
