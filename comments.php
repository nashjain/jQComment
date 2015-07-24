<?php
$data = [["msg"=> "First Comment", "user"=>"Naresh", "updatedOn"=>"2014-09-19T15:28:46.493Z"],
    ["msg"=> "Second Comment", "user"=>"James", "updatedOn"=>"2014-06-19T15:28:46.493Z"],
    ["msg"=> "Third Comment", "user"=>"Jack", "updatedOn"=>"2014-12-19T15:28:46.493Z"]];
header('Content-Type: application/json');
echo json_encode($data);