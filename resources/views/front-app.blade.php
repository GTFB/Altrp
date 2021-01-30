<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <script>

    window.pageStorage = {};

    var page_id = 1;
    var page_areas = [];

    if (typeof page_id !== 'undefined' && typeof page_areas !== 'undefined') {
      window.pageStorage[page_id] = {areas:page_areas};
    }

  </script>
  <script>
    /**
     * Функция для вывода ошибок в HTML
     * @param msg
     * @param url
     * @param lno
     * @return {boolean}
     */
    function myErrHandler(msg, url, lno)
    {
      document.getElementById('front-app').textContent = `${msg} ${url} ${lno}`;
      return true;
    }

    // window.onerror = myErrHandler;
  </script>
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  @isset($title)
    <meta property="og:title" content="{{$title}}">
    <title>{{ $title }}</title>
  @else
    <meta property="og:title" content="altrp || FRONT APP">
    <title>altrp || FRONT APP</title>
  @endisset
  <!-- Scripts -->

  <script>
    let _token = '{{ csrf_token() }}';
  </script>
  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <!-- Style -->
  <style>
    .app-area > .sections-wrapper{
      width: {{ get_altrp_setting( 'container_width', '1440' ) }}px;
    }
    .altrp-section--boxed {
      padding-left: calc( ( 100vw - {{ get_altrp_setting( 'container_width', '1440' ) }}px) / 2 );
      padding-right: calc( ( 100vw - {{ get_altrp_setting( 'container_width', '1440' ) }}px) / 2 );
    }
    .front-app-content_preloaded{
      display: none;
    }
  </style>
  @if( isset( $preload_content[ 'important_styles'] ) )
    {!! $preload_content[ 'important_styles'] !!}
  @endif
</head>
<body class="front-app-body">
<div id="front-app" class="front-app {{ 'front-app_admin' }}">
  {!! isset( $preload_content[ 'content'] ) ? $preload_content['content'] : ''!!}
</div>
<script src="{{ altrp_asset( '/modules/front-app/front-app.js', 'http://localhost:3001/' ) }}" defer></script>
@php
$value = env( 'ALTRP_SETTING_ALL_SITE_JS', '' );
try {
 $value = decrypt( $value );
} catch( \Illuminate\Contracts\Encryption\DecryptException $e){
 $value = '';
}
@endphp
@if($value)
  <script>{!! $value !!}</script>
@endif
</body>
<link rel="stylesheet" href="{{ asset( '/modules/front-app/front-app.css' ) . '?' . getCurrentVersion() }}" />
</html>
