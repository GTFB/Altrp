<?php
$html = file_get_contents(public_path('modules/reports/index.html'));
echo str_replace('<meta name="csrf-token" content=""/>', '<meta name="csrf-token" content="'. csrf_token() .'"/>' , $html);
?>