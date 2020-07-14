<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <script src="{{ altrp_asset( '/modules/reports/editor.js', 'http://localhost:3000/' ) }}" crossorigin defer></script>
  <title>Reports</title>
</head>

<body>
  <div id="editor-reports"></div>
</body>

</html>