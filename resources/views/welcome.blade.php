<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Altrp</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}">Register</a>
                        @endif
                    @endauth
                </div>
            @endif

            <div class="content">
                <div class="title m-b-md">
                    Altrp
                </div>

                <div class="links">
                    <a href="https://laravel.com/docs">Docs</a>
                    <a href="https://laracasts.com">Laracasts</a>
                    <a href="https://laravel-news.com">News</a>
                    <a href="https://blog.laravel.com">Blog</a>
                    <a href="https://nova.laravel.com">Nova</a>
                    <a href="https://forge.laravel.com">Forge</a>
                    <a href="https://vapor.laravel.com">Vapor</a>
                    <a href="https://github.com/laravel/laravel">GitHub</a>
                </div>
            </div>
        </div>
        <form action="{{route('createTemplate') }}" method="POST" class="form-horizontal" enctype="multipart/form-data">
            {{ csrf_field() }}

            <div class="form-group">
                <label for="task" class="col-sm-3 control-label">name</label>
                <div class="col-sm-6">
                    <input type="text" name="name" id="task-name" class="form-control">
                </div>
                <label for="task" class="col-sm-3 control-label">title</label>
                <div class="col-sm-6">
                    <input type="text" name="title" id="task-name" class="form-control">
                </div>
                <label for="task" class="col-sm-3 control-label">data</label>
                <div class="col-sm-6">
                    <textarea rows="3" name="data" class="form-control"></textarea>
                </div>
                <label for="task" class="col-sm-3 control-label">author</label>
                <div class="col-sm-6">
                    <input type="text" name="author" id="task-name" class="form-control">
                </div>


            </div></div>

            <br>
            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-6">
                    <button type="submit" class="btn btn-primary float-right btn-block">
                        <i class="fa fa-plus"></i> Создать шаблон
                    </button>
                </div>
            </div>
        </form>

        <form action="{{ url('/admin/ajax/templates/update/1') }}" method="POST" class="form-horizontal" enctype="multipart/form-data">
            {{ csrf_field() }}

            <div class="form-group">
                <label for="task" class="col-sm-3 control-label">name</label>
                <div class="col-sm-6">
                    <input type="text" name="name" id="task-name" class="form-control">
                </div>
                <label for="task" class="col-sm-3 control-label">title</label>
                <div class="col-sm-6">
                    <input type="text" name="title" id="task-name" class="form-control">
                </div>
                <label for="task" class="col-sm-3 control-label">data</label>
                <div class="col-sm-6">
                    <textarea rows="3" name="data" class="form-control"></textarea>
                </div>
                <label for="task" class="col-sm-3 control-label">author</label>
                <div class="col-sm-6">
                    <input type="text" name="author" id="task-name" class="form-control">
                </div>


            </div></div>

            <br>
            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-6">
                    <button type="submit" class="btn btn-primary float-right btn-block">
                        <i class="fa fa-plus"></i> Изменить шаблон
                    </button>
                </div>
            </div>
        </form>
    <a href="/admin/ajax/template/1">смотреть</a>
    </body>
</html>
